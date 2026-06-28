import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db, slowQueriesLog } from "@/db/index";
import { UserRole } from "@prisma/client";
import { cacheService } from "@/lib/cache";
import { QueueService } from "@/lib/queue";
import os from "os";

// GET: Returns real-time observability telemetry metrics
export const GET = secureRoute(
  { action: "get_observability_metrics", rateLimitLimit: 30 },
  async (req: NextRequest, session: any) => {
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
      // 1. Database Health Check & Latency
      let dbStatus = "connected";
      let dbLatencyMs = 0;
      try {
        const start = performance.now();
        await db.$queryRaw`SELECT 1`;
        dbLatencyMs = performance.now() - start;
      } catch (err) {
        dbStatus = "disconnected";
      }

      // 2. Cache Layer Health Check
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

      // 3. Background Job Queue Metrics
      const [totalJobs, pendingCount, processingCount, completedCount, failedCount, failedJobsList] = await Promise.all([
        db.backgroundJob.count(),
        db.backgroundJob.count({ where: { status: "PENDING" } }),
        db.backgroundJob.count({ where: { status: "PROCESSING" } }),
        db.backgroundJob.count({ where: { status: "COMPLETED" } }),
        db.backgroundJob.count({ where: { status: "FAILED" } }),
        db.backgroundJob.findMany({
          where: { status: "FAILED" },
          orderBy: { updatedAt: "desc" },
          take: 10,
        }),
      ]);

      // 4. Host System Performance Stats
      const memoryUsage = process.memoryUsage();
      const freeMem = os.freemem();
      const totalMem = os.totalmem();
      const systemStats = {
        uptimeSeconds: Math.floor(process.uptime()),
        nodeVersion: process.version,
        processHeapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
        processHeapTotalMb: Math.round(memoryUsage.heapTotal / 1024 / 1024),
        systemFreeMemMb: Math.round(freeMem / 1024 / 1024),
        systemTotalMemMb: Math.round(totalMem / 1024 / 1024),
        systemMemoryLoadPercent: Math.round(((totalMem - freeMem) / totalMem) * 100),
      };

      return NextResponse.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        system: systemStats,
        database: {
          status: dbStatus,
          latencyMs: parseFloat(dbLatencyMs.toFixed(2)),
        },
        cache: {
          status: cacheStatus,
          type: cacheType,
        },
        queue: {
          metrics: {
            total: totalJobs,
            pending: pendingCount,
            processing: processingCount,
            completed: completedCount,
            failed: failedCount, // DLQ count
          },
          dlq: failedJobsList.map((job: { id: string; taskName: string; payload: any; attempts: number; maxAttempts: number; lastError: string | null; updatedAt: Date }) => ({
            id: job.id,
            taskName: job.taskName,
            payload: job.payload,
            attempts: job.attempts,
            maxAttempts: job.maxAttempts,
            lastError: job.lastError,
            updatedAt: job.updatedAt,
          })),
        },
        slowQueries: slowQueriesLog,
      });

    } catch (error: any) {
      console.error("Observability metrics query exception:", error);
      return NextResponse.json({ error: error.message || "Observability metrics fetch failure" }, { status: 500 });
    }
  }
);

// POST: Handles DLQ actions (retry/delete)
export const POST = secureRoute(
  { action: "post_observability_action", rateLimitLimit: 20 },
  async (req: NextRequest, session: any) => {
    if (!session?.user || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    try {
      const body = await req.json();
      const { action, jobId } = body;

      if (!action) {
        return NextResponse.json({ error: "Missing action specification" }, { status: 400 });
      }

      if (action === "backup") {
        const { runBackupProgrammatic } = await import("@/scripts/backup");
        const backupRes = await runBackupProgrammatic();
        if (backupRes.success) {
          return NextResponse.json({ success: true, message: `Database backup completed successfully: ${backupRes.filename}` });
        } else {
          return NextResponse.json({ error: backupRes.error || "Backup failed" }, { status: 500 });
        }
      }

      if (!jobId) {
        return NextResponse.json({ error: "Missing jobId specification" }, { status: 400 });
      }

      if (action === "retry") {
        const success = await QueueService.retryJob(jobId);
        if (success) {
          return NextResponse.json({ success: true, message: `Job ${jobId} rescheduled to PENDING.` });
        } else {
          return NextResponse.json({ error: "Reschedule failed. Ensure job is in FAILED state." }, { status: 400 });
        }
      }

      if (action === "delete") {
        const success = await QueueService.deleteJob(jobId);
        if (success) {
          return NextResponse.json({ success: true, message: `Job ${jobId} deleted from database.` });
        } else {
          return NextResponse.json({ error: "Delete operation failed." }, { status: 400 });
        }
      }

      return NextResponse.json({ error: "Unsupported action operation" }, { status: 400 });

    } catch (error: any) {
      console.error("Observability action exception:", error);
      return NextResponse.json({ error: error.message || "Failed to execute administrative queue action" }, { status: 500 });
    }
  }
);
