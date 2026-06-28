import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { AuditService } from "@/modules/audit/audit.service";
import { signToken } from "@/lib/security";
import { UserRole } from "@prisma/client";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export const GET = secureRoute(
  { action: "verify_certificate", rateLimitLimit: 60 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const parsed = paramsSchema.safeParse({ id });
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid Certificate ID format", status: "invalid" }, { status: 400 });
    }

    try {
      const certificate = await db.certificate.findUnique({
        where: { id },
        include: {
          file: true,
          order: {
            include: {
              customer: {
                select: {
                  id: true,
                  companyName: true,
                  name: true,
                  email: true,
                  industry: true,
                }
              },
              inspectionRecords: {
                include: {
                  inspector: {
                    select: { name: true }
                  }
                }
              }
            }
          }
        }
      });

      if (!certificate) {
        // Log verification failure
        await AuditService.logChange({
          userId: session?.user?.id || null,
          action: "VERIFY_CERTIFICATE_FAILED",
          entityName: "Certificate",
          entityId: id,
          oldValues: null,
          newValues: { attemptedId: id },
          reason: "Verification lookup failed for non-existent certificate",
        });

        return NextResponse.json(
          { error: "Certificate not found", status: "invalid" },
          { status: 404 }
        );
      }

      // Log successful verification audit log
      await AuditService.logChange({
        userId: session?.user?.id || null,
        action: "VERIFY_CERTIFICATE",
        entityName: "Certificate",
        entityId: id,
        oldValues: null,
        newValues: {
          id: certificate.id,
          type: certificate.type,
          orderId: certificate.orderId,
          fileId: certificate.fileId,
        },
        reason: "Certificate verified successfully via portal",
      });

      // Generate a short-lived token (15 mins) with admin bypass role to authorize download
      const token = signToken({
        fileId: certificate.fileId,
        userId: session?.user?.id || "public-verify",
        userRole: UserRole.ADMIN,
      }, 900);

      const downloadUrl = `/api/files/${certificate.fileId}?token=${token}`;

      return NextResponse.json({
        status: "verified",
        id: certificate.id,
        type: certificate.type,
        issuedAt: certificate.issuedAt,
        createdAt: certificate.createdAt,
        file: {
          id: certificate.file.id,
          filename: certificate.file.filename,
          fileType: certificate.file.fileType,
          size: certificate.file.size,
        },
        order: certificate.order ? {
          id: certificate.order.id,
          status: certificate.order.status,
          createdAt: certificate.order.createdAt,
          customerName: certificate.order.customer?.name || "N/A",
          companyName: certificate.order.customer?.companyName || "N/A",
          inspectionRecords: certificate.order.inspectionRecords.map((rec: { id: string; status: string; notes: string | null; createdAt: Date; inspector?: { name: string | null } | null; parametersChecked: any }) => ({
            id: rec.id,
            status: rec.status,
            notes: rec.notes,
            createdAt: rec.createdAt,
            inspectorName: rec.inspector?.name || "System Inspector",
            parametersChecked: rec.parametersChecked,
          })),
        } : null,
        downloadUrl,
      });

    } catch (error: any) {
      console.error("Certificate verification API failure:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
);
