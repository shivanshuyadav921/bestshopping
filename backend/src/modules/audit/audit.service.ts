import { db } from "@/lib/db";

export class AuditService {
  /**
   * Helper to calculate differences between two objects.
   * Returns { oldVals, newVals } containing only keys that changed.
   */
  static diff(oldObj: Record<string, any> | null | undefined, newObj: Record<string, any> | null | undefined) {
    if (!oldObj) return { oldVals: null, newVals: newObj };
    if (!newObj) return { oldVals: oldObj, newVals: null };

    const oldVals: Record<string, any> = {};
    const newVals: Record<string, any> = {};

    const ignoredKeys = ["createdAt", "updatedAt", "deletedAt"];
    const allKeys = Array.from(new Set([...Object.keys(oldObj), ...Object.keys(newObj)]));

    for (const key of allKeys) {
      if (ignoredKeys.includes(key)) continue;

      const vOld = oldObj[key];
      const vNew = newObj[key];

      // Safe deep comparison using JSON stringify (or direct comparison)
      if (JSON.stringify(vOld) !== JSON.stringify(vNew)) {
        oldVals[key] = vOld;
        newVals[key] = vNew;
      }
    }

    return {
      oldVals: Object.keys(oldVals).length > 0 ? oldVals : null,
      newVals: Object.keys(newVals).length > 0 ? newVals : null,
    };
  }

  /**
   * Write a change log to database
   */
  static async logChange({
    userId,
    action,
    entityName,
    entityId,
    oldValues,
    newValues,
    reason,
  }: {
    userId: string;
    action: string;
    entityName: string;
    entityId: string;
    oldValues: any;
    newValues: any;
    reason?: string;
  }) {
    const { oldVals, newVals } = this.diff(oldValues, newValues);

    // If no values changed, don't create log unless it's a creation or deletion
    if (!oldVals && !newVals && action === "UPDATE") return null;

    return await db.auditLog.create({
      data: {
        userId,
        action,
        entityName,
        entityId,
        oldValues: (oldVals || {}) as any,
        newValues: (newVals || {}) as any,
        reason: reason || null,
      },
    });
  }

  /**
   * Get audit logs for a specific entity
   */
  static async getEntityLogs(entityName: string, entityId: string) {
    return await db.auditLog.findMany({
      where: { entityName, entityId },
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
    });
  }
}
