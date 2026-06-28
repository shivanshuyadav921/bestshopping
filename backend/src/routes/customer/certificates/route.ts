import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const GET = secureRoute(
  { action: "get_customer_certificates", rateLimitLimit: 50 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      // Find customer profile linked to the User ID
      const customer = await db.customer.findUnique({
        where: { userId: session.user.id },
      });

      if (!customer) {
        return NextResponse.json({ error: "Customer profile not found" }, { status: 404 });
      }

      const certificates = await db.certificate.findMany({
        where: {
          order: {
            customerId: customer.id,
          },
        },
        include: {
          file: true,
          order: {
            select: {
              id: true,
              status: true,
              createdAt: true,
            }
          }
        },
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(certificates);
    } catch (error: any) {
      console.error("Customer certificates API failure:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);
