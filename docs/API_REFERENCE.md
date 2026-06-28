# PREMA Engineering Intelligence Platform — API Reference

---

## 1. Base Configuration

- **Base URL**: Configured via `NEXTAUTH_URL` (default: `http://localhost:3000`)
- **Auth**: NextAuth.js v5 JWT tokens (HttpOnly cookies)
- **Content-Type**: `application/json` for all request/response bodies
- **Rate Limiting**: 60 req/min per IP, 30 req/min per authenticated user
- **CORS**: Configured via `ALLOWED_ORIGINS` env var (comma-separated)

### Response Headers

Every API response includes:

| Header | Description |
|--------|-------------|
| `X-Request-ID` | Unique UUID for request tracing |
| `X-RateLimit-Limit` | Maximum requests in window |
| `X-RateLimit-Remaining` | Remaining requests in window |
| `X-RateLimit-Reset` | Seconds until window resets |
| `Cache-Control` | CDN cache directive (varies by route) |

### Error Response Format

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "retryAfter": 45
}
```

Common error codes: `RATE_LIMIT_EXCEEDED`, `USER_RATE_LIMIT_EXCEEDED`, `Unauthorized`, `Forbidden`.

---

## 2. Public Endpoints (No Auth Required)

### `GET /api/health`
Health check with infrastructure status.

**Response (200):**
```json
{
  "status": "ok",
  "timestamp": "2026-06-24T06:00:00.000Z",
  "uptime": 86400,
  "version": "1.0.0",
  "environment": "production",
  "services": {
    "database": { "status": "connected", "latencyMs": 12.5, "replica": { "configured": false, "circuitState": "CLOSED" } },
    "cache": { "status": "healthy", "type": "redis" },
    "queue": { "pending": 0, "failed": 0, "metrics": { "totalProcessed": 150, "totalSucceeded": 148, "totalFailed": 2, "averageProcessTimeMs": 245.5, "uptime": 86400 } },
    "eventBus": { "distributed": true, "mode": "redis_pubsub" }
  },
  "system": { "freeMemoryMb": 512, "totalMemoryMb": 2048, "heapUsedMb": 128, "cpuCount": 4 },
  "infrastructure": { "horizontalScaling": "ready", "cdn": "headers_configured", "rateLimiting": "dual_ip_and_user" }
}
```

### `GET /api/version`
Returns API version.

### `GET /api/verify/[id]`
Public certificate verification by ID. Returns certificate details, CMM inspection data, and QR code data.

---

## 3. Authentication Endpoints

### `POST /api/auth/register`
Register a new customer account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@acme.com",
  "password": "securepass123",
  "companyName": "ACME Corp",
  "contactPhone": "+1234567890",
  "industry": "Automotive",
  "country": "India",
  "state": "Maharashtra",
  "city": "Pune",
  "address": "123 Industrial Area"
}
```

**Response (201):** `{ "message": "Registration successful", "userId": "..." }`

**Side Effects:** Emits `user.registered` event → admin notification, welcome email, lead creation.

### `POST /api/auth/signin` / `POST /api/auth/signout`
NextAuth.js built-in endpoints for login/logout.

---

## 4. Customer Endpoints (`/api/customer/*`)

Requires `CUSTOMER` or `ADMIN` role.

### `GET /api/customer/profile`
Get authenticated customer's profile with timeline and location.

### `PATCH /api/customer/profile`
Update customer profile fields. Emits `profile.updated` event.

### `GET /api/customer/rfq`
List customer's RFQs.

### `POST /api/customer/rfq`
Submit a new RFQ. Emits `rfq.created` event.

### `GET /api/customer/orders`
List customer's orders.

### `GET /api/customer/files`
List customer's uploaded files.

### `POST /api/customer/files`
Upload a file (generates presigned S3 URL). Emits `file.uploaded` event.

### `GET /api/customer/certificates`
List customer's quality certificates.

---

## 5. Admin Endpoints (`/api/admin/*`)

Requires `ADMIN` role only.

### `GET /api/admin/customers`
List all customers with CRM data (tags, lead scores, admin notes).

### `PATCH /api/admin/customers/[id]`
Update customer CRM data (tags, lead score, admin notes, coordinates).

### `GET /api/admin/dashboard/analytics`
Analytics data: customer demographics, growth metrics, top customers.

### `GET /api/admin/audit-logs`
Audit trail for data changes.

### `GET /api/admin/certificates`
List all issued certificates.

### `POST /api/admin/certificates`
Issue a new quality certificate.

### `GET /api/admin/observability/metrics`
System observability: slow queries, queue metrics, error rates.

---

## 6. Shared Endpoints

### `GET/POST /api/orders`
- **GET**: List orders (ADMIN sees all, CUSTOMER sees own)
- **POST**: Create new order (ADMIN only)

### `PATCH /api/orders/[id]`
Update order status. Emits `order.updated` event with status-specific notifications.

### `GET/POST /api/rfq`
- **GET**: List RFQs (ADMIN sees all, CUSTOMER sees own)
- **POST**: Submit RFQ

### `PATCH /api/rfq/[id]`
Update RFQ status (quote, approve, reject). Emits `rfq.quoted` or `quote.approved` events.

### `GET/POST /api/inquiries`
- **GET**: List inquiries (ADMIN only)
- **POST**: Submit contact/callback request. Emits `inquiry.received` event.

### `GET /api/materials`
List engineering materials (cached, moderate TTL).

### `GET /api/search?q={query}`
Cross-table fuzzy search with relevance scoring. Returns results from materials, fits, bearings, threads, orders, customers. Includes AI assistant suggestion trigger.

### `POST /api/ai/assistant`
AI Engineering Assistant. Accepts natural language questions about materials, bearings, fits, threads, orders.

**Request:** `{ "message": "What is the yield strength of EN24?" }`

**Response:** `{ "answer": "### EN24 Steel...", "category": "MATERIAL", "entityMatched": {...}, "ragTrace": {...} }`

### `GET/POST /api/files`
- **GET**: List files
- **POST**: Generate presigned upload URL

### `GET/POST /api/notifications`
- **GET**: List user notifications
- **POST**: Mark notifications as read

---

## 7. Rate Limiting

| Scope | Limit | Window | Storage |
|-------|-------|--------|---------|
| Per IP | 60 requests | 60 seconds | Redis (sliding window) |
| Per User | 30 requests | 60 seconds | Redis (sliding window) |

Exceeding limits returns `429 Too Many Requests` with `Retry-After` header.

---

## 8. Caching

| Route Type | Cache-Control | CDN TTL | Browser TTL |
|-----------|--------------|---------|-------------|
| Static assets | `public, immutable` | 1 year | 1 year |
| Public pages | `public, s-maxage=60` | 60s | 60s |
| Dynamic API | `private, s-maxage=30` | 30s | 0s |
| Moderate API | `public, s-maxage=300` | 5min | 60s |
| Health/Version | `no-store` | 0 | 0 |

---

## 9. Products & Components API

### `GET /api/products`
List and search products with filtering, pagination, and sorting.

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `q` | string | Search query (matches name, description, partNumber, category, tags, industries, materials) |
| `page` | integer | Page number (default: 1) |
| `pageSize` | integer | Items per page (default: 12) |
| `sortBy` | string | Sort order: `featured`, `newest`, `name`, `category` |
| `category` | string[] | Filter by category slug (repeatable) |
| `material` | string[] | Filter by material name (repeatable) |
| `industry` | string[] | Filter by industry (repeatable) |
| `manufacturingProcess` | string[] | Filter by manufacturing process (repeatable) |
| `heatTreatment` | string[] | Filter by heat treatment (repeatable) |
| `surfaceFinish` | string[] | Filter by surface finish (repeatable) |

**Response (200):**
```json
{
  "products": [{ "id": "ps-001", "name": "Mirror-Polished Precision Shaft", ... }],
  "totalCount": 32,
  "page": 1,
  "pageSize": 12,
  "totalPages": 3,
  "filters": {
    "categories": [{ "slug": "precision-shafts", "name": "Precision Shafts", "count": 2 }],
    "materials": [{ "name": "Stainless Steel 316", "count": 8 }],
    "industries": [{ "name": "Automotive", "count": 12 }],
    "manufacturingProcesses": [{ "name": "CNC Turning", "count": 20 }],
    "heatTreatments": [{ "name": "Carburizing", "count": 10 }],
    "surfaceFinishes": [{ "name": "Mirror Polish", "count": 5 }]
  }
}
```

### `POST /api/products`
Create a new product. Admin authentication required (TODO).

**Request Body:**
```json
{
  "name": "Custom Precision Shaft",
  "categorySlug": "precision-shafts",
  "partNumber": "PE-PS-003",
  "description": "Custom shaft for specific application",
  "specifications": [{ "label": "Diameter", "value": "25mm" }],
  "materials": [{ "name": "SS316", "properties": ["Corrosion resistant"] }],
  "industries": ["Automotive"],
  "tags": ["shaft", "custom"]
}
```

**Response (201):**
```json
{
  "message": "Product created successfully",
  "product": { "id": "custom-...", "name": "Custom Precision Shaft", ... }
}
```

### `GET /api/products/[id]`
Get a single product by ID.

**Response (200):** Full `ProductComponent` object.
**Response (404):** `{ "error": "Product not found" }`

### `PUT /api/products/[id]`
Update a product. Admin authentication required (TODO).

**Request Body:** Partial product fields to update.
**Response (200):** Updated product object with success message.
**Response (404):** `{ "error": "Product not found" }`

### `DELETE /api/products/[id]`
Delete (soft-delete) a product. Admin authentication required (TODO).

**Response (200):** Success message.
**Response (404):** `{ "error": "Product not found" }`

### Pages

| Route | Description |
|-------|-------------|
| `/products-and-components` | Product catalog listing with category grid, filters, search, and pagination |
| `/products-and-components/[id]` | Product detail page with image gallery, specs, materials, manufacturing process, applications, quality, downloads, RFQ form, and related products |
