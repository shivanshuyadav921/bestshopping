import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { RfqService, createRfqSchema } from "@/modules/rfq/rfq.service";
import { db } from "@/lib/db";
import { cacheService } from "@/lib/cache";

// Enforce strict check on schemas for security validation
const strictCreateRfqSchema = createRfqSchema.strict();

export const GET = secureRoute(
  { action: "get_customer_rfqs", rateLimitLimit: 40 },
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

    const rfqs = await RfqService.listRfqs({
      customerId: customer.id,
    });

    return NextResponse.json(rfqs);
  }
);

export const POST = secureRoute(
  { action: "create_customer_rfq", rateLimitLimit: 15 }, // low rate limit for RFQ submissions
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

    const body = await req.json();
    const parsed = strictCreateRfqSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 422 });
    }

    const rfq = await RfqService.createRfq(parsed.data, customer.id, userId);

    await cacheService.del("admin_analytics");

    return NextResponse.json(rfq, { status: 201 });
  }
);
