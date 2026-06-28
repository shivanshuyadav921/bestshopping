# PREMA Engineering Intelligence Platform — Troubleshooting Guide

---

## 1. Database Issues

### PostgreSQL won't start
```bash
# Check if port 5432 is in use
lsof -i :5432

# Check Docker container health
docker compose logs db --tail=50

# Verify credentials match .env.local
echo $DATABASE_URL
```

### Prisma migration errors
```bash
# Force push schema (ignores data loss warnings)
npx prisma db push --accept-data-loss

# Full reset (DESTROYS ALL DATA)
npx prisma db push --force-reset

# Regenerate Prisma client
npx prisma generate
```

### Read replica circuit breaker open
- **Symptom**: Health endpoint shows `"circuitState": "OPEN"` for database replica
- **Cause**: 5+ consecutive failures on the read replica
- **Fix**: Check replica availability. Circuit auto-recovers after 30 seconds if replica is healthy.

### Slow queries detected
- **Symptom**: Health endpoint shows high `latencyMs`, `slowQueriesLog` entries in observability dashboard
- **Fix**: Add database indexes for frequently queried columns. Check `prisma/schema.prisma` for existing indexes.

---

## 2. Redis Issues

### Redis connection refused
```bash
# Check Redis container
docker compose logs redis --tail=50

# Test connection
redis-cli ping

# Check Redis memory usage
redis-cli info memory
```

### Application falls back to in-memory cache
- **Symptom**: Health endpoint shows `"cache.type": "memory"`
- **Cause**: Redis URL not configured or Redis unavailable
- **Fix**: Set `REDIS_URL` env var. Ensure Redis is running. App automatically falls back to in-memory `Map`.

---

## 3. Authentication Issues

### NextAuth JWT token errors
```bash
# Regenerate AUTH_SECRET
openssl rand -base64 32

# Ensure NEXTAUTH_URL matches your deployment URL exactly
NEXTAUTH_URL="https://your-domain.com"
```

### Cookie issues in production
- **Symptom**: Users logged out unexpectedly
- **Fix**: Ensure HTTPS is configured. NextAuth uses `__Secure-` cookie prefix in production which requires HTTPS.

### Google OAuth not working
- **Fix**: Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` env vars. Add authorized redirect URIs in Google Cloud Console.

---

## 4. Email Issues (Resend)

### Emails not sending
```bash
# Check RESEND_API_KEY is set
echo $RESEND_API_KEY

# Check EMAIL_FROM matches Resend requirements:
# - Sandbox: must be "onboarding@resend.dev"
# - Production: must use verified domain
```

### Sandbox restrictions
- Sender must be `onboarding@resend.dev`
- Recipient emails must be whitelisted on Resend dashboard
- Switch to production API key for live emails

### Email retry failures
- Check DLQ (Dead Letter Queue) in admin observability dashboard
- Manual retry available for failed jobs
- Admin alert dispatched when jobs reach max attempts (5)

---

## 5. File Upload Issues

### S3 presigned URL failures
```bash
# Verify S3 credentials
echo $AWS_ACCESS_KEY_ID
echo $AWS_S3_BUCKET
echo $AWS_REGION

# App falls back to mock URLs when S3 is not configured
# Check console for: "[StorageService] Missing AWS S3 credentials. Using offline mock mode."
```

### File size errors
- Maximum upload size: 50 MB
- Allowed types: PDF, PNG, JPEG, STEP, DWG, DXF
- Check `lib/storage.ts` for `FILE_SIZE_LIMITS` and `ALLOWED_FILE_TYPES`

---

## 6. Build & Compilation Issues

### Turbopack root directory warning
- **Cause**: Another `package-lock.json` exists in a parent directory
- **Fix**: Delete the secondary lockfile outside the project workspace

### TypeScript errors
```bash
# Run type checking
npx tsc --noEmit

# Check specific file
npx tsc --noEmit --pretty 2>&1 | head -50
```

### ESLint errors
```bash
npm run lint
```

---

## 7. Queue Worker Issues

### Jobs stuck in PROCESSING status
- **Cause**: Server crashed during job execution
- **Fix**: On restart, the worker auto-recovers by resetting PROCESSING → PENDING
- **Manual fix**: `UPDATE "BackgroundJob" SET status = 'PENDING' WHERE status = 'PROCESSING'`

### Jobs in FAILED status (Dead Letter Queue)
- Check error message in `lastError` field
- Admin can retry from observability dashboard
- Or manually: `QueueService.retryJob(jobId)`

### Worker not processing jobs
- Check `DISABLE_INLINE_WORKER` is not `true`
- Check Redis Pub/Sub connection for immediate wake-up
- Worker polls every 10 seconds as fallback
- Check console logs for `QUEUE_WORKER_INIT` message

---

## 8. Rate Limiting Issues

### Legitimate requests blocked
- Default: 60 req/min per IP, 30 req/min per user
- Check `X-RateLimit-Remaining` response header
- Redis failure causes per-process in-memory limits (may differ across instances)
- **Fix**: Increase limits in `secureRoute()` config per route

---

## 9. Performance Issues

### Slow API responses
1. Check health endpoint: `GET /api/health`
2. Review slow query log in observability dashboard
3. Check Redis connection status
4. Verify CDN cache headers are being set (`Cache-Control` in response)

### High memory usage
- Check system resources in health endpoint
- Review `slowQueriesLog` for unbounded data
- Consider increasing `DB_POOL_MAX` if connections are exhausted

---

## 10. Event Bus Issues

### Events not firing across instances
- Check event bus `distributed` mode in health endpoint
- If `mode: "local_only"` → Redis Pub/Sub not connected
- Events still fire locally on the originating instance
- **Fix**: Ensure `REDIS_URL` is configured on all instances

### Duplicate event processing
- The originating instance processes events both locally AND via Redis
- Event listeners should be idempotent
- Use database unique constraints to prevent duplicate records