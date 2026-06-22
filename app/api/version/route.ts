import { NextRequest, NextResponse } from "next/server";
import { secureRoute } from "@/lib/api-wrapper";

export const GET = secureRoute(
  { action: "get_version", rateLimitLimit: 100 },
  async (req: NextRequest) => {
    return NextResponse.json({
      status: "ok",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    });
  }
);
