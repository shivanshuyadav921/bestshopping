import { NextRequest, NextResponse } from "next/server";
import { secureRoute } from "@/lib/api-wrapper";
import { RfqService, quoteRfqSchema } from "@/modules/rfq/rfq.service";
import { requireOwnership } from "@/lib/security";
import { UserRole } from "@prisma/client";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

const strictQuoteRfqSchema = quoteRfqSchema.strict();

export const GET = secureRoute(
  { action: "get_rfq_detail", rateLimitLimit: 50 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const parsedParams = paramsSchema.safeParse({ id });
    if (!parsedParams.success) {
      return NextResponse.json({ error: "Invalid RFQ ID format" }, { status: 400 });
    }

    const userId = session.user.id;
    const role = session.user.role as UserRole;

    const hasAccess = await requireOwnership({ userId, userRole: role, resourceId: id, type: "rfq" });
    if (!hasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const rfq = await RfqService.getRfq(id);
    if (!rfq) {
      return NextResponse.json({ error: "RFQ not found" }, { status: 404 });
    }

    return NextResponse.json(rfq);
  }
);

export const PATCH = secureRoute(
  { action: "update_rfq", rateLimitLimit: 30 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const parsedParams = paramsSchema.safeParse({ id });
    if (!parsedParams.success) {
      return NextResponse.json({ error: "Invalid RFQ ID format" }, { status: 400 });
    }

    const userId = session.user.id;
    const role = session.user.role as UserRole;

    // Verify access to update
    const hasAccess = await requireOwnership({ userId, userRole: role, resourceId: id, type: "rfq" });
    if (!hasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const { action, ...payload } = body;

    if (action === "quote") {
      if (role === UserRole.CUSTOMER) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }

      const parsed = strictQuoteRfqSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 422 });
      }

      const quoted = await RfqService.quoteRfq(id, parsed.data, userId);
      return NextResponse.json(quoted);
    }

    if (action === "approve") {
      const conversion = await RfqService.approveRfq(id, userId);
      return NextResponse.json(conversion);
    }

    return NextResponse.json({ error: "Invalid action specifier" }, { status: 400 });
  }
);
