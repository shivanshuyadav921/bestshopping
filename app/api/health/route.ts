import { NextRequest, NextResponse } from "next/server";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/db";

export const GET = secureRoute(
  { action: "get_health_status", rateLimitLimit: 60 },
  async (req: NextRequest) => {
    const timestamp = new Date().toISOString();
    let dbStatus = "disconnected";
    let dbLatencyMs = 0;
    let overallStatus = "ok";

    try {
      const dbStart = Date.now();
      // Fast select query probe
      await Promise.race([
        db.$queryRaw`SELECT 1`,
        new Promise((_, reject) => setTimeout(() => reject(new Error("Database probe timeout")), 3000))
      ]);
      dbStatus = "connected";
      dbLatencyMs = Date.now() - dbStart;
    } catch (error: any) {
      console.error("Health probe database failure:", error);
      overallStatus = "error";
    }

    return NextResponse.json({
      status: overallStatus,
      timestamp,
      services: {
        database: {
          status: dbStatus,
          latencyMs: dbLatencyMs,
        },
      },
    }, { status: overallStatus === "ok" ? 200 : 503 });
  }
);
