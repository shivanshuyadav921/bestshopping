import { NextRequest, NextResponse } from "next/server";
import { secureRoute } from "@/lib/api-wrapper";
import { OrderService } from "@/modules/orders/orders.service";
import { db } from "@/lib/db";

export const GET = secureRoute(
  { action: "get_customer_orders", rateLimitLimit: 40 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const customer = await db.customer.findUnique({
      where: { userId },
    });

    if (!customer) {
      return NextResponse.json({ error: "Customer profile not found" }, { status: 404 });
    }

    const orders = await OrderService.listOrders({
      customerId: customer.id,
    });

    return NextResponse.json(orders);
  }
);
