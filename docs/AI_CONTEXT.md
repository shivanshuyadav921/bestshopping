# PREMA Engineering Intelligence Platform — AI Context Reference

This document is the **primary onboarding guide** for AI coding assistants and new engineers working on the PREMA codebase.

---

## 1. Project Overview

PREMA Engineering Intelligence Platform is a **Customer Intelligence + RFQ + Manufacturing Portal** built with Next.js 16 (App Router), React 19, Prisma 6, PostgreSQL 15, NextAuth.js v5, and Tailwind CSS 4. It serves as an interactive client portal and admin notifications center for PREMA Engineering, a precision CNC manufacturing company.

**Production URL:** Configurable via `NEXTAUTH_URL` env var.

---

## 2. Phase Status

| Phase | Status | Description |
|-------|--------|-------------|
| 1–13 | ✅ Complete | Onboarding, search, RBAC, tags, lead scoring, geocoding, notifications, CRM |
| 14 | ✅ Complete | Communication Hub — email templates, callback requests, conversation histories, WhatsApp |
| 15 | ✅ Complete | Download Center — compliance certificates, inspection records, drawings, quotation previews |
| 16 | ✅ Complete | Engineering Tools — Bearing, Thread, Tolerance, Fit, Surface Finish calculators, Unit Converter, Material Assistant, Gear Tables |
| 17 | ✅ Complete | Analytics Dashboard — SVG heatmaps, demographics, leaderboards, geolocation overrides |
| 19 | ✅ Complete | Certificate Verification — lookup portals, SVG QR codes, CMM inspection grids, admin issuance |
| 20 | ✅ Complete | AI Layer — Engineering Assistant chat workbench, smart search, simulated RAG traces |
| 21 | ✅ Complete | AI Memory — Self-documenting architecture docs for future AI/engineer onboarding |

---

## 3. Core Architecture Paradigms

### Authentication & Authorization
- **NextAuth.js v5** with JWT strategy (HttpOnly cookies, 30-day max age).
- Two roles: `ADMIN` (full `*` permissions) and `CUSTOMER` (scoped to own orders/RFQs/files).
- Middleware enforces auth on all routes except `/auth/*`, `/verify/*`, `/api/health`, `/api/version`.
- Role-based route protection: `/api/admin/*` → ADMIN only, `/api/customer/*` → CUSTOMER or ADMIN.

### Event-Driven Architecture
- **Hybrid Redis Pub/Sub + EventEmitter** event bus (`lib/event-bus.ts`).
- When Redis is connected, events are distributed across all server instances.
- When Redis is unavailable, falls back to local-only EventEmitter.
- Events trigger: database notifications, customer activity logging, email dispatches, WhatsApp alerts, admin alerts.

### Database
- **Prisma 6 ORM** with PostgreSQL 15.
- Read/write splitting via Proxy pattern (reads → `DATABASE_REPLICA_URL`, writes → primary).
- **Circuit breaker** on read replica (CLOSED → OPEN → HALF_OPEN states).
- Slow query detection (>200ms) with Sentry alerts and in-memory telemetry buffer.

### Caching
- **Redis** primary store with automatic in-memory `Map` fallback.
- CDN-compatible cache headers (`Cache-Control`, `CDN-Cache-Control`, `Vercel-CDN-Cache-Control`, `Surrogate-Control`).
- Cache strategies: `staticAsset` (1yr), `publicPage` (60s), `apiDynamic` (30s), `apiModerate` (5min), `noCache`.

### Rate Limiting
- **Dual-layer**: IP-based (60 req/min) + per-user (30 req/min for authenticated users).
- Redis-backed sliding window for distributed rate limiting.
- In-memory fallback for single-instance deployments.

### Background Job Queue
- **Database-backed** persistent queue (`BackgroundJob` model).
- Crash recovery, optimistic concurrency locking, exponential backoff retry.
- Dead Letter Queue (DLQ) with admin alert notifications.
- Redis Pub/Sub for immediate worker wake-up + 10s polling fallback.
- Task types: `send_email`, `database_backup`, `process_inquiry`, `send_notification`, `cleanup_expired_tokens`.

### API Security
- `secureRoute()` HOF wraps all API handlers with: CORS, rate limiting, structured logging, request IDs, session auth, OTel span tracking, Sentry error capture, CDN cache headers.

### File Storage
- **AWS S3** presigned URLs for direct client-to-S3 uploads (15-min expiry).
- Offline/mock mode fallback when S3 credentials are absent.
- File size limits: 50MB max, 20MB warning threshold.
- Allowed types: PDF, PNG, JPEG, STEP, DWG, DXF.

---

## 4. Directory Structure

```
/
├── app/                        # Next.js App Router (Routing, APIs, views)
│   ├── api/                    # Security-validated route handlers
│   │   ├── admin/              # Admin-only endpoints (customers, audit, certificates, dashboard, observability)
│   │   ├── ai/assistant/       # AI Engineering Assistant
│   │   ├── auth/               # NextAuth handlers + registration
│   │   ├── customer/           # Customer-scoped endpoints (profile, RFQ, files, orders, certificates)
│   │   ├── files/              # File upload/download
│   │   ├── health/             # System health check
│   │   ├── inquiries/          # Contact/callback requests
│   │   ├── materials/          # Engineering materials database
│   │   ├── notifications/      # User notifications
│   │   ├── orders/             # Order management
│   │   ├── rfq/                # Request for Quotation
│   │   ├── search/             # Cross-table fuzzy search
│   │   ├── verify/             # Certificate verification (public)
│   │   └── version/            # API version endpoint
│   ├── auth/                   # Login/Register pages
│   ├── command-center/         # Engineering reference workspace
│   ├── dashboard/              # Main portal (admin + customer views)
│   ├── product/[id]/           # Interactive product exhibit
│   ├── products/               # Products gallery
│   ├── timeline/               # Orders timeline
│   └── verify/                 # Certificate verification portal
├── components/                 # React UI components
│   ├── command-center/         # Search area, search results, reference tables
│   ├── engineering/            # Primitives, widgets, telemetry panels
│   ├── timeline/               # Timeline card rendering
│   └── ui/                     # Basic visual building blocks (shadcn/ui)
├── db/                         # Prisma client singleton with read/write splitting
├── docs/                       # This documentation set
├── hooks/                      # Custom React hooks
├── lib/                        # Cross-cutting infrastructure
│   ├── event-bus.ts            # Hybrid Redis Pub/Sub + EventEmitter
│   ├── cache.ts                # Redis + in-memory cache
│   ├── queue.ts                # Background job queue with metrics
│   ├── api-wrapper.ts          # secureRoute() HOF
│   ├── headers.ts              # CDN/cache header utilities
│   ├── storage.ts              # AWS S3 + file validation
│   ├── rate-limit.ts           # Dual-layer rate limiting
│   ├── cors.ts                 # CORS configuration
│   ├── logger.ts               # Structured JSON logger
│   ├── sentry.ts               # Error tracking
│   ├── otel.ts                 # OpenTelemetry span bridge
│   ├── admin-alerts.ts         # System alert dispatcher
│   ├── geocoder.ts             # IP-based geolocation
│   ├── security.ts             # Security utilities
│   ├── validation.ts           # Zod validation helpers
│   └── utils.ts                # General utilities
├── modules/                    # Domain model layers
│   ├── ai/                     # AI Assistant service
│   ├── audit/                  # Audit logging service
│   ├── auth/                   # Auth config + RBAC
│   ├── files/                  # File management service
│   ├── notifications/          # Email, WhatsApp, event listeners
│   ├── orders/                 # Order management service
│   ├── rfq/                    # RFQ management service
│   └── search/                 # Search service with relevance scoring
├── prisma/                     # Database schema, migrations, seeds
├── public/                     # Static assets (PWA manifest, service worker, icons)
├── scripts/                    # Operational scripts (backup, benchmark, worker)
└── types/                      # TypeScript type definitions
```

---

## 5. Key File Locations (Quick Reference)

| Purpose | File Path |
|---------|-----------|
| NextAuth entry point | `auth.ts` |
| Auth configuration (providers, JWT, callbacks) | `modules/auth/auth.config.ts` |
| RBAC permissions matrix | `modules/auth/rbac.ts` |
| Middleware (route protection) | `middleware.ts` |
| Prisma schema | `prisma/schema.prisma` |
| DB singleton (read/write split, circuit breaker) | `db/index.ts` |
| Event bus (Redis Pub/Sub hybrid) | `lib/event-bus.ts` |
| Event listeners (notification triggers) | `modules/notifications/notification.listeners.ts` |
| Email service (Resend + retry) | `modules/notifications/email.service.ts` |
| Background job queue | `lib/queue.ts` |
| API route wrapper (security + cache) | `lib/api-wrapper.ts` |
| CDN/cache headers | `lib/headers.ts` |
| Redis cache service | `lib/cache.ts` |
| Rate limiter | `lib/rate-limit.ts` |
| File storage (S3) | `lib/storage.ts` |
| AI Assistant service | `modules/ai/ai.service.ts` |
| Search service | `modules/search/search.service.ts` |
| Health check endpoint | `app/api/health/route.ts` |
| Main dashboard page | `app/dashboard/page.tsx` |
| Home/landing page | `app/page.tsx` |

---

## 6. Coding Conventions & Best Practices

1. **Dark Mode Theme**: Charcoal base `#0c0c0e`, white text with opacities, Signal Red `#ef4444` hover highlights.
2. **Microtask Deferred State**: Client-side state setters in hooks should use `Promise.resolve().then(...)` for React 19 render cycle purity.
3. **API Routes**: Always use `secureRoute()` wrapper for CORS, rate limiting, logging, and error handling.
4. **Database**: Never modify core GD&T, CMM inspection, or S3 download signature validity metrics.
5. **Git**: Never execute `git commit` on behalf of the user.
6. **New Components**: Use `components/ui/` primitives (shadcn/ui) as building blocks.
7. **Event Bus**: Use `eventBus.emit()` for cross-cutting concerns (notifications, logging, alerts). Do not make direct DB writes in route handlers for side effects.

---

## 7. Known Issues & Operational Gotchas

1. **Multiple Lockfiles**: If a parent directory contains another `package-lock.json`, Next.js compiles with a Turbopack root directory warning. Delete secondary lockfiles outside the workspace.
2. **Resend Sandbox**: When using a sandbox Resend API key, sender must be `onboarding@resend.dev` and recipients must be whitelisted.
3. **IP Geocoder Accuracy**: The IP-based geocoder (`lib/geocoder.ts`) provides approximate coordinates. For precision heatmaps, use admin manual coordinate overrides.
4. **Inline Worker**: The background queue worker runs in the same process as the web server by default. Set `DISABLE_INLINE_WORKER=true` and use `scripts/worker.ts` for separate process deployment in production.
5. **Event Bus Duplication**: With Redis Pub/Sub, the originating instance also processes its own events locally (not just via Redis). Event listeners should be idempotent.

---

## 8. Future Platform Roadmap

1. **Vector Store (pgvector)**: Replace rule-based AI parser with PostgreSQL vector indices + remote LLM API (Google Gemini).
2. **Shopfloor QR Integration**: Mobile barcode scanners on CNC workpieces linking to `/verify/[id]` records.
3. **Active Telemetry Logs**: Live CNC machine utilization and cutter temperature via MQTT protocol.
4. **Separate Worker Process**: Extract background queue worker into dedicated container for independent scaling.
5. **Multi-Region Deployment**: Geographic routing with database replication across regions.