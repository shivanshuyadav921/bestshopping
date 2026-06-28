import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user as any;
  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isAuthPage = nextUrl.pathname.startsWith("/auth");

  // 1. Define protected routes that require authentication
  const isProtectedRoute =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/profile") ||
    nextUrl.pathname.startsWith("/admin") ||
    nextUrl.pathname.startsWith("/orders") ||
    nextUrl.pathname.startsWith("/settings") ||
    nextUrl.pathname.startsWith("/api/customer") ||
    nextUrl.pathname.startsWith("/api/admin");

  // 2. Enforce authentication
  if (isProtectedRoute && !isLoggedIn) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // 3. Enforce simple route protections based on Role
  const role = user?.role;

  if (nextUrl.pathname.startsWith("/api/customer")) {
    if (role !== "CUSTOMER" && role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  if (nextUrl.pathname.startsWith("/api/admin")) {
    if (role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  // 4. Proxy API requests to backend (except NextAuth internal endpoints)
  if (isApiRoute) {
    const isNextAuthInternal =
      nextUrl.pathname.startsWith("/api/auth") &&
      !nextUrl.pathname.startsWith("/api/auth/register") &&
      !nextUrl.pathname.startsWith("/api/auth/forgot-password") &&
      !nextUrl.pathname.startsWith("/api/auth/reset-password") &&
      !nextUrl.pathname.startsWith("/api/auth/change-password");

    if (!isNextAuthInternal) {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
      return NextResponse.rewrite(new URL(nextUrl.pathname + nextUrl.search, backendUrl));
    }
  }

  return NextResponse.next();
});

export default proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public folder assets like logo, icons)
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
