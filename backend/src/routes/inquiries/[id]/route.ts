import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { z } from "zod";
import { AuditService } from "@/modules/audit/audit.service";
import { cacheService } from "@/lib/cache";

const resolveInquirySchema = z.object({
  status: z.enum(["PENDING", "RESOLVED"]).optional(),
  adminNotes: z.string().optional().nullable(),
}).strict();

export const PATCH = secureRoute(
  { action: "update_inquiry", rateLimitLimit: 30 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
      const { id } = await params;
      const body = await req.json();
      const parsed = resolveInquirySchema.safeParse(body);
      
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Validation failed", details: parsed.error.format() },
          { status: 400 }
        );
      }

      const existingInquiry = await db.inquiry.findUnique({
        where: { id },
      });

      if (!existingInquiry) {
        return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
      }

      const updated = await db.inquiry.update({
        where: { id },
        data: parsed.data,
      });

      await AuditService.logChange({
        userId: session.user.id,
        action: "UPDATE",
        entityName: "Inquiry",
        entityId: id,
        oldValues: existingInquiry,
        newValues: updated,
        reason: "Admin updated inquiry status/notes",
      });

      await cacheService.del("admin_analytics");

      return NextResponse.json(updated);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);
