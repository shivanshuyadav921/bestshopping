import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "../../db/index";
import { cacheService } from "@/lib/cache";
import { eventBus } from "@/lib/event-bus";
import { getReplicaStatus } from "../../db/index";
import os from "os";

const serverStartTime = Date.now();

export const GET = secureRoute(
  { action: "get_health_status", rateLimitLimit: 60, cache: "none" },
  async (req: NextRequest) => {
    const timestamp = new Date().toISOString();
    let dbStatus = "disconnected";
    let dbLatencyMs = 0;
    let overallStatus = "ok";

    // 1. DB Ping
    try {
      const dbStart = Date.now();
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

    // 2. Cache status check
    let cacheStatus = "healthy";
    let cacheType = "memory";
    try {
      const isRedis = (cacheService as any).redisClient !== null;
      const isHealthy = (cacheService as any).isRedisHealthy;
      cacheType = isRedis ? "redis" : "memory";
      cacheStatus = isRedis && !isHealthy ? "degraded" : "healthy";
    } catch (err) {
      cacheStatus = "error";
    }

    // 3. Queue stats check
    let pendingJobs = 0;
    let failedJobs = 0;
    let queueMetrics: any = null;
    try {
      [pendingJobs, failedJobs] = await Promise.all([
        db.backgroundJob.count({ where: { status: "PENDING" } }),
        db.backgroundJob.count({ where: { status: "FAILED" } }),
      ]);
      // Import queue metrics if available
      try {
        const { QueueService } = await import("@/lib/queue");
        queueMetrics = await QueueService.getMetrics();
      } catch {
        // Queue not initialized
      }
    } catch (err) {
      console.warn("Health check: failed to query background job counts", err);
    }

    // 4. Read Replica status
    let replicaStatus: any = { configured: false, circuitState: "N/A", hasReplica: false };
    try {
      replicaStatus = getReplicaStatus();
    } catch {
      // Not critical
    }

    // 5. Event Bus distribution status
    let eventBusDistributed = false;
    try {
      eventBusDistributed = eventBus.isDistributed();
    } catch {
      // Not critical
    }

    const uptimeMs = Date.now() - serverStartTime;
    const memoryUsage = process.memoryUsage();

    const response: any = {
      status: overallStatus,
      timestamp,
      uptime: Math.floor(uptimeMs / 1000),
      version: process.env.npm_package_version || "1.0.0",
      environment: process.env.NODE_ENV || "development",
      services: {
        database: {
          status: dbStatus,
          latencyMs: parseFloat(dbLatencyMs.toFixed(2)),
          replica: {
            configured: replicaStatus.configured,
            circuitState: replicaStatus.circuitState,
          },
        },
        cache: {
          status: cacheStatus,
          type: cacheType,
        },
        queue: {
          pending: pendingJobs,
          failed: failedJobs,
          metrics: queueMetrics ? {
            totalProcessed: queueMetrics.totalProcessed,
            totalSucceeded: queueMetrics.totalSucceeded,
            totalFailed: queueMetrics.totalFailed,
            averageProcessTimeMs: parseFloat(queueMetrics.averageProcessTimeMs.toFixed(2)),
            lastProcessedAt: queueMetrics.lastProcessedAt,
            uptime: parseFloat(queueMetrics.uptime.toFixed(0)),
          } : null,
        },
        eventBus: {
          distributed: eventBusDistributed,
          mode: eventBusDistributed ? "redis_pubsub" : "local_only",
        },
      },
      system: {
        freeMemoryMb: Math.round(os.freemem() / 1024 / 1024),
        totalMemoryMb: Math.round(os.totalmem() / 1024 / 1024),
        heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        cpuCount: os.cpus().length,
      },
      observability: {
        sentry: process.env.SENTRY_DSN ? "configured" : "mock_fallback",
        openTelemetry: "console_bridge",
      },
      infrastructure: {
        horizontalScaling: eventBusDistributed && cacheType === "redis" ? "ready" : "degraded",
        cdn: "headers_configured",
        rateLimiting: "dual_ip_and_user",
      },
    };

    return NextResponse.json(response, { status: overallStatus === "ok" ? 200 : 503 });
  }
);