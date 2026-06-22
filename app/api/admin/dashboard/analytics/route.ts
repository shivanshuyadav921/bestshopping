import { NextRequest, NextResponse } from "next/server";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { UserRole, OrderStatus } from "@prisma/client";

export const GET = secureRoute(
  { action: "get_admin_analytics", rateLimitLimit: 20 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role as UserRole;
    if (userRole !== UserRole.OWNER && userRole !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const [
      pendingRfqs,
      activeOrders,
      activeJobs,
      totalCustomers,
      recentActivity,
      inspectionCount,
      passedInspections
    ] = await Promise.all([
      db.rFQ.count({ where: { status: "PENDING", deletedAt: null } }),
      db.order.count({ where: { NOT: { status: OrderStatus.DELIVERED }, deletedAt: null } }),
      db.job.count({ where: { status: { in: ["QUEUED", "RUNNING"] } } }),
      db.customer.count({ where: { deletedAt: null } }),
      db.auditLog.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, role: true }
          }
        }
      }),
      db.inspectionRecord.count(),
      db.inspectionRecord.count({ where: { status: "PASSED" } })
    ]);

    const inspectionSuccessRate = inspectionCount > 0 
      ? Math.round((passedInspections / inspectionCount) * 100) 
      : 100;

    return NextResponse.json({
      metrics: {
        pendingRfqs,
        activeOrders,
        activeJobs,
        totalCustomers,
        inspectionSuccessRate,
      },
      recentActivity: recentActivity.map(act => ({
        id: act.id,
        user: act.user.name || "System",
        role: act.user.role,
        action: act.action,
        entity: act.entityName,
        entityId: act.entityId,
        reason: act.reason,
        timestamp: act.createdAt
      }))
    });
  }
);
