import { db } from "@/lib/db";
import { eventBus } from "@/lib/event-bus";
import { AuditService } from "@/modules/audit/audit.service";
import { z } from "zod";

export const createRfqSchema = z.object({
  description: z.string().min(10),
  targetDeliveryDate: z.string().datetime().optional(),
  notes: z.string().optional(),
  fileIds: z.array(z.string().uuid()).optional(),
});

export const quoteRfqSchema = z.object({
  estimatedPrice: z.number().positive(),
  targetDeliveryDate: z.string().datetime(),
  notes: z.string().optional(),
});

export class RfqService {
  /**
   * Create an RFQ submitted by customer
   */
  static async createRfq(data: z.infer<typeof createRfqSchema>, customerId: string, userId: string) {
    const rfq = await db.rFQ.create({
      data: {
        customerId,
        description: data.description,
        targetDeliveryDate: data.targetDeliveryDate ? new Date(data.targetDeliveryDate) : null,
        status: "PENDING",
        notes: data.notes || null,
      },
    });

    // Associate uploaded files if provided
    if (data.fileIds && data.fileIds.length > 0) {
      await db.uploadedFile.updateMany({
        where: { id: { in: data.fileIds } },
        data: { rfqId: rfq.id },
      });
    }

    // Write audit log
    await AuditService.logChange({
      userId,
      action: "CREATE",
      entityName: "RFQ",
      entityId: rfq.id,
      oldValues: null,
      newValues: rfq,
      reason: "Customer RFQ submission",
    });

    // Emit event for notification system (notifies owner/sales desk immediately)
    eventBus.emit("rfq.created", {
      rfqId: rfq.id,
      description: rfq.description,
      customerId,
    });

    return rfq;
  }

  /**
   * Update RFQ with price estimation (Quote)
   */
  static async quoteRfq(rfqId: string, data: z.infer<typeof quoteRfqSchema>, userId: string) {
    const existingRfq = await db.rFQ.findUnique({
      where: { id: rfqId },
    });

    if (!existingRfq || existingRfq.deletedAt) throw new Error("RFQ not found");

    const updatedRfq = await db.rFQ.update({
      where: { id: rfqId },
      data: {
        status: "QUOTED",
        estimatedPrice: data.estimatedPrice,
        targetDeliveryDate: new Date(data.targetDeliveryDate),
        notes: data.notes || existingRfq.notes,
      },
    });

    await AuditService.logChange({
      userId,
      action: "UPDATE",
      entityName: "RFQ",
      entityId: rfqId,
      oldValues: existingRfq,
      newValues: updatedRfq,
      reason: "Quotation issued by Sales Desk",
    });

    return updatedRfq;
  }

  /**
   * Approve quote and convert it to a new Order
   */
  static async approveRfq(rfqId: string, userId: string) {
    const rfq = await db.rFQ.findUnique({
      where: { id: rfqId },
    });

    if (!rfq || rfq.status !== "QUOTED") {
      throw new Error("Only quoted RFQs can be approved");
    }

    // Update RFQ status
    const updatedRfq = await db.rFQ.update({
      where: { id: rfqId },
      data: { status: "APPROVED" },
    });

    // Create equivalent Order
    const order = await db.order.create({
      data: {
        customerId: rfq.customerId,
        rfqId: rfq.id,
        totalAmount: rfq.estimatedPrice,
        notes: rfq.notes,
        status: "APPROVED", // Approved is directly transitioning to active order status flow
      },
    });

    // Add order status timeline
    await db.orderUpdate.create({
      data: {
        orderId: order.id,
        status: "APPROVED",
        createdById: userId,
        note: `Order automatically created from Approved RFQ #${rfq.id.substring(0, 8)}`,
      },
    });

    // Associate RFQ files with the order
    await db.uploadedFile.updateMany({
      where: { rfqId: rfq.id },
      data: { orderId: order.id },
    });

    await AuditService.logChange({
      userId,
      action: "UPDATE",
      entityName: "RFQ",
      entityId: rfqId,
      oldValues: rfq,
      newValues: updatedRfq,
      reason: "RFQ approved by customer",
    });

    return { rfq: updatedRfq, order };
  }

  /**
   * List RFQs
   */
  static async listRfqs({ customerId, status }: { customerId?: string; status?: string }) {
    return await db.rFQ.findMany({
      where: {
        customerId: customerId || undefined,
        status: status || undefined,
        deletedAt: null,
      },
      include: {
        uploadedFiles: true,
      },
      orderBy: { createdAt: "desc" },
    });
  }

  /**
   * Get detail rfq
   */
  static async getRfq(rfqId: string) {
    return await db.rFQ.findUnique({
      where: { id: rfqId },
      include: {
        customer: { include: { user: true } },
        uploadedFiles: true,
      },
    });
  }
}
