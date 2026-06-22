# PREMA — Engineering Intelligence Platform & Manufacturing Operating System Backend

This repository houses the secure, modular backend for the PREMA manufacturing intelligence platform. It features structured modules, Auth.js (NextAuth) RBAC authorization, event-driven email notifications, cryptographic CAD drawing URL signatures, sliding-window rate-limiting, and deep database auditing.

---

## 🛠 Tech Stack
- **Core**: Next.js 15+, TypeScript, React
- **Persistence**: PostgreSQL, Prisma ORM
- **Authentication**: Auth.js / NextAuth (Credentials + Google OAuth)
- **Email Service**: Resend Email API
- **Validation**: Zod
- **Infrastructure Utilities**: Node EventEmitter, In-memory Sliding Window Rate Limiter (Swaps to Redis if `REDIS_URL` is set)

---

## 📦 Root Directory Structure
All backend modules and services reside in a single Next.js project root:
```text
├── app/                  # Next.js App Router (APIs, routes)
│   └── api/              # API endpoints (All server routes)
├── components/           # (Immutable Presentation Layer placeholders)
├── modules/              # Feature modules (auth, orders, rfq, search, etc.)
│   ├── auth/             # Credentials, RBAC, and Config helpers
│   ├── audit/            # Entity state diff logging service
│   ├── orders/           # Order states lifecycle and transitions logic
│   └── ...               # (materials, engineering, files, notifications)
├── lib/                  # Shared core utilities (CORS, logger, errors)
├── db/                   # Database Client instantiator
├── prisma/               # Prisma database schema and seeding script
├── README.md             # This file
├── package.json          # Main dependency package configuration
└── tsconfig.json         # TypeScript configuration
```

---

## 🚀 Quick Start (Local Setup)

### 1. Install Dependencies
Ensure you have Node.js 18+ installed. Run:
```bash
npm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env.local` (Next.js automatically reads this file in development):
```bash
cp .env.example .env.local
```
Fill out the variables inside `.env.local`:
- `DATABASE_URL`: PostgreSQL connection string.
- `AUTH_SECRET`: Random 32-byte secret (generate using `openssl rand -base64 32`).
- `RESEND_API_KEY`: API key for email notifications (defaults to `re_mock_12345` for local console logs).

### 3. Database Initialization & Seeding
Configure your PostgreSQL instance and sync the Prisma schema:
```bash
# Generate Prisma Client
npx prisma generate

# Apply migrations / push schema
npx prisma db push

# Seed engineering catalog and default users
npx prisma db seed
```

**Seeded Accounts (Password: `password123`):**
- Owner: `owner@prema.com`
- Admin: `admin@prema.com`
- Production Engineer: `production@prema.com`
- Quality Engineer: `quality@prema.com`
- Sales Desk: `sales@prema.com`
- Customer Client: `customer@client.com`

### 4. Run Development Server
```bash
npm run dev
```
The API is now running locally at `http://localhost:3000`.

---

## 🧪 Running Tests
Unit and integration tests cover RBAC authorization, sliding-window rate limiters, token-based signed URL validation, Zod payload rules, and audit diff calculators.
```bash
npm test
```
*Note: Under the hood, this executes Node's native runner: `npx tsx --test modules/orders/orders.test.ts modules/auth/security.test.ts`.*

---

## 🏗 Build Verification
Verify type safety and compilation compliance with zero errors:
```bash
# Run Linter
npm run lint

# Build production bundle
npm run build
```

---

## 🛰 Health & Version Monitoring
External load balancers, uptime monitors, or Kubernetes probes can hit these public endpoints:
- **Health Check**: `GET /api/health`
  - Probes database latency using `SELECT 1` with a 3-second timeout.
  - Returns `200 OK` (healthy) or `503 Service Unavailable` (db down).
- **Version Endpoint**: `GET /api/version`
  - Returns semantic software version and server timestamp.

---

## ☁️ Deployment Instructions
This project has a **Deployment-First Architecture**. It can be deployed directly from the repository root to any provider without changing directory settings.

### 1. Vercel
1. Link your repository.
2. Select **Next.js** framework.
3. Configure Environment Variables in the project settings.
4. Click **Deploy**. (Build and DB Client generation are handled automatically).

### 2. Render / Railway
Set the following settings:
- **Build Command**: `npm install && npx prisma generate && npm run build`
- **Start Command**: `npm run start`
- Ensure all environment variables are mapped under settings.

### 3. Docker (VPS or Self-Hosted)
Build and run the project using a standard Node container:
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start"]
```
Build command:
```bash
docker build -t prema-backend .
docker run -p 3000:3000 --env-file .env prema-backend
```

---

## 🔍 Troubleshooting & Common Errors

### 1. Database Connection Timeout / P1001 Error
- **Cause**: Database instance is offline or connection string is misconfigured.
- **Fix**: Check `DATABASE_URL` matches your credentials. Probe connection status by hitting `/api/health`.

### 2. Missing AUTH_SECRET / JWT Error
- **Cause**: NextAuth throws an error at startup.
- **Fix**: Generate and add `AUTH_SECRET="..."` in your env settings.

### 3. Rate Limit Block (HTTP 429)
- **Cause**: Exceeded permitted request thresholds (e.g. 15 RFQ creations/min, 30 login tries).
- **Fix**: Check response header `X-RateLimit-Reset` to find seconds until reset. For clustered deploys, define `REDIS_URL` to coordinate rate limits.
