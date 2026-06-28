# PREMA Engineering Intelligence Platform — Deployment Guide

---

## 1. Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DATABASE_URL` | Yes | — | PostgreSQL connection string |
| `DATABASE_REPLICA_URL` | No | — | Read replica connection string |
| `AUTH_SECRET` | Yes | — | NextAuth JWT secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Yes | — | Public production URL |
| `RESEND_API_KEY` | Yes | — | Resend email API key |
| `EMAIL_FROM` | No | `PREMA <noreply@prema-manufacturing.com>` | Sender email address |
| `NOTIFICATION_RECEIVER_EMAIL` | No | `owner@prema-manufacturing.com` | Admin alert recipient |
| `REDIS_URL` | No | — | Redis connection string |
| `AWS_ACCESS_KEY_ID` | No | — | S3 access key |
| `AWS_SECRET_ACCESS_KEY` | No | — | S3 secret key |
| `AWS_S3_BUCKET` | No | — | S3 bucket name |
| `AWS_REGION` | No | `us-east-1` | S3 region |
| `ALLOWED_ORIGINS` | No | — | CORS allowed origins (comma-separated) |
| `SENTRY_DSN` | No | — | Sentry error tracking DSN |
| `DB_POOL_MIN` | No | `2` | Min DB connections |
| `DB_POOL_MAX` | No | `10` | Max DB connections |
| `DB_POOL_TIMEOUT` | No | `10000` | DB connection timeout (ms) |
| `DISABLE_INLINE_WORKER` | No | `false` | Disable inline queue worker |

---

## 2. Docker Compose Deployment (Recommended)

```bash
# 1. Copy and configure environment
cp .env.example .env.local
# Edit .env.local with your values

# 2. Start all services
docker compose up --build -d

# 3. Run database migrations
docker compose exec app npx prisma migrate deploy

# 4. Seed database
docker compose exec app npx prisma db seed

# 5. View logs
docker compose logs -f app
```

### Docker Compose Services

| Service | Image | Port | Resource Limit |
|---------|-------|------|---------------|
| `db` | `postgres:15-alpine` | 5432 | 512MB / 1 CPU |
| `redis` | `redis:7-alpine` | 6379 | 128MB / 0.5 CPU |
| `app` | Custom build | 3000 | 1GB / 2 CPU |

### PostgreSQL Tuning (Docker)
```
shared_buffers = 128MB
effective_cache_size = 384MB
work_mem = 4MB
maintenance_work_mem = 64MB
max_connections = 50
log_min_duration_statement = 200ms
```

### Redis Persistence (Docker)
```
appendonly = yes
save 60 1000
maxmemory = 100mb
maxmemory-policy = allkeys-lru
```

---

## 3. Vercel / Railway Deployment

1. Link GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Add build hook to `package.json`:
   ```json
   "vercel-build": "npx prisma generate && next build"
   ```
4. Use managed PostgreSQL (Railway, Supabase, or Neon)
5. Use Upstash Redis for caching/rate limiting

---

## 4. Manual VPS Deployment

```bash
# 1. Clone and install
git clone <repo> && cd shopping
npm ci

# 2. Generate Prisma client
npx prisma generate

# 3. Run migrations
npx prisma migrate deploy

# 4. Seed database
npx prisma db seed

# 5. Build
npm run build

# 6. Start
npm start
```

---

## 5. Production Configuration

### Standalone Output
`next.config.ts` uses `output: "standalone"` — produces a self-contained Node.js server.

### Multi-Instance Deployment
- All infrastructure components support horizontal scaling:
  - **Event Bus**: Redis Pub/Sub distributes events across instances
  - **Rate Limiting**: Redis-backed sliding window works across instances
  - **Cache**: Redis shared cache across instances
  - **Queue**: Database-backed with optimistic concurrency locking
- Set `DISABLE_INLINE_WORKER=true` on all but one instance, or deploy `scripts/worker.ts` as a separate process

### Separate Worker Process (Production Recommended)
```bash
# Run worker independently
DISABLE_INLINE_WORKER=true npm start  # Web server(s)
npx tsx scripts/worker.ts             # Dedicated worker
```

---

## 6. TLS & Domain

- **HTTPS Required**: Configure reverse proxy (Nginx, Cloudflare, Caddy)
- **Cookie Security**: NextAuth auto-detects `https://` prefix and sets `__Secure-` cookie prefix
- **CDN**: Place behind Cloudflare or CloudFront for edge caching

---

## 7. Health Checks

```bash
# Application health
curl http://localhost:3000/api/health

# Returns: database status, cache status, queue metrics,
#          replica circuit breaker, event bus mode, system resources