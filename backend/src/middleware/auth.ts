import { Request, Response, NextFunction } from "express";
import { decode } from "next-auth/jwt";

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  // Extract NextAuth session token from cookies
  const token = req.cookies ? (req.cookies["next-auth.session-token"] || req.cookies["__Secure-next-auth.session-token"]) : null;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized", code: "UNAUTHORIZED" });
  }

  try {
    const decoded = await decode({
      token,
      secret: process.env.AUTH_SECRET!,
      salt: token.includes("__Secure-") ? "__Secure-next-auth.session-token" : "next-auth.session-token",
    });

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized", code: "UNAUTHORIZED" });
    }

    // Inject decrypted token as req.user
    (req as any).user = {
      id: decoded.id as string,
      email: decoded.email as string,
      role: decoded.role as string,
      name: decoded.name as string,
    };
    next();
  } catch (err) {
    console.error("JWT Decrypt failed in backend requireAuth middleware:", err);
    return res.status(401).json({ error: "Unauthorized", code: "UNAUTHORIZED" });
  }
}

export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized", code: "UNAUTHORIZED" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "Forbidden", code: "FORBIDDEN" });
    }

    next();
  };
}
