# PREMA Engineering Intelligence Platform — Database Manual

---

## 1. Database Technology

- **Engine**: PostgreSQL 15 (Alpine image)
- **ORM**: Prisma 6 with TypeScript client
- **Schema Location**: `prisma/schema.prisma`
- **Migrations**: `prisma/migrations/`
- **Seed Script**: `prisma/seed.ts` (run via `npx prisma db seed`)

---

## 2. Connection Configuration

```bash
# Primary connection
DATABASE_URL="postgresql://user:pass@host:5432/prema_db?schema=public&connection_limit=15&pool_timeout=10"

# Optional read replica
DATABASE_REPLICA_URL="postgresql://user:pass@replica-host:5432/prema_db?schema=public"
```

### Connection Pool Settings (via env vars)

| Variable | Default | Description |
|----------|---------|-------------|
| `DB_POOL_MIN` | `2` | Minimum idle connections |
| `DB_POOL_MAX` | `10` | Maximum pool size |
| `DB_POOL_TIMEOUT` | `10000` | Connection timeout (ms) |

### Read/Write Splitting

The Prisma client in `db/index.ts` uses a Proxy pattern:
- **Read operations** (`findUnique`, `findFirst`, `findMany`, `count`, `aggregate`, `groupBy`) → routed to `DATABASE_REPLICA_URL` if configured
- **Write operations** (all others) → always routed to primary `DATABASE_URL`
- **Circuit breaker** monitors replica health (5 failures → open, 30s recovery → half-open, 3 successes → closed)

---

## 3. Entity Relationship Diagram

```
┌──────────┐     ┌──────────┐     ┌──────────────┐
│   User    │────<│ Account   │     │ Verification │
│           │────<│ Session   │     │    Token     │
│           │────<│ AuditLog  │     └──────────────┘
│           │────<│ Notification│
│           │────<│ UploadedFile│
│           │────<│ InspectionRec│
│           │────<│ Job (assigned)│
│           │────<│ OrderUpdate   │
└─────┬────┘     └──────────┘     └──────────────┘
      │
      │ 1:1
      ▼
┌──────────────┐     ┌──────────────────┐
│  Customer     │────<│ CustomerLocation  │
│               │────<│ CustomerActivity  │
│               │────<│ Inquiry           │
│               │────<│ RFQ               │
│               │────<│ Order             │
└──────────────┘     └──────────────────┘
                            │
                     ┌──────┴──────┐
                     │             │
              ┌──────┴──┐  ┌──────┴──┐
              │OrderUpdate│ │Certificate│
              │Job        │ │UploadedFile│
              │Inspection │ │           │
              └──────────┘ └───────────┘

┌──────────┐  ┌──────────┐  ┌──────────────┐
│ Material  │  │ Bearing   │  │ ThreadStandard│
│ HeatTreat │  │ Fit       │  │ SurfaceFinish │
│ Tolerance │  │ GearData  │  │              │
└──────────┘  └──────────┘  └──────────────┘

┌──────────────┐  ┌────────────┐
│ ComponentQuote│  │BackgroundJob│
└──────────────┘  └────────────┘

┌──────────┐  ┌──────────┐
│ Machine   │  │   Lead    │
└──────────┘  └──────────┘
```

---

## 4. Model Reference

### User & Auth

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `User` | System users (admin + customer) | id, email, passwordHash, role (ADMIN/CUSTOMER), deletedAt |
| `Account` | OAuth provider links | provider, providerAccountId, access_token, refresh_token |
| `Session` | Active sessions | sessionToken, userId, expires |
| `VerificationToken` | Email verification tokens | identifier, token, expires |

### CRM & Customer

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Customer` | Customer profiles | userId, companyName, industry, country, state, city, tags[], leadScore, adminNotes |
| `CustomerLocation` | GPS/IP coordinates | latitude, longitude, source (MANUAL/GEOLOCATION/IP) |
| `CustomerActivity` | Activity timeline | activityType, description, timestamp |
| `Lead` | Sales leads (auto-created on registration) | status (NEW/CONTACTED/CONVERTED/LOST), leadScore (HIGH/MEDIUM/LOW) |
| `Inquiry` | Contact/callback/support requests | type (CONTACT/CALLBACK), message, status (PENDING/RESOLVED) |

### Orders & Manufacturing

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `RFQ` | Request for Quotation | description, status (PENDING/QUOTED/APPROVED/REJECTED), estimatedPrice |
| `Order` | Manufacturing orders | status (OrderStatus enum), totalAmount, rfqId |
| `OrderUpdate` | Status change history | status, note, createdById |
| `Job` | Manufacturing jobs on machines | machineId, assignedToId, status (QUEUED/RUNNING/COMPLETED/PAUSED) |
| `Machine` | CNC machines | code, capacity (JSON), status (ACTIVE/MAINTENANCE/OFFLINE) |
| `InspectionRecord` | CMM quality inspection | parametersChecked (JSON), status (PASSED/FAILED) |
| `Certificate` | Quality certificates | type (Material/HeatTreatment/Inspection), fileId |

### Order Status Enum

```prisma
enum OrderStatus {
  RFQ_RECEIVED
  QUOTED
  APPROVED
  MATERIAL_PROCUREMENT
  MANUFACTURING
  INSPECTION
  DISPATCH
  DELIVERED
}
```

### File Management

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `UploadedFile` | All uploaded files | filename, url, fileType (PDF/STEP/DWG/DXF/PNG/JPEG), size, ownerId, rfqId, orderId |

### Engineering Data

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Material` | Material specifications | code (EN8, EN19, EN24, SS304, SS316), grade, properties (JSON) |
| `HeatTreatment` | Heat treatment processes | processName, parameters (JSON) |
| `SurfaceFinish` | Surface finish standards | code (Ra0.8, Ra1.6), valueRa |
| `Fit` | ISO fit classifications | code (H7/g6, H7/k6), type (Clearance/Transition/Interference), holeLimit, shaftLimit |
| `Tolerance` | ISO tolerance standards | standard (ISO 2768), classification, rangeMin, rangeMax, value |
| `ThreadStandard` | Thread specifications | designation (M6, M8...), pitch, majorDiameter, type (Metric/UNF/UNC) |
| `Bearing` | Bearing specifications | modelNumber (6205...), innerDiameter, outerDiameter, width, dynamicLoad, staticLoad |
| `GearData` | Gear parameters | module, teethCount, pressureAngle, helixAngle, pitchDiameter |
| `ComponentQuote` | RFQ configurator submissions | componentType, materialType, dimensions (JSON), toleranceClass |

### Infrastructure

| Model | Purpose | Key Fields |
|-------|---------|------------|
| `Notification` | In-app notifications | userId, title, message, isRead |
| `AuditLog` | Data change audit trail | userId, action, entityName, entityId, oldValues, newValues |
| `BackgroundJob` | Persistent job queue | taskName, payload, status (PENDING/PROCESSING/COMPLETED/FAILED), attempts, maxAttempts, runAt |

---

## 5. Indexes

All models include indexes on foreign key columns. Additional composite indexes:

- `AuditLog`: `@@index([entityName, entityId])` — for entity-level audit lookups
- `Order`: `@@index([status])` — for status-based filtering
- `BackgroundJob`: `@@index([status])`, `@@index([runAt])` — for queue polling performance

---

## 6. Cascading Rules

| Relationship | On Delete | On Update |
|-------------|-----------|-----------|
| User → Account | Cascade | Cascade |
| User → Session | Cascade | Cascade |
| User → Customer | Cascade | Cascade |
| Customer → RFQ | Cascade | Cascade |
| Customer → Order | Cascade | Cascade |
| Customer → Inquiry | SetNull | Cascade |
| Order → OrderUpdate | Cascade | Cascade |
| Order → Job | Cascade | Cascade |
| RFQ → UploadedFile | Cascade | Cascade |
| Order → Certificate | Cascade | Cascade |
| User → AuditLog | Cascade | Cascade |
| User → Notification | Cascade | Cascade |

---

## 7. Soft Deletion

Several models support soft deletion via `deletedAt: DateTime?`:
- `User`, `Customer`, `RFQ`, `Order`, `OrderUpdate`, `UploadedFile`, `Material`

When querying soft-deleted records, always filter: `where: { deletedAt: null }`.

---

## 8. Seed Data

The seed script (`prisma/seed.ts`) populates:
- Admin user account
- Engineering materials (EN8, EN19, EN24, SS304, SS316)
- Bearing specifications (6205, 6206, 6308)
- Thread standards (M6, M8, M10, M12)
- Fit classifications (H7/g6, H7/k6, H7/p6)
- Surface finish standards (Ra0.8, Ra1.6, Ra3.2, Ra6.3)
- Heat treatment processes (Nitriding, Hardening, Tempering)
- Tolerance standards (ISO 2768 fine/medium/coarse)
- Sample customer accounts
- Sample orders and RFQs

Run with: `npx prisma db seed`

---

## 9. Backup & Recovery

```bash
# Generate JSON backup
npx tsx scripts/backup.ts

# Force reset database (DESTRUCTIVE)
npx prisma db push --force-reset

# Restore from backup
npx prisma db push --accept-data-loss
# Then run seed or custom restoration script
```

Backups are stored in `backups/prema-backup-{timestamp}.json`.