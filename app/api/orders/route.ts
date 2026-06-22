import { NextRequest, NextResponse } from "next/server";
import { secureRoute } from "@/lib/api-wrapper";
import { OrderService, createOrderSchema } from "@/modules/orders/orders.service";
import { UserRole } from "@prisma/client";

const strictCreateOrderSchema = createOrderSchema.strict();

export const GET = secureRoute(
  { action: "get_orders", rateLimitLimit: 50 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role as UserRole;
    if (role === UserRole.CUSTOMER) {
      return NextResponse.json({ error: "Forbidden: Use customer orders API" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") as any;
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 10;
    const cursor = searchParams.get("cursor") || undefined;

    const orders = await OrderService.listOrders({
      status,
      limit,
      cursor,
    });

    return NextResponse.json(orders);
  }
);

export const POST = secureRoute(
  { action: "create_order", rateLimitLimit: 25 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role as UserRole;
    if (role === UserRole.CUSTOMER) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = strictCreateOrderSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 422 });
    }

    const userId = session.user.id;
    const order = await OrderService.createOrder(parsed.data, userId);

    return NextResponse.json(order, { status: 201 });
  }
);
