import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { eventBus } from "@/lib/event-bus";
import { z } from "zod";
import { AuditService } from "@/modules/audit/audit.service";
import { cacheService } from "@/lib/cache";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  type: z.enum(["CONTACT", "CALLBACK", "SUPPORT"]),
  message: z.string().min(5, "Message must be at least 5 characters"),
  attachments: z.array(z.string()).optional().nullable(),
}).strict();

export const POST = secureRoute(
  { action: "submit_inquiry", rateLimitLimit: 20 },
  async (req: NextRequest, session: any) => {
    try {
      const body = await req.json();
      const parsed = inquirySchema.safeParse(body);
      
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Validation failed", details: parsed.error.format() },
          { status: 400 }
        );
      }

      const { name, email, companyName, phone, type, message, attachments } = parsed.data;

      // Check if user is logged in to associate with customer
      let customerId: string | null = null;
      if (session?.user?.id) {
        const customer = await db.customer.findUnique({
          where: { userId: session.user.id },
        });
        if (customer) {
          customerId = customer.id;
        }
      }

      // Create inquiry
      const inquiry = await db.inquiry.create({
        data: {
          customerId,
          name,
          companyName: companyName || null,
          email,
          phone: phone || null,
          type,
          message,
          attachments: attachments || undefined,
          status: "PENDING",
        },
      });

      // Emit event for notification
      eventBus.emit("inquiry.received", {
        inquiryId: inquiry.id,
        name,
        email,
        companyName,
        phone,
        type,
        message,
        attachments,
      });

      // Log to audit trail
      if (session?.user?.id) {
        await AuditService.logChange({
          userId: session.user.id,
          action: "CREATE",
          entityName: "Inquiry",
          entityId: inquiry.id,
          oldValues: null,
          newValues: inquiry,
          reason: `Customer submitted a ${type} inquiry`,
        });
      }

      await cacheService.del("admin_analytics");

      return NextResponse.json({ success: true, inquiry }, { status: 201 });

    } catch (error: any) {
      console.error("Inquiry submission error:", error);
      return NextResponse.json(
        { error: error.message || "Failed to submit inquiry" },
        { status: 500 }
      );
    }
  }
);

// Admin-only route to list and resolve inquiries
export const GET = secureRoute(
  { action: "list_inquiries", rateLimitLimit: 30 },
  async (req: NextRequest, session: any) => {
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
      const inquiries = await db.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        include: {
          customer: true,
        },
      });
      return NextResponse.json(inquiries);
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);
