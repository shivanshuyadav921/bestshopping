import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";

export const GET = secureRoute(
  { action: "get_version", rateLimitLimit: 100 },
  async (req: NextRequest) => {
    return NextResponse.json({
      status: "ok",
      version: process.env.npm_package_version || "1.0.0",
      buildTimestamp: process.env.BUILD_TIMESTAMP || new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=600",
      },
    });
  }
);
