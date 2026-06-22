import test from "node:test";
import assert from "node:assert";
import { hasPermission } from "../auth/rbac";
import { AuditService } from "../audit/audit.service";
import { paginationQuerySchema } from "../../lib/validation";
import { UserRole } from "@prisma/client";

test("RBAC permissions validation", async (t) => {
  await t.test("Owner must have access to all actions", () => {
    assert.strictEqual(hasPermission(UserRole.OWNER, "any_action"), true);
    assert.strictEqual(hasPermission(UserRole.OWNER, "manage_users"), true);
  });

  await t.test("Customer cannot execute admin actions", () => {
    assert.strictEqual(hasPermission(UserRole.CUSTOMER, "manage_users"), false);
    assert.strictEqual(hasPermission(UserRole.CUSTOMER, "view_own_orders"), true);
  });

  await t.test("Production Engineer permissions check", () => {
    assert.strictEqual(hasPermission(UserRole.PRODUCTION_ENGINEER, "manage_jobs"), true);
    assert.strictEqual(hasPermission(UserRole.PRODUCTION_ENGINEER, "issue_certificates"), false);
  });
});

test("Audit diff calculation engine", async (t) => {
  await t.test("Detect changes between two state objects", () => {
    const oldObj = { status: "RFQ_RECEIVED", totalAmount: 100, notes: "old notes", updatedAt: new Date() };
    const newObj = { status: "QUOTED", totalAmount: 100, notes: "new notes", updatedAt: new Date() };

    const { oldVals, newVals } = AuditService.diff(oldObj, newObj);

    assert.deepStrictEqual(oldVals, { status: "RFQ_RECEIVED", notes: "old notes" });
    assert.deepStrictEqual(newVals, { status: "QUOTED", notes: "new notes" });
  });

  await t.test("Return null if values match", () => {
    const oldObj = { status: "QUOTED", totalAmount: 50 };
    const newObj = { status: "QUOTED", totalAmount: 50 };

    const { oldVals, newVals } = AuditService.diff(oldObj, newObj);

    assert.strictEqual(oldVals, null);
    assert.strictEqual(newVals, null);
  });
});

test("Pagination schema validation", async (t) => {
  await t.test("Parse normal query limits", () => {
    const parsed = paginationQuerySchema.safeParse({ limit: "15" });
    assert.strictEqual(parsed.success, true);
    if (parsed.success) {
      assert.strictEqual(parsed.data.limit, 15);
    }
  });

  await t.test("Reject out of range limits", () => {
    const parsed = paginationQuerySchema.safeParse({ limit: 500 });
    assert.strictEqual(parsed.success, false);
  });
});
