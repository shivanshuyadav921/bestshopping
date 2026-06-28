import * as crypto from "crypto";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { UnauthorizedError, ForbiddenError } from "./errors";

const SECRET = process.env.AUTH_SECRET || "fallback_secret_for_signing_tokens_123456";

export const ADMIN_ROLES: UserRole[] = [UserRole.ADMIN, UserRole.OWNER];

/**
 * Ensures session is active and returns the user object.
 */
export function requireAuth(session: any) {
  if (!session || !session.user) {
    throw new UnauthorizedError();
  }
  return session.user;
}

/**
 * Ensures user has an allowed role.
 */
export function requireRole(role: UserRole, allowedRoles: UserRole[]) {
  if (!allowedRoles.includes(role)) {
    throw new ForbiddenError();
  }
}

/**
 * Sign a short-lived token for secure downloads or actions.
 */
export function signToken(payload: Record<string, any>, expirySeconds: number): string {
  const expiresAt = Date.now() + expirySeconds * 1000;
  const data = JSON.stringify({ ...payload, expiresAt });

  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(data);
  const signature = hmac.digest("hex");

  const tokenPayload = Buffer.from(data).toString("base64url");
  return `${tokenPayload}.${signature}`;
}

/**
 * Verify a signature token and ensure it has not expired.
 */
export function verifyToken(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;

    const [tokenPayload, signature] = parts;
    if (!tokenPayload || !signature) return null;

    const dataStr = Buffer.from(tokenPayload, "base64url").toString("utf8");

    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(dataStr);
    const expectedSignature = hmac.digest("hex");

    if (signature !== expectedSignature) return null;

    const payload = JSON.parse(dataStr);
    if (Date.now() > payload.expiresAt) return null; // Expired

    return payload;
  } catch (error) {
    return null;
  }
}

/**
 * Enforce resource ownership checks for Customer roles.
 * Admins, Owners, and qualified Engineering roles bypass customer restriction checks.
 */
export async function requireOwnership({
  userId,
  userRole,
  resourceId,
  type,
}: {
  userId: string;
  userRole: UserRole;
  resourceId: string;
  type: "order" | "rfq" | "file";
}): Promise<boolean> {
  const isEmployee = (
    [
      UserRole.OWNER,
      UserRole.ADMIN,
      UserRole.PRODUCTION_ENGINEER,
      UserRole.QUALITY_ENGINEER,
      UserRole.SALES_ENGINEER,
    ] as UserRole[]
  ).includes(userRole);

  if (isEmployee) {
    return true;
  }

  // Find customer profile linked to the User ID
  const customer = await db.customer.findUnique({
    where: { userId },
  });

  if (!customer) return false;

  if (type === "order") {
    const order = await db.order.findFirst({
      where: { id: resourceId, deletedAt: null },
    });
    return order ? order.customerId === customer.id : false;
  }

  if (type === "rfq") {
    const rfq = await db.rFQ.findFirst({
      where: { id: resourceId, deletedAt: null },
    });
    return rfq ? rfq.customerId === customer.id : false;
  }

  if (type === "file") {
    const file = await db.uploadedFile.findFirst({
      where: { id: resourceId, deletedAt: null },
    });
    return file ? file.ownerId === userId : false;
  }

  return false;
}
export default requireOwnership;
