import { db } from "@/lib/db";
import { OrderStatus, UserRole } from "@prisma/client";
import { eventBus } from "@/lib/event-bus";
import { AuditService } from "@/modules/audit/audit.service";
import { z } from "zod";

// Zod schemas for validation
export const createOrderSchema = z.object({
  customerId: z.string().uuid(),
  rfqId: z.string().uuid().optional(),
  totalAmount: z.number().positive().optional(),
  notes: z.string().optional(),
});

export const updateOrderSchema = z.object({
  status: z.nativeEnum(OrderStatus),
  totalAmount: z.number().positive().optional(),
  notes: z.string().optional(),
  reason: z.string().optional(),
});

// Define allowed transitions for strict validation
const AllowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  RFQ_RECEIVED: [OrderStatus.QUOTED],
  QUOTED: [OrderStatus.APPROVED, OrderStatus.RFQ_RECEIVED],
  APPROVED: [OrderStatus.MATERIAL_PROCUREMENT],
  MATERIAL_PROCUREMENT: [OrderStatus.MANUFACTURING],
  MANUFACTURING: [OrderStatus.INSPECTION],
  INSPECTION: [OrderStatus.DISPATCH],
  DISPATCH: [OrderStatus.DELIVERED],
  DELIVERED: [],
};

export class OrderService {
  /**
   * Create an order
   */
  static async createOrder(data: z.infer<typeof createOrderSchema>, userId: string) {
    const order = await db.order.create({
      data: {
        customerId: data.customerId,
        rfqId: data.rfqId || null,
        totalAmount: data.totalAmount || null,
        notes: data.notes || null,
        status: OrderStatus.RFQ_RECEIVED,
      },
    });

    // Create initial timeline record
    await db.orderUpdate.create({
      data: {
        orderId: order.id,
        status: OrderStatus.RFQ_RECEIVED,
        createdById: userId,
        note: "Initial order entry created",
      },
    });

    // Write audit log
    await AuditService.logChange({
      userId,
      action: "CREATE",
      entityName: "Order",
      entityId: order.id,
      oldValues: null,
      newValues: order,
      reason: "Order initialization",
    });

    return order;
  }

  /**
   * Transition order status with validation and audit tracking
   */
  static async updateOrder(
    orderId: string,
    data: z.infer<typeof updateOrderSchema>,
    userId: string,
    userRole: UserRole
  ) {
    const existingOrder = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder || existingOrder.deletedAt) {
      throw new Error("Order not found");
    }

    // Role restrictions for updating orders
    if (userRole === UserRole.CUSTOMER) {
      // Customer can only transitions from QUOTED to APPROVED (by accepting quotation)
      if (existingOrder.status !== OrderStatus.QUOTED || data.status !== OrderStatus.APPROVED) {
        throw new Error("Unauthorized status transition");
      }
    } else if (userRole === UserRole.QUALITY_ENGINEER) {
      // Quality engineers can transition to INSPECTION or complete inspection
      if (data.status !== OrderStatus.INSPECTION && existingOrder.status !== OrderStatus.INSPECTION) {
        throw new Error("Quality Engineer restricted to inspection operations");
      }
    } else if (userRole === UserRole.PRODUCTION_ENGINEER) {
      // Prod Engineers can transition manufacturing steps
      if (
        data.status !== OrderStatus.MATERIAL_PROCUREMENT &&
        data.status !== OrderStatus.MANUFACTURING &&
        existingOrder.status !== OrderStatus.MANUFACTURING
      ) {
        throw new Error("Production Engineer restricted to manufacturing/procurement steps");
      }
    }

    // Validate state transitions (except for Admin/Owner override)
    if (userRole !== UserRole.ADMIN && userRole !== UserRole.OWNER) {
      const allowed = AllowedTransitions[existingOrder.status] || [];
      if (!allowed.includes(data.status)) {
        throw new Error(`Invalid status transition: ${existingOrder.status} -> ${data.status}`);
      }
    }

    // Update order values
    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: {
        status: data.status,
        totalAmount: data.totalAmount !== undefined ? data.totalAmount : existingOrder.totalAmount,
        notes: data.notes !== undefined ? data.notes : existingOrder.notes,
      },
    });

    // Log timeline
    await db.orderUpdate.create({
      data: {
        orderId: orderId,
        status: data.status,
        createdById: userId,
        note: data.notes || `Status transitioned from ${existingOrder.status} to ${data.status}`,
      },
    });

    // Audit logs
    await AuditService.logChange({
      userId,
      action: "UPDATE",
      entityName: "Order",
      entityId: orderId,
      oldValues: existingOrder,
      newValues: updatedOrder,
      reason: data.reason || "Status transition updates",
    });

    // Fire background notification events
    eventBus.emit("order.updated", {
      orderId,
      oldStatus: existingOrder.status,
      newStatus: data.status,
      customerId: existingOrder.customerId,
    });

    if (data.status === OrderStatus.DISPATCH) {
      eventBus.emit("order.dispatched", {
        orderId,
        trackingNumber: "PRM-SHP-TRACK-" + orderId.substring(0, 5).toUpperCase(),
        customerId: existingOrder.customerId,
      });
    }

    return updatedOrder;
  }

  /**
   * Retrieve order by ID with its status history and inspection records
   */
  static async getOrderDetails(orderId: string) {
    return await db.order.findUnique({
      where: { id: orderId },
      include: {
        customer: {
          include: { user: true },
        },
        updates: {
          orderBy: { createdAt: "asc" },
          include: {
            createdBy: {
              select: { name: true, role: true },
            },
          },
        },
        inspectionRecords: {
          include: {
            inspector: { select: { name: true } },
          },
        },
        certificates: true,
        uploadedFiles: true,
        jobs: true,
      },
    });
  }

  /**
   * List all orders (supporting search filter and pagination)
   */
  static async listOrders({
    customerId,
    status,
    limit = 10,
    cursor,
  }: {
    customerId?: string;
    status?: OrderStatus;
    limit?: number;
    cursor?: string;
  }) {
    return await db.order.findMany({
      where: {
        customerId: customerId || undefined,
        status: status || undefined,
        deletedAt: null,
      },
      take: limit,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Soft delete order
   */
  static async deleteOrder(orderId: string, userId: string) {
    const existingOrder = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!existingOrder) throw new Error("Order not found");

    const updated = await db.order.update({
      where: { id: orderId },
      data: { deletedAt: new Date() },
    });

    await AuditService.logChange({
      userId,
      action: "DELETE",
      entityName: "Order",
      entityId: orderId,
      oldValues: existingOrder,
      newValues: updated,
      reason: "Soft delete order",
    });

    return updated;
  }
}
