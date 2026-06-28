import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { FileService } from "@/modules/files/files.service";
import { requireOwnership, signToken } from "@/lib/security";
import { UserRole } from "@prisma/client";

export const POST = secureRoute(
  { action: "share_file", rateLimitLimit: 30 },
  async (req: NextRequest, session: any, { params }: { params: Promise<{ id: string }> }) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const userId = session.user.id;
    const userRole = session.user.role as UserRole;

    // Verify user can access the file to share it
    const file = await FileService.getFile(id);
    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const hasAccess = await requireOwnership({ userId, userRole, resourceId: id, type: "file" });
    if (!hasAccess) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Generate token valid for 15 minutes (900 seconds)
    const token = signToken({ fileId: id, userId, userRole }, 900);
    const downloadUrl = `/api/files/${id}?token=${token}`;

    return NextResponse.json({ token, downloadUrl });
  }
);
