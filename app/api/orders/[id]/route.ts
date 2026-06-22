import { NextRequest, NextResponse } from "next/server";
import { secureRoute } from "@/lib/api-wrapper";
import { OrderService, updateOrderSchema } from "@/modules/orders/orders.service";
import { requireOwnership } from "@/lib/security";
import { UserRole } from "@prisma/client";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

const strictUpdateOrderSchema = updateOrderSchema.strict();

export const GET = secureRoute(
  { action: "get_order_detail", rateLimitLimit: 50 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const parsedParams = paramsSchema.safeParse({ id });
    if (!parsedParams.success) {
      return NextResponse.json({ error: "Invalid Order ID format" }, { status: 400 });
    }

    const userId = session.user.id;
    const role = session.user.role as UserRole;

    const hasAccess = await requireOwnership({ userId, userRole: role, resourceId: id, type: "order" });
    if (!hasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const order = await OrderService.getOrderDetails(id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  }
);

export const PATCH = secureRoute(
  { action: "update_order", rateLimitLimit: 30 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const parsedParams = paramsSchema.safeParse({ id });
    if (!parsedParams.success) {
      return NextResponse.json({ error: "Invalid Order ID format" }, { status: 400 });
    }

    const userId = session.user.id;
    const role = session.user.role as UserRole;

    // Verify user can access order to update it
    const hasAccess = await requireOwnership({ userId, userRole: role, resourceId: id, type: "order" });
    if (!hasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = strictUpdateOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 422 });
    }

    const updated = await OrderService.updateOrder(id, parsed.data, userId, role);
    return NextResponse.json(updated);
  }
);

export const DELETE = secureRoute(
  { action: "delete_order", rateLimitLimit: 20 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role as UserRole;
    if (role !== UserRole.OWNER && role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const parsedParams = paramsSchema.safeParse({ id });
    if (!parsedParams.success) {
      return NextResponse.json({ error: "Invalid Order ID format" }, { status: 400 });
    }

    const userId = session.user.id;
    const deleted = await OrderService.deleteOrder(id, userId);
    return NextResponse.json(deleted);
  }
);
