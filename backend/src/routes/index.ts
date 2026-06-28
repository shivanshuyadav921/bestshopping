import { Router } from "express";
import { requireAuth, requireRole } from "../middleware/auth";

// Import all route modules
import * as healthRoute from "./health/route";
import * as versionRoute from "./version/route";
import * as materialsRoute from "./materials/route";
import * as searchRoute from "./search/route";
import * as verifyRoute from "./verify/[id]/route";

// Auth subroutes (public)
import * as registerRoute from "./auth/register/route";
import * as forgotPasswordRoute from "./auth/forgot-password/route";
import * as resetPasswordRoute from "./auth/reset-password/route";
import * as changePasswordRoute from "./auth/change-password/route";

// Admin routes
import * as adminAuditLogsRoute from "./admin/audit-logs/route";
import * as adminCertificatesRoute from "./admin/certificates/route";
import * as adminCustomersRoute from "./admin/customers/[id]/route";
import * as adminAnalyticsRoute from "./admin/dashboard/analytics/route";
import * as adminMetricsRoute from "./admin/observability/metrics/route";
import * as adminReadinessRoute from "./admin/production-readiness/route";
import * as adminSecurityRoute from "./admin/security/route";

// Customer routes
import * as customerCertificatesRoute from "./customer/certificates/route";
import * as customerFilesRoute from "./customer/files/route";
import * as customerOrdersRoute from "./customer/orders/route";
import * as customerProfileRoute from "./customer/profile/route";
import * as customerRfqRoute from "./customer/rfq/route";

// Other standard business routes
import * as aiAssistantRoute from "./ai/assistant/route";
import * as aiCopilotRoute from "./ai/copilot/route";
import * as filesRoute from "./files/route";
import * as fileDetailsRoute from "./files/[id]/route";
import * as fileShareRoute from "./files/[id]/share/route";
import * as inquiriesRoute from "./inquiries/route";
import * as inquiryDetailsRoute from "./inquiries/[id]/route";
import * as notificationsRoute from "./notifications/route";
import * as ordersRoute from "./orders/route";
import * as orderDetailsRoute from "./orders/[id]/route";
import * as productsRoute from "./products/route";
import * as productDetailsRoute from "./products/[id]/route";
import * as rfqRoute from "./rfq/route";
import * as rfqDetailsRoute from "./rfq/[id]/route";

const router = Router();

// Helper to register handler methods
function register(path: string, routeModule: any, middlewares: any[] = []) {
  if (routeModule.GET) router.get(path, ...middlewares, routeModule.GET);
  if (routeModule.POST) router.post(path, ...middlewares, routeModule.POST);
  if (routeModule.PATCH) router.patch(path, ...middlewares, routeModule.PATCH);
  if (routeModule.PUT) router.put(path, ...middlewares, routeModule.PUT);
  if (routeModule.DELETE) router.delete(path, ...middlewares, routeModule.DELETE);
}

// 1. PUBLIC ROUTES
register("/health", healthRoute);
register("/version", versionRoute);
register("/verify/:id", verifyRoute);

// Auth - nextauth wildcards and actions
register("/auth/register", registerRoute);
register("/auth/forgot-password", forgotPasswordRoute);
register("/auth/reset-password", resetPasswordRoute);
// Change password requires active session
register("/auth/change-password", changePasswordRoute, [requireAuth]);

// 2. SECURE BUSINESS ROUTES (Require Authentication)
// Materials, Notifications, and Search
register("/materials", materialsRoute, [requireAuth]);
register("/notifications", notificationsRoute, [requireAuth]);
register("/search", searchRoute, [requireAuth]);

// AI Services
register("/ai/assistant", aiAssistantRoute, [requireAuth]);
register("/ai/copilot", aiCopilotRoute, [requireAuth]);

// Files
register("/files", filesRoute, [requireAuth]);
register("/files/:id", fileDetailsRoute, [requireAuth]);
register("/files/:id/share", fileShareRoute, [requireAuth]);

// Inquiries
register("/inquiries", inquiriesRoute, [requireAuth]);
register("/inquiries/:id", inquiryDetailsRoute, [requireAuth]);

// Orders
register("/orders", ordersRoute, [requireAuth]);
register("/orders/:id", orderDetailsRoute, [requireAuth]);

// RFQs
register("/rfq", rfqRoute, [requireAuth]);
register("/rfq/:id", rfqDetailsRoute, [requireAuth]);

// Products
register("/products", productsRoute, [requireAuth]);
register("/products/:id", productDetailsRoute, [requireAuth]);

// 3. CUSTOMER SPECIFIC SECURED ROUTES (CUSTOMER or ADMIN)
const customerGuard = [requireAuth, requireRole(["CUSTOMER", "ADMIN"])];
register("/customer/certificates", customerCertificatesRoute, customerGuard);
register("/customer/files", customerFilesRoute, customerGuard);
register("/customer/orders", customerOrdersRoute, customerGuard);
register("/customer/profile", customerProfileRoute, customerGuard);
register("/customer/rfq", customerRfqRoute, customerGuard);

// 4. ADMIN SPECIFIC SECURED ROUTES (ADMIN only)
const adminGuard = [requireAuth, requireRole(["ADMIN"])];
register("/admin/audit-logs", adminAuditLogsRoute, adminGuard);
register("/admin/certificates", adminCertificatesRoute, adminGuard);
register("/admin/customers/:id", adminCustomersRoute, adminGuard);
register("/admin/dashboard/analytics", adminAnalyticsRoute, adminGuard);
register("/admin/observability/metrics", adminMetricsRoute, adminGuard);
register("/admin/production-readiness", adminReadinessRoute, adminGuard);
register("/admin/security", adminSecurityRoute, adminGuard);

export default router;
