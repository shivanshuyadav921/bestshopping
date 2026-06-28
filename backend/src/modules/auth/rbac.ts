import { UserRole } from "@prisma/client";

export const RolePermissions: Record<UserRole, string[]> = {
  OWNER: ["*"],
  ADMIN: [
    "manage_users",
    "manage_orders",
    "view_reports",
    "manage_materials",
    "view_orders",
    "view_materials",
    "view_customers",
    "manage_inspections",
    "manage_jobs",
    "issue_certificates"
  ],
  PRODUCTION_ENGINEER: [
    "manage_jobs",
    "view_orders",
    "view_materials",
    "view_inspections"
  ],
  QUALITY_ENGINEER: [
    "manage_inspections",
    "issue_certificates",
    "view_orders",
    "view_materials"
  ],
  SALES_ENGINEER: [
    "manage_rfqs",
    "view_orders",
    "view_customers",
    "view_materials"
  ],
  CUSTOMER: [
    "create_rfq",
    "view_own_orders",
    "download_certificates",
    "view_own_rfqs"
  ],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = RolePermissions[role] || [];
  if (permissions.includes("*")) return true;
  return permissions.includes(permission);
}

export function assertPermission(role: UserRole, permission: string): void {
  if (!hasPermission(role, permission)) {
    throw new Error("Forbidden: Insufficient permissions");
  }
}
