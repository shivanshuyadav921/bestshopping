import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { UserRole, OrderStatus } from "@prisma/client";
import { cacheService } from "@/lib/cache";

export const GET = secureRoute(
  { action: "get_admin_analytics", rateLimitLimit: 20 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userRole = session.user.role as UserRole;
    if (userRole !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
      const cacheKey = "admin_analytics";
      const cachedData = await cacheService.get<any>(cacheKey);
      if (cachedData) {
        return NextResponse.json(cachedData);
      }

      const [
        pendingRfqs,
        activeOrders,
        activeJobs,
        totalCustomers,
        recentActivity,
        inspectionCount,
        passedInspections,
        
        // Phase 12 Additions
        leads,
        customers,
        inquiries,
        activitiesTimeline,
        industryGroup,
        countryGroup,
        stateGroup,
        rfqList,
      ] = await Promise.all([
        db.rFQ.count({ where: { status: "PENDING", deletedAt: null } }),
        db.order.count({ where: { NOT: { status: OrderStatus.DELIVERED }, deletedAt: null } }),
        db.job.count({ where: { status: { in: ["QUEUED", "RUNNING"] } } }),
        db.customer.count({ where: { deletedAt: null } }),
        db.auditLog.findMany({
          take: 15,
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: { name: true, role: true }
            }
          }
        }),
        db.inspectionRecord.count(),
        db.inspectionRecord.count({ where: { status: "PASSED" } }),
        
        // Leads
        db.lead.findMany({
          orderBy: { createdAt: "desc" },
        }),
        // Customer Directory
        db.customer.findMany({
          where: { deletedAt: null },
          include: {
            user: { select: { email: true, name: true } },
            location: true,
            activities: {
              take: 5,
              orderBy: { timestamp: "desc" },
            }
          },
          orderBy: { createdAt: "desc" },
        }),
        // Inquiries
        db.inquiry.findMany({
          orderBy: { createdAt: "desc" },
        }),
        // Unified Activity Feed
        db.customerActivity.findMany({
          take: 30,
          orderBy: { timestamp: "desc" },
          include: {
            customer: {
              include: { location: true }
            }
          }
        }),
        // Industry distribution
        db.customer.groupBy({
          by: ["industry"],
          where: { deletedAt: null },
          _count: { id: true },
        }),
        // Country distribution
        db.customer.groupBy({
          by: ["country"],
          where: { deletedAt: null },
          _count: { id: true },
        }),
        // State distribution
        db.customer.groupBy({
          by: ["state"],
          where: { deletedAt: null },
          _count: { id: true },
        }),
        // RFQ trends list
        db.rFQ.findMany({
          where: { deletedAt: null },
          select: { createdAt: true },
        }),
      ]);

      const inspectionSuccessRate = inspectionCount > 0 
        ? Math.round((passedInspections / inspectionCount) * 100) 
        : 100;

      // Group RFQs by month for simple trend plotting
      const rfqMonths: Record<string, number> = {};
      rfqList.forEach((rfq: { createdAt: Date }) => {
        const month = rfq.createdAt.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
        rfqMonths[month] = (rfqMonths[month] || 0) + 1;
      });
      const rfqTrends = Object.entries(rfqMonths).map(([name, count]) => ({ name, count })).slice(-6);

      const payload = {
        metrics: {
          pendingRfqs,
          activeOrders,
          activeJobs,
          totalCustomers,
          inspectionSuccessRate,
        },
        recentActivity: recentActivity.map((act: { id: string; user: { name: string | null; role: string }; action: string; entityName: string; entityId: string; reason: string | null; createdAt: Date }) => ({
          id: act.id,
          user: act.user.name || "System",
          role: act.user.role,
          action: act.action,
          entity: act.entityName,
          entityId: act.entityId,
          reason: act.reason,
          timestamp: act.createdAt
        })),
        leads,
        customers: customers.map((c: { id: string; userId: string; name: string | null; email: string; companyName: string | null; contactPhone: string | null; industry: string | null; country: string | null; state: string | null; city: string | null; address: string | null; gstNumber: string | null; website: string | null; linkedIn: string | null; pinCode: string | null; notes: string | null; adminNotes: string | null; tags: string[] | null; leadScore: string | null; location: any; activities: any[]; createdAt: Date }) => ({
          id: c.id,
          userId: c.userId,
          name: c.name,
          email: c.email,
          companyName: c.companyName,
          phone: c.contactPhone,
          industry: c.industry,
          country: c.country,
          state: c.state,
          city: c.city,
          address: c.address,
          gstNumber: c.gstNumber,
          website: c.website,
          linkedIn: c.linkedIn,
          pinCode: c.pinCode,
          notes: c.notes,
          adminNotes: c.adminNotes,
          tags: c.tags,
          leadScore: c.leadScore,
          location: c.location,
          activities: c.activities,
          createdAt: c.createdAt,
        })),
        inquiries,
        activitiesTimeline: activitiesTimeline.map((act: { id: string; customerId: string; customer: { companyName: string | null; name: string | null; industry: string | null; location: { city: string | null; state: string | null } | null }; activityType: string; description: string; timestamp: Date }) => ({
          id: act.id,
          customerId: act.customerId,
          companyName: act.customer.companyName,
          customerName: act.customer.name,
          industry: act.customer.industry,
          location: act.customer.location ? `${act.customer.location.city}, ${act.customer.location.state}` : "Unknown Location",
          activityType: act.activityType,
          description: act.description,
          timestamp: act.timestamp,
        })),
        charts: {
          industry: industryGroup.map((g: { industry: string; _count: { id: number } }) => ({ name: g.industry, value: g._count.id })),
          country: countryGroup.map((g: { country: string; _count: { id: number } }) => ({ name: g.country, value: g._count.id })),
          state: stateGroup.map((g: { state: string; _count: { id: number } }) => ({ name: g.state, value: g._count.id })),
          rfqTrends,
        }
      };

      await cacheService.set(cacheKey, payload, 15);

      return NextResponse.json(payload);
    } catch (error: any) {
      console.error("Failed to query analytical dashboards:", error);
      return NextResponse.json({ error: error.message || "Failed to load dashboard parameters" }, { status: 500 });
    }
  }
);
