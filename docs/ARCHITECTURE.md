# PREMA Engineering Intelligence Platform — System Architecture

---

## 1. High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CDN Edge Layer                            │
│         (Cloudflare / CloudFront / Vercel Edge)                  │
│   ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│   │ Static Cache  │  │ Page Cache   │  │ API Response Cache    │ │
│   │ (1 year)      │  │ (60s SWR)    │  │ (30s dynamic)         │ │
│   └──────────────┘  └──────────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Next.js Application Layer                     │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     Middleware                              │  │
│  │  • Authentication (NextAuth.js v5 JWT)                     │  │
│  │  • Route Protection (ADMIN / CUSTOMER)                     │  │
│  │  • Public Routes (/auth, /verify, /health, /version)      │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │  Page Routes  │  │  API Routes  │  │  Static Assets        │ │
│  │  (SSR/CSR)    │  │  (REST)      │  │  (PWA + Next.js)      │ │
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                  secureRoute() HOF                         │  │
│  │  CORS → Rate Limit → Auth → Handler → Cache Headers       │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌──────────────────┐ ┌──────────────┐ ┌──────────────────────┐
│  PostgreSQL 15    │ │  Redis 7     │ │  AWS S3              │
│  ┌──────────────┐ │ │  ┌─────────┐│ │  ┌──────────────────┐│
│  │ Primary (RW)  │ │ │  │ Cache   ││ │  │ Presigned URLs   ││
│  │ + Replica (R) │ │ │  │ Queue   ││ │  │ File Uploads     ││
│  │ Circuit Breaker│ │ │  │ Events  ││ │  │ File Downloads   ││
│  └──────────────┘ │ │  │ RateLim ││ │  └──────────────────┘│
│  Prisma 6 ORM     │ │  └─────────┘│ │  (Offline Mock Mode) │
└──────────────────┘ └──────────────┘ └──────────────────────┘
              │               │
              ▼               ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Background Services                             │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │ Queue Worker  │  │ Event Bus    │  │ Notification Engine   │ │
│  │ (DB-backed)  │  │ (Redis+Local)│  │ (Email + WhatsApp)    │ │
│  │ • Email       │  │ • Cross-node │  │ • Resend (3 retries)  │ │
│  │ • Backup      │  │ • Idempotent │  │ • WhatsApp API        │ │
│  │ • Cleanup     │  │ • Local fall │  │ • In-app Notifs       │ │
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Observability Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────────┐ │
│  │ Sentry        │  │ OpenTelemetry│  │ Structured Logger     │ │
│  │ (Error Track) │  │ (Spans)      │  │ (JSON stdout)         │ │
│  │ + Admin Alerts│  │              │  │ + Request IDs         │ │
│  └──────────────┘  └──────────────┘  └───────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Request Lifecycle

```
Client Request
    │
    ▼
[CDN Edge] ── Cache HIT → Return cached response
    │ Cache MISS
    ▼
[Next.js Middleware]
    │ 1. Check public routes (/auth, /verify, /health, /version) → Next
    │ 2. Check authentication → Redirect to /auth/login if not logged in
    │ 3. Check role-based route protection → 403 if forbidden
    ▼
[secureRoute() HOF]
    │ 1. CORS preflight handling
    │ 2. Rate limiting (IP + per-user)
    │ 3. Session authentication
    │ 4. OTel span start
    │ 5. Execute route handler
    │ 6. Set response headers (CORS, rate limit, cache, request ID)
    │ 7. OTel span end
    ▼
[Route Handler]
    │ Reads → Prisma Proxy → Read Replica (if available) or Primary
    │ Writes → Prisma Proxy → Primary DB
    │ Side effects → eventBus.emit() → Listeners
    ▼
[Response to Client]
    │ With CDN cache headers for edge caching
    ▼
[Event Bus (async)]
    │ → Database notifications
    │ → Customer activity logging
    │ → Email dispatches (via queue or direct)
    │ → WhatsApp alerts
    │ → Admin alerts
```

---

## 3. Authentication Flow

```
1. User submits credentials to /api/auth/[...nextauth]
2. NextAuth validates against User table (bcrypt.compare)
3. JWT token created with { id, email, role }
4. HttpOnly cookie set (__Secure-next-auth.session-token in production)
5. On sign-in, eventBus.emit("user.login") fires:
   a. Customer activity logged
   b. Admin database notification created
   c. Email sent on first login
6. Subsequent requests: middleware reads JWT, checks role
7. Session strategy: JWT, maxAge 30 days, updateAge 24 hours
```

---

## 4. Event Bus Architecture

### Events & Listeners

| Event | Trigger | Listeners |
|-------|---------|-----------|
| `user.registered` | POST /api/auth/register | Admin notification, welcome email, lead creation |
| `user.login` | NextAuth signIn callback | Activity log, admin notification, first-login email |
| `rfq.created` | POST /api/rfq | Activity log, admin notification, customer notification, email |
| `rfq.quoted` | Admin quotes RFQ | Activity log, customer notification, email |
| `file.uploaded` | POST /api/files | Activity log, admin notification, email |
| `inquiry.received` | POST /api/inquiries | Admin notification, email, WhatsApp (for callbacks) |
| `profile.updated` | PATCH /api/customer/profile | Activity log, admin notification |
| `quote.approved` | Customer approves quote | Activity log, admin notification, email |
| `certificate.downloaded` | Customer downloads cert | Activity log, admin notification, email |
| `order.updated` | Admin updates order status | Customer activity, notification, email (status-specific) |
| `inspection.completed` | Inspection record created | Customer notification, email |
| `order.dispatched` | Order marked dispatched | Customer notification, email with tracking |
| `breakdown.alert` | Emergency breakdown form | Urgent email to admin |

### Distribution Model
- **With Redis**: Events are published to `prema_event_bus` channel. All instances subscribe and emit locally. Originating instance also processes locally.
- **Without Redis**: Local EventEmitter only. Single-instance deployment.
- **Idempotency**: Listeners should be designed to handle duplicate events gracefully.

---

## 5. Database Read/Write Splitting

```
                    ┌─────────────┐
                    │  Prisma DB   │
                    │   Proxy      │
                    └──────┬──────┘
                           │
              ┌────────────┴────────────┐
              │ isRead method?           │
              │ find*, count, aggregate  │
              │ groupBy                  │
              ├──────────┬───────────────┤
              │ YES      │ NO            │
              ▼          ▼               │
    ┌──────────────┐  ┌──────────────┐   │
    │  Read Replica │  │  Primary     │   │
    │  (if config)  │  │  Database    │   │
    │  Circuit      │  │              │   │
    │  Breaker      │  │              │   │
    └──────────────┘  └──────────────┘   │
              │                          │
              │  Circuit Breaker:        │
              │  CLOSED → OPEN → HALF    │
              │  _OPEN                   │
              │  Failure threshold: 5    │
              │  Recovery timeout: 30s   │
              │  Success threshold: 3    │
```

---

## 6. Background Job Queue Flow

```
┌──────────┐     enqueue()      ┌──────────────┐
│  Route   │ ─────────────────→ │ BackgroundJob │
│  Handler │                    │ (DB Record)   │
└──────────┘                    └──────┬───────┘
                                       │
                          ┌────────────┴────────────┐
                          │ Redis Pub/Sub available?  │
                          ├──────────┬───────────────┤
                          │ YES      │ NO             │
                          ▼          ▼                │
                   ┌──────────┐  ┌──────────────┐    │
                   │ Publish  │  │ Wait for      │    │
                   │ "new_job"│  │ polling (10s) │    │
                   └──────────┘  └──────────────┘    │
                          │                          │
                          └────────────┬─────────────┘
                                       ▼
                              ┌──────────────┐
                              │ Queue Worker  │
                              │ processNext() │
                              └──────┬───────┘
                                     │
                          ┌──────────┴──────────┐
                          │ Task type?           │
                          ├──────────┬───────────┤
                          │ send_    │ database_ │
                          │ email    │ backup    │
                          │ ...      │ ...       │
                          └──────────┴───────────┘
                                     │
                          ┌──────────┴──────────┐
                          │ Success?             │
                          ├──────────┬───────────┤
                          │ YES      │ NO        │
                          ▼          ▼           │
                    ┌────────┐  ┌────────────┐   │
                    │COMPLETED│ │Retry?       │  │
                    └────────┘  │Exponential  │  │
                                │backoff:     │  │
                                │2^n * 2 sec  │  │
                                └──────┬──────┘  │
                                       │         │
                                ┌──────┴──────┐  │
                                │ Max attempts │  │
                                │ reached?     │  │
                                ├──────────────┤  │
                                │ YES → DLQ    │  │
                                │ NO → Resched │  │
                                └──────────────┘  │
```

---

## 7. Component Hierarchy

### App Layout
```
RootLayout
├── SessionProvider (NextAuth)
│   ├── ThemeProvider (dark/light toggle)
│   │   ├── PwaProvider (service worker)
│   │   │   ├── {children} (page content)
│   │   │   ├── CommandPalette (Cmd+K)
│   │   │   ├── ShortcutCheatSheet
│   │   │   └── Toaster (sonner notifications)
```

### Home Page
```
Home
├── Header (navigation)
├── CinematicHero (animated hero)
├── ScrollAssembly (scroll-driven animations)
├── ProductShowcase (3D product viewer)
├── Capabilities (engineering capabilities)
├── Industries (industry segments)
├── EngineeringIntelligence (AI preview)
├── Process (manufacturing process)
├── QualityVerification (CMM inspection)
├── TechnicalResourceLibrary (downloads)
├── CaseStudies (success stories)
├── EngineeringHistory (timeline)
├── EmergencyBreakdownCenter (urgent RFQ)
├── RFQConfigurator (quotation form)
├── Contact (inquiry form)
└── Footer
```

---

## 8. Infrastructure Summary

| Component | Implementation | Fallback |
|-----------|---------------|----------|
| CDN/Edge Caching | HTTP cache headers (s-maxage, stale-while-revalidate) | Origin-only serving |
| Redis | ioredis with health checks | In-memory Map |
| Event Bus | Redis Pub/Sub + EventEmitter | Local EventEmitter |
| Rate Limiting | Redis sorted sets (sliding window) | In-memory Map (per-process) |
| DB Connection Pool | Prisma defaults + env config | Auto (CPU cores × 2 + 1) |
| Read Replica | Prisma Proxy routing | Circuit breaker → primary |
| Background Queue | Database-backed + Redis Pub/Sub | Polling interval (10s) |
| File Storage | AWS S3 presigned URLs | Offline mock URLs |
| Error Tracking | Sentry | Console logs + admin alerts |
| Observability | OpenTelemetry spans | Console bridge |
| Structured Logging | JSON stdout | Console output |