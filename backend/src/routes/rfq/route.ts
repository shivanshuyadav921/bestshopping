import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { RfqService } from "@/modules/rfq/rfq.service";
import { UserRole } from "@prisma/client";

export const GET = secureRoute(
  { action: "get_rfqs", rateLimitLimit: 40 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role as UserRole;
    if (role === UserRole.CUSTOMER) {
      return NextResponse.json({ error: "Forbidden: Use customer RFQ API" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;

    const rfqs = await RfqService.listRfqs({ status });
    return NextResponse.json(rfqs);
  }
);
