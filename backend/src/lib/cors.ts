import { NextRequest, NextResponse } from "next/server";

const allowedOriginsEnv = process.env.ALLOWED_ORIGINS || "";
const allowedOrigins = allowedOriginsEnv
  .split(",")
  .map((o) => o.trim())
  .filter((o) => o.length > 0);

export function getCorsHeaders(req: NextRequest): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const isProd = process.env.NODE_ENV === "production";

  // In development, if no ALLOWED_ORIGINS is set, default to allowing localhost origin for ease of use
  const defaultOrigins = isProd ? [] : ["http://localhost:3000", "http://127.0.0.1:3000"];
  const list = allowedOrigins.length > 0 ? allowedOrigins : defaultOrigins;

  const headers: Record<string, string> = {
    "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Credentials": "true",
  };

  if (list.includes(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
  } else if (!isProd && !origin) {
    // Standard server-to-server or non-browser request
    headers["Access-Control-Allow-Origin"] = "*";
  } else {
    // If mismatch, set origin to the first allowed origin or leave empty (blocked by browser CORS)
    headers["Access-Control-Allow-Origin"] = list[0] || "";
  }

  return headers;
}

export function handleOptionsRequest(req: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(req),
  });
}
