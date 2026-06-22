import test from "node:test";
import assert from "node:assert";
import { hasPermission } from "./rbac";
import { signToken, verifyToken } from "../../lib/security";
import { rateLimit } from "../../lib/rate-limit";
import { paginationQuerySchema } from "../../lib/validation";
import { UserRole } from "@prisma/client";

test("Security Hardening - RBAC Authorization Matrix", async (t) => {
  await t.test("Verify permissions are strictly role-based", () => {
    // Quality Engineer must only inspect, not manage users
    assert.strictEqual(hasPermission(UserRole.QUALITY_ENGINEER, "manage_inspections"), true);
    assert.strictEqual(hasPermission(UserRole.QUALITY_ENGINEER, "manage_users"), false);

    // Customer must only see own info
    assert.strictEqual(hasPermission(UserRole.CUSTOMER, "view_own_orders"), true);
    assert.strictEqual(hasPermission(UserRole.CUSTOMER, "manage_users"), false);
  });
});

test("Security Hardening - Cryptographic URL Signatures", async (t) => {
  const secretPayload = { fileId: "123-abc-uuid", userId: "user-456", userRole: UserRole.CUSTOMER };

  await t.test("Successfully generate and verify signed token within lifetime", () => {
    // Sign valid for 5 seconds
    const token = signToken(secretPayload, 5);
    assert.ok(token);
    assert.ok(token.includes("."));

    const decoded = verifyToken(token);
    assert.ok(decoded);
    assert.strictEqual(decoded.fileId, secretPayload.fileId);
    assert.strictEqual(decoded.userId, secretPayload.userId);
  });

  await t.test("Reject expired tokens", async () => {
    // Sign valid for 0 seconds (expired immediately)
    const token = signToken(secretPayload, -1);
    const decoded = verifyToken(token);
    assert.strictEqual(decoded, null);
  });

  await t.test("Reject malformed or tampered tokens", () => {
    const token = signToken(secretPayload, 10);
    const parts = token.split(".");
    
    // Modify signature part
    const tamperedToken = `${parts[0]}.wrongsignaturehash`;
    const decoded = verifyToken(tamperedToken);
    assert.strictEqual(decoded, null);
  });
});

test("Security Hardening - Sliding Window Rate Limiting", async (t) => {
  const testIp = "192.168.1.50";
  const action = "test_login_limit";

  await t.test("Allow requests within rate boundary", async () => {
    const res1 = await rateLimit(testIp, action, 3, 2); // Limit 3 per 2 seconds
    const res2 = await rateLimit(testIp, action, 3, 2);
    
    assert.strictEqual(res1.success, true);
    assert.strictEqual(res1.remaining, 2);
    assert.strictEqual(res2.success, true);
    assert.strictEqual(res2.remaining, 1);
  });

  await t.test("Block requests exceeding rate limit boundary", async () => {
    // 3rd request is allowed
    const res3 = await rateLimit(testIp, action, 3, 2);
    assert.strictEqual(res3.success, true);
    assert.strictEqual(res3.remaining, 0);

    // 4th request must be blocked
    const res4 = await rateLimit(testIp, action, 3, 2);
    assert.strictEqual(res4.success, false);
    assert.strictEqual(res4.remaining, 0);
    assert.ok(res4.reset > 0);
  });
});

test("Security Hardening - Strict Input Payloads (Zod)", async (t) => {
  const strictPaginationSchema = paginationQuerySchema.strict();

  await t.test("Accept standard schema properties", () => {
    const result = strictPaginationSchema.safeParse({ limit: 20 });
    assert.strictEqual(result.success, true);
  });

  await t.test("Reject payloads containing unknown injected fields", () => {
    const result = strictPaginationSchema.safeParse({
      limit: 20,
      adminOverrideInjection: "true", // Injected parameter
    });
    assert.strictEqual(result.success, false);
  });
});
