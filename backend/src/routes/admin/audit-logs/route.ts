import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const GET = secureRoute(
  { action: "get_admin_audit_logs", rateLimitLimit: 20 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role as UserRole;
    if (userRole !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 50;
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      db.auditLog.findMany({
        take: limit,
        skip: skip,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: {
              name: true,
              email: true,
              role: true,
            },
          },
        },
      }),
      db.auditLog.count(),
    ]);

    return NextResponse.json({
      logs: logs.map((act: any) => ({
        id: act.id,
        user: act.user.name || "System",
        email: act.user.email,
        role: act.user.role,
        action: act.action,
        entity: act.entityName,
        entityId: act.entityId,
        oldValues: act.oldValues,
        newValues: act.newValues,
        reason: act.reason,
        timestamp: act.createdAt,
      })),
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  }
);
