import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { z } from "zod";
import { AuditService } from "@/modules/audit/audit.service";

const certificateCreateSchema = z.object({
  orderId: z.string().uuid().optional().nullable(),
  type: z.enum(["Material", "HeatTreatment", "Inspection"]),
  fileId: z.string().uuid(),
}).strict();

export const GET = secureRoute(
  { action: "get_admin_certificates", rateLimitLimit: 50 },
  async (req: NextRequest, session: any) => {
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
      const [certificates, files, orders] = await Promise.all([
        db.certificate.findMany({
          include: {
            file: true,
            order: {
              include: {
                customer: {
                  select: {
                    companyName: true,
                    name: true,
                  }
                }
              }
            }
          },
          orderBy: { createdAt: "desc" },
        }),
        db.uploadedFile.findMany({
          where: { deletedAt: null },
          orderBy: { createdAt: "desc" },
        }),
        db.order.findMany({
          where: { deletedAt: null },
          include: {
            customer: {
              select: {
                companyName: true,
              }
            }
          },
          orderBy: { createdAt: "desc" },
        }),
      ]);

      return NextResponse.json({ certificates, files, orders });
    } catch (error: any) {
      console.error("Admin list certificates API failure:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);

export const POST = secureRoute(
  { action: "create_certificate", rateLimitLimit: 30 },
  async (req: NextRequest, session: any) => {
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
      const body = await req.json();
      const parsed = certificateCreateSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Validation failed", details: parsed.error.format() },
          { status: 422 }
        );
      }

      const { orderId, type, fileId } = parsed.data;

      // Verify file exists
      const file = await db.uploadedFile.findUnique({
        where: { id: fileId, deletedAt: null },
      });

      if (!file) {
        return NextResponse.json({ error: "Uploaded file not found" }, { status: 404 });
      }

      // Create Certificate
      const cert = await db.certificate.create({
        data: {
          orderId: orderId || null,
          type,
          fileId,
        },
        include: {
          file: true,
          order: {
            include: {
              customer: {
                select: {
                  companyName: true,
                  name: true,
                }
              }
            }
          }
        }
      });

      // Write Audit Log
      await AuditService.logChange({
        userId: session.user.id,
        action: "CREATE",
        entityName: "Certificate",
        entityId: cert.id,
        oldValues: null,
        newValues: cert,
        reason: `Admin issued certificate of type ${type}`,
      });

      // If associated with order, also add activity/timeline event
      if (cert.orderId && cert.order) {
        await db.customerActivity.create({
          data: {
            customerId: cert.order.customerId,
            activityType: "CERTIFICATE_DOWNLOADED", // or general update
            description: `Quality certificate (${type}) issued for Order: ${cert.orderId.substring(0, 8).toUpperCase()}`,
          }
        });
      }

      return NextResponse.json(cert, { status: 201 });
    } catch (error: any) {
      console.error("Admin issue certificate API failure:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);
