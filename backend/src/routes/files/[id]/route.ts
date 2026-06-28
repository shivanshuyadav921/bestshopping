import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { FileService } from "@/modules/files/files.service";
import { requireOwnership, verifyToken } from "@/lib/security";
import { UserRole } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";

const paramsSchema = z.object({
  id: z.string().uuid(),
});

export const GET = secureRoute(
  { action: "download_file", rateLimitLimit: 60 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const parsedParams = paramsSchema.safeParse({ id });
    if (!parsedParams.success) {
      return NextResponse.json({ error: "Invalid File ID format" }, { status: 400 });
    }

    // Identify user through session or signed token parameter
    const token = req.nextUrl.searchParams.get("token");
    let activeUserId = session?.user?.id;
    let activeUserRole = session?.user?.role as UserRole;

    if (token) {
      const decoded = verifyToken(token);
      if (!decoded || decoded.fileId !== id) {
        return NextResponse.json({ error: "Invalid or expired download token" }, { status: 403 });
      }
      activeUserId = decoded.userId;
      activeUserRole = decoded.userRole;
    }

    if (!activeUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verify ownership or employee permissions
    const allowed = await requireOwnership({
      userId: activeUserId,
      userRole: activeUserRole,
      resourceId: id,
      type: "file",
    });

    if (!allowed) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const file = await FileService.getFile(id);
    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Check if the file is a quality certificate and downloaded by a customer
    const customer = await db.customer.findUnique({
      where: { userId: activeUserId },
    });
    if (customer) {
      const isCertificate = await db.certificate.findFirst({
        where: { fileId: id },
      });
      if (isCertificate) {
        const { eventBus } = await import("@/lib/event-bus");
        eventBus.emit("certificate.downloaded", {
          fileId: id,
          filename: file.filename,
          customerId: customer.id,
        });
      }
    }

    // Generate/Get presigned download URL for the file from StorageService
    const { StorageService } = await import("@/lib/storage");
    const downloadUrl = await StorageService.getPresignedDownloadUrl(file.id, file.filename, file.url);

    const acceptHeader = req.headers.get("accept") || "";
    if (acceptHeader.includes("application/json")) {
      return NextResponse.json({
        ...file,
        url: downloadUrl, // Overwrite with temporary secure presigned URL
      });
    }

    // Redirect direct browser downloads to the presigned URL
    return NextResponse.redirect(downloadUrl);
  }
);

export const DELETE = secureRoute(
  { action: "delete_file", rateLimitLimit: 20 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const parsedParams = paramsSchema.safeParse({ id });
    if (!parsedParams.success) {
      return NextResponse.json({ error: "Invalid File ID format" }, { status: 400 });
    }

    const userId = session.user.id;
    const userRole = session.user.role as UserRole;

    // soft deletes file metadata
    await FileService.deleteFile(id, userId, userRole);
    return NextResponse.json({ success: true });
  }
);
