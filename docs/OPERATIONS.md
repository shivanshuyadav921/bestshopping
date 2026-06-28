# PREMA Engineering Intelligence Platform — Operations Manual

This guide documents production operations, database backup procedures, background job queue management, error tracking, structured logging protocols, and diagnostic runbooks for the PREMA platform.

---

## 1. System Health & Diagnostics

### Health Check Endpoint
The platform exposes a diagnostic route at `/api/health` returning sub-system status indicators, CPU/RAM utilization, database latency, and cache telemetry.

**Request:**
```bash
GET /api/health
```

**Response Format (JSON):**
```json
{
  "status": "UP",
  "timestamp": "2026-06-23T15:26:00.000Z",
  "uptime": 12845.2,
  "environment": "production",
  "system": {
    "memoryUsage": {
      "rss": "85.24 MB",
      "heapTotal": "42.12 MB",
      "heapUsed": "28.56 MB"
    },
    "cpuLoad": [0.12, 0.08, 0.05]
  },
  "database": {
    "status": "CONNECTED",
    "latencyMs": 14.5
  },
  "cache": {
    "status": "CONNECTED",
    "provider": "Redis"
  },
  "observability": {
    "sentry": "ENABLED",
    "openTelemetry": "ENABLED"
  }
}
```

### Dashboard Telemetry Tab
Administrators can inspect live performance metrics, DB query latency statistics, and background jobs under the **Observability** tab in the Admin Console.

---

## 2. Structured Logging & Request IDs

### Log Format
All server operations emit structured JSON logs via `lib/logger.ts` to `stdout`. This standardizes parsing in log aggregators (e.g. Datadog, ELK, or CloudWatch).

```json
{
  "level": "INFO",
  "timestamp": "2026-06-23T15:26:38.140Z",
  "requestId": "req_8f1ad2b7-84c4-4b5b-800a-6e54ef390f77",
  "action": "ORDER_CREATION",
  "message": "Order created successfully for customer location id loc_87",
  "metadata": {
    "orderId": "ord_201",
    "value": 15200.00
  }
}
```

### Request ID Injection
Every secure API call wrapped by `lib/api-wrapper.ts` generates a unique UUID prefixed with `req_`.
*   The ID is returned in the response header as `X-Request-ID`.
*   All downstream operations and Prisma query durations inherit this ID to form a trace boundary for request tracking.

---

## 3. Slow Query Detection

### Telemetry Threshold
Prisma Client is instrumented via a custom Query Extension in [db/index.ts](file:///c:/Users/shiva/OneDrive/Desktop/shopping/db/index.ts). Any database transaction that exceeds **200ms** triggers the slow query handler:
1.  Logs a `WARN` level message in the structured logs:
    ```json
    {
      "level": "WARN",
      "timestamp": "2026-06-23T15:30:12.420Z",
      "action": "SLOW_QUERY",
      "message": "[Slow Query Detected] RFQ.findMany took 245.18ms",
      "metadata": {
        "model": "RFQ",
        "action": "findMany",
        "durationMs": 245.18
      }
    }
    ```
2.  Dispatches a warning payload to Sentry error tracking.
3.  Records the query metadata into the local `slowQueriesLog` memory buffer visible in the Admin Telemetry dashboard.

---

## 4. Background Job Queue & DLQ Playbook

The queueing daemon runs as a persistent task loop polling every 5 seconds for pending records in the `BackgroundJob` schema table.

### Model Definition (`schema.prisma`)
```prisma
model BackgroundJob {
  id          String   @id @default(uuid())
  taskName    String   // e.g. "send_email", "database_backup"
  payload     String   // Stringified JSON payload
  status      String   // "PENDING", "PROCESSING", "COMPLETED", "FAILED"
  attempts    Int      @default(0)
  maxAttempts Int      @default(5)
  lastError   String?
  runAt       DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([status])
  @@index([runAt])
}
```

### Retry Policy
If a background job fails, the engine triggers an exponential backoff policy:
$$\text{Delay Seconds} = 2^{\text{attempts}} \times 2$$
The job is rescheduled (`status: "PENDING"`) with `runAt` set to current time plus the calculated delay seconds.

### Dead Letter Queue (DLQ)
When a job's attempts meet its `maxAttempts` count (default: 5):
1.  Its status updates to `FAILED` (categorized into the Dead Letter Queue).
2.  An administrator system alert is dispatched.
3.  The job remains in the database with the final stack error documented in `lastError`.

### DLQ Recovery Steps (Admin Console)
1.  Navigate to the Admin Console's **Observability** tab.
2.  Locate the **Dead Letter Queue (DLQ)** table.
3.  **Manual Retry**: Click the "Retry" button. This updates the job back to `PENDING` with 0 attempts and schedules immediate execution.
4.  **Manual Delete**: Click the "Delete" button to purge obsolete or corrupt job payloads.

---

## 5. Database Backup & Disaster Recovery

### Automated Daily Backups
The database backup script runs programmatically as a background task. It outputs date-stamped snapshots into the `/backups` directory.

### Manual Backup Generation
Generate a backup immediately from the command line:
```bash
npx tsx scripts/backup.ts
```

### Programmatic JSON Dump Fallback
If the native `pg_dump` binary is absent on the server node (e.g. serverless environments), the script falls back to serializing all database entities into a structured, validated JSON manifest:
```bash
# Output format:
backups/prema-backup-YYYY-MM-DDTHH-MM-SS-MSZ.json
```

### Restoration Runbook
To restore a JSON backup payload back into the database:
1.  Select the desired backup from `backups/`.
2.  If restoring on a fresh database, deploy migrations first:
    ```bash
    npx prisma db push --accept-data-loss
    ```
3.  Import the JSON using the database seed loader or a target restoration script (e.g. mapping and inserting models sequentially in dependency order: Users -> Customers -> RFCs -> Orders).

---

## 6. Crash Recovery & Resiliency

### Boot Interrupted Job Rescheduling
On node startup or container boot, the background queue worker automatically queries for stuck tasks:
*   Any job with status `PROCESSING` is updated back to `PENDING`.
*   The `lastError` field is set to: `"Interrupted by system crash/restart (auto-recovered)"`.
*   This ensures enqueued tasks (like critical RFQ notifications or customer order notifications) are never permanently dropped due to a server crash.

### Sentry Error Tracking Integration
Runtime exceptions, unhandled rejections, and slow queries are intercepted and pushed to Sentry via the wrapper methods in `lib/sentry.ts`. Sentry integration is controlled by configuring the `SENTRY_DSN` environment variable.

### OpenTelemetry (OTel) Request Tracing
API route requests, background workers, and Prisma operations are instrumented with OpenTelemetry spans in `lib/otel.ts`. Distributed trace IDs propagate across systems to isolate network bottlenecks.
