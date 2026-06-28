# PREMA Engineering Intelligence Platform

A secure, high-performance precision manufacturing operating system built with Next.js 16 (App Router), React 19, Prisma 6, PostgreSQL 15, Redis 7, NextAuth.js v5, and Tailwind CSS 4.

---

## 1. System Architecture

The platform uses a decoupled frontend/backend paradigm hosted as a unified Next.js package:

- **API Handlers**: Strict REST operations validated by Zod schemas, secured with role-based authorization (`ADMIN` / `CUSTOMER`), and wrapped with CORS, rate limiting, CDN cache headers, and OpenTelemetry tracing.
- **Database**: Prisma Client with read/write splitting, read replica circuit breaker, and slow query detection.
- **Authentication**: NextAuth.js v5 with secure HttpOnly JWT session tokens (30-day max age).
- **Event Bus**: Hybrid Redis Pub/Sub + EventEmitter for cross-instance event distribution.
- **Background Queue**: Database-backed persistent job queue with crash recovery, exponential backoff, and Dead Letter Queue.
- **Caching**: Redis primary with in-memory fallback + CDN-compatible cache headers.
- **Rate Limiting**: Dual-layer — IP-based (60 req/min) + per-user (30 req/min) with Redis sliding window.
- **File Storage**: AWS S3 presigned URLs with offline mock fallback.
- **Observability**: Sentry error tracking, OpenTelemetry spans, structured JSON logging with request IDs.
- **CDN/Edge**: Cache-Control, CDN-Cache-Control, Vercel-CDN-Cache-Control, and Surrogate-Control headers for edge caching.

---

## 2. Directory Structure

```
/
├── app/                        # Next.js App Router (Routing, APIs, views)
│   ├── api/                    # Security-validated route handlers
│   ├── auth/                   # Secure authentication forms (Login / Registration)
│   ├── command-center/         # Engineering reference workspace
│   ├── dashboard/              # Customer and administrative dashboard
│   ├── machines/               # Machine Showcase — fleet specs, animations, timeline
│   ├── copilot/                # AI Engineering Copilot — RAG-powered chat
│   ├── tools/                  # Engineering Intelligence Tools — 10 calculators
│   ├── product/                # Interactive product exhibit view
│   ├── products/               # Products museum gallery view
│   └── timeline/               # Orders timeline interface
├── components/                 # React UI components
│   ├── command-center/         # Reference tables, filters, search utilities
│   ├── engineering/            # Primitives, widgets, telemetry panels
│   ├── timeline/               # Timeline card rendering
│   └── ui/                     # Basic visual building blocks (shadcn/ui)
├── db/                         # Prisma database client singleton (read/write split + circuit breaker)
├── docs/                       # Engineering manuals (see "Documentation" below)
├── hooks/                      # Custom React hooks (telemetry caching, search queries)
├── lib/                        # Cross-cutting systems
│   ├── event-bus.ts            # Hybrid Redis Pub/Sub + EventEmitter
│   ├── cache.ts                # Redis + in-memory cache
│   ├── queue.ts                # Background job queue with metrics
│   ├── api-wrapper.ts          # secureRoute() HOF (CORS, rate limit, auth, cache, OTel)
│   ├── headers.ts              # CDN/cache header utilities
│   ├── storage.ts              # AWS S3 presigned URLs + file validation
│   ├── rate-limit.ts           # Dual-layer rate limiting
│   └── ...                     # Logger, security, geocoder, errors, CORS, Sentry, OTel
├── modules/                    # Domain model layers
│   ├── ai/                     # AI Engineering Assistant
│   ├── auth/                   # Auth config + RBAC
│   ├── notifications/          # Email (Resend), WhatsApp, event listeners
│   ├── orders/                 # Order management
│   ├── rfq/                    # RFQ management
│   └── search/                 # Cross-table fuzzy search
├── prisma/                     # Database schemas, migrations, seeds
├── public/                     # Static assets (PWA manifest, service worker)
├── scripts/                    # Operational scripts (backup, benchmark, worker)
└── types/                      # TypeScript specifications
```

---

## 3. Environment Configurations

Copy `.env.example` to `.env.local` and populate these parameters:

```bash
# Required: Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/prema_db?schema=public"

# Optional: Read Replica (for horizontal scaling)
DATABASE_REPLICA_URL="postgresql://user:password@replica:5432/prema_db"

# Required: NextAuth Cryptography Secret
AUTH_SECRET="your_nextauth_cryptography_secret_string"
NEXTAUTH_URL="http://localhost:3000"

# Required: Notifications (Resend API)
RESEND_API_KEY="re_your_api_key"
EMAIL_FROM="PREMA <noreply@prema-manufacturing.com>"
NOTIFICATION_RECEIVER_EMAIL="owner@prema-manufacturing.com"

# Recommended: Redis (for distributed caching, rate limiting, event bus)
REDIS_URL="redis://localhost:6379"

# Optional: Object Storage (Amazon S3)
AWS_ACCESS_KEY_ID="your_access_key"
AWS_SECRET_ACCESS_KEY="your_secret_key"
AWS_S3_BUCKET="your_bucket"
AWS_REGION="us-east-1"

# Optional: CORS (comma-separated domains)
ALLOWED_ORIGINS="http://localhost:3000"

# Optional: Error Tracking
SENTRY_DSN="your_sentry_dsn"

# Optional: Database Pool Tuning
DB_POOL_MIN="2"
DB_POOL_MAX="10"
DB_POOL_TIMEOUT="10000"

# Optional: Worker Control
DISABLE_INLINE_WORKER="false"
```

---

## 4. Setup & Operations

### Local Development Setup
1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start local PostgreSQL + Redis (Docker)**:
   ```bash
   docker compose up db redis -d
   ```
3. **Run migrations**:
   ```bash
   npx prisma db push --force-reset
   ```
4. **Seed database**:
   ```bash
   npx prisma db seed
   ```
5. **Start development server**:
   ```bash
   npm run dev
   ```

### Production Deployment
```bash
# Full stack with Docker Compose
docker compose up --build -d
docker compose exec app npx prisma migrate deploy
docker compose exec app npx prisma db seed
```

---

## 5. Development Commands

```bash
# Prisma
npx prisma generate              # Generate Prisma client types
npx prisma db push               # Push schema to database
npx prisma db push --force-reset # Reset database (DESTRUCTIVE)
npx prisma db seed               # Seed database

# Build & Quality
npm run lint                     # ESLint checks
npx tsc --noEmit                 # TypeScript type checking
npm test                         # Run test suites
npm run build                    # Production build
npm start                        # Start production server

# Backup
npx tsx scripts/backup.ts        # Generate database backup
```

---

## 6. Business Workflow & Features (Phases 1–21)

1. **Customer Onboarding & Profiles** (Phases 1–5): Demographic metrics, geolocation with 3-layer fallback (manual → GPS → IP geocoder), lead scoring, CRM tags, admin notes.
2. **Unified Inbox** (Phases 6–8): Live notifications for registrations, logins, uploads, quotations, certificates.
3. **Leads Management & CRM** (Phases 9–13): Auto-lead creation, tag assignments (`Automotive`, `Medical`, etc.), lead scoring classifier, internal admin notes.
4. **Communication Hub** (Phase 14): Contact/callback forms, WhatsApp integration, transactional email templates, conversation histories.
5. **Download Center & Customer Portal** (Phase 15): CMM metrology reports, material test certificates, drawings, sandbox iframe previews, quotation drawers, customer timeline.
6. **Engineering Intelligence Tools** (Phase 16): 10 interactive calculators — Bearing, Thread, Tolerance, Fits, Surface Finish, Unit Converter, Material Assistant, Gear Geometry, Engineering Notes, Quick Lookup. Uses TechnicalIcon system, responsive layout.
7. **Analytics Center & Location Heatmaps** (Phase 17): SVG geographic heatmaps, top-customer leaderboards, growth metrics, coordinate overrides.
8. **Traceability & Certificate Verification** (Phase 19): Anonymous verification portal, CMM inspection grids, SVG QR code generator, 15-minute token-based downloads.
9. **AI Layer & Assistant** (Phase 20): Engineering Assistant chat workbench, smart search matching orders/clients, simulated RAG trace metadata.
9b. **AI Copilot** (Phase 29): Enhanced AI Engineering Copilot with RAG-powered knowledge retrieval (12 sources), natural language intent classification, material recommendations, tolerance suggestions, drawing understanding stub, voice input (Web Speech API), text-to-speech output, RBAC-scoped data access, and future MCP integration placeholder.
10. **Machine Showcase** (Phase 18): Interactive fleet showcase — Mazak, Haas, Sodick EDM, Zeiss/Hexagon inspection equipment with specs, SVG animations, and acquisition timeline.
11. **AI Memory Documentation** (Phase 21): Self-documenting architecture for future AI/engineer onboarding — 7 comprehensive guides.

### Infrastructure Features
- **Horizontal Scaling**: Redis Pub/Sub event bus, distributed rate limiting, shared cache
- **CDN/Edge Caching**: Cache headers compatible with Cloudflare, CloudFront, Vercel Edge
- **Database Resilience**: Read replica circuit breaker, slow query detection, connection pooling
- **Background Jobs**: Persistent queue with crash recovery, exponential backoff, DLQ, metrics
- **Observability**: Health endpoint with infrastructure status, Sentry, OpenTelemetry, structured logging

---

## 7. Platform Documentation

| Guide | Description |
|-------|-------------|
| **[AI Context Reference](docs/AI_CONTEXT.md)** | Primary onboarding guide — architecture paradigms, directory structure, coding conventions, known issues, roadmap |
| **[System Architecture](docs/ARCHITECTURE.md)** | Component diagrams, request lifecycle, event bus, DB read/write splitting, queue flow |
| **[Database Manual](docs/DATABASE.md)** | Schema topology, ER diagram, model reference, indexes, cascading rules, seed data |
| **[API Reference](docs/API_REFERENCE.md)** | All endpoints, request/response formats, rate limiting, caching strategies |
| **[Business Workflows](docs/BUSINESS_WORKFLOW.md)** | RFQ-to-delivery pipeline, onboarding, notifications, CRM, certificate verification |
| **[Deployment Guide](docs/DEPLOYMENT.md)** | Environment variables, Docker Compose, Vercel/Railway, VPS, TLS, multi-instance |
| **[Operations Manual](docs/OPERATIONS.md)** | Health checks, structured logging, slow queries, backup procedures, crash recovery |
| **[Troubleshooting Manual](docs/TROUBLESHOOTING.md)** | Database, Redis, auth, email, S3, build, queue, rate limiting, performance issues |