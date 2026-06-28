import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { requireAuth, requireRole, ADMIN_ROLES } from "@/lib/security";
import { ProductionReadinessScorer, PerformanceMonitor } from "@/lib/performance";

/** GET /api/admin/production-readiness — Production readiness score */
export const GET = secureRoute(
    { action: "production_readiness", rateLimitLimit: 10, cache: "none" },
    async (req: NextRequest, session: any) => {
        const user = requireAuth(session);
        requireRole(user.role, ADMIN_ROLES);

        const [readinessReport, perfSummary] = await Promise.all([
            ProductionReadinessScorer.evaluate(),
            Promise.resolve(PerformanceMonitor.getMetricsSummary()),
        ]);

        return NextResponse.json({
            ...readinessReport,
            performance: perfSummary,
        });
    }
);