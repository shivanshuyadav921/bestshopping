import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { AuditService } from "@/modules/audit/audit.service";
import { cacheService } from "@/lib/cache";

const adminCustomerUpdateSchema = z.object({
  notes: z.string().optional().nullable(),
  companyName: z.string().optional(),
  contactPhone: z.string().optional(),
  industry: z.string().optional(),
  adminNotes: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  leadScore: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
  latitude: z.number().optional().nullable(),
  longitude: z.number().optional().nullable(),
}).strict();

export const PATCH = secureRoute(
  { action: "admin_update_customer", rateLimitLimit: 30 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
      const { id } = await params;
      const body = await req.json();
      const parsed = adminCustomerUpdateSchema.safeParse(body);
      
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Validation failed", details: parsed.error.format() },
          { status: 400 }
        );
      }

      const existingCustomer = await db.customer.findUnique({
        where: { id },
      });

      if (!existingCustomer) {
        return NextResponse.json({ error: "Customer not found" }, { status: 404 });
      }

      const { latitude, longitude, ...updateData } = parsed.data;

      const updated = await db.$transaction(async (tx: Prisma.TransactionClient) => {
        const cust = await tx.customer.update({
          where: { id },
          data: updateData,
        });

        if (latitude !== undefined || longitude !== undefined) {
          await tx.customerLocation.upsert({
            where: { customerId: id },
            update: {
              latitude,
              longitude,
              source: "MANUAL",
            },
            create: {
              customerId: id,
              latitude,
              longitude,
              country: cust.country,
              state: cust.state,
              city: cust.city,
              source: "MANUAL",
            },
          });
        }

        if (parsed.data.leadScore) {
          await tx.lead.updateMany({
            where: { email: cust.email },
            data: { leadScore: parsed.data.leadScore },
          });
        }

        return cust;
      });

      await AuditService.logChange({
        userId: session.user.id,
        action: "UPDATE",
        entityName: "Customer",
        entityId: id,
        oldValues: existingCustomer,
        newValues: updated,
        reason: "Admin updated customer metadata/notes/location",
      });

      await cacheService.del("admin_analytics");

      return NextResponse.json(updated);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);
