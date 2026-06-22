import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user as any;
  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isAuthPage = nextUrl.pathname.startsWith("/auth");

  // 1. Allow login/auth API endpoints and auth pages
  if (isAuthPage || nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // 2. Enforce authentication
  if (!isLoggedIn) {
    if (isApiRoute) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }

  // 3. Enforce simple route protections based on Role
  const role = user?.role;

  if (nextUrl.pathname.startsWith("/api/customer")) {
    if (role !== "CUSTOMER" && role !== "OWNER" && role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  if (nextUrl.pathname.startsWith("/api/admin")) {
    if (role !== "ADMIN" && role !== "OWNER") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
  }

  return NextResponse.next();
});

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
