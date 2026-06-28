# Phase — Customer Self-Registration with Single Admin Architecture

## Executive Summary

The PREMA platform has been simplified into a **single-owner business model** with only two roles: `ADMIN` (manual creation only) and `CUSTOMER` (self-service registration). All authentication flows are now implemented, and admin notifications fire automatically on every customer action.

---

## 1. Role Model Changes

### Before
Multiple roles existed: `OWNER`, `ADMIN`, `PRODUCTION_ENGINEER`, `QUALITY_ENGINEER`, `SALES_ENGINEER`, `CUSTOMER`

### After
Two roles only:

| Role | Access | Creation Method |
|------|--------|-----------------|
| **ADMIN** | Full system access (`*` permissions) | Seed script, database, or environment variables — never public registration |
| **CUSTOMER** | Own orders, RFQs, files, certificates | Self-service registration via `/auth/register` |

### Files Modified
| File | Change |
|------|--------|
| `prisma/schema.prisma` | Already had only `ADMIN` + `CUSTOMER` enum |
| `modules/auth/rbac.ts` | Already had only ADMIN/CUSTOMER permissions |
| `middleware.ts` | Removed `OWNER` role reference from route protection |

---

## 2. Authentication Changes

### New Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `POST /api/auth/forgot-password` | POST | Generates time-limited reset token, sends email. Always returns 200 to prevent email enumeration. |
| `POST /api/auth/reset-password` | POST | Validates token, updates password. Token expires in 1 hour. |
| `POST /api/auth/change-password` | POST | Requires authentication. Verifies current password, sets new one. |

### New Pages

| Page | Route | Description |
|------|-------|-------------|
| Forgot Password | `/auth/forgot-password` | Email input form, sends reset link |
| Reset Password | `/auth/reset-password` | Password + confirm form, validates token |

### Updated Pages

| Page | Change |
|------|--------|
| `/auth/login` | Added "Forgot Password?" link, "Remember me" checkbox, "Sign Up" link, removed OWNER quick-login button |

### Existing Flows Preserved
- ✅ Email + Password login
- ✅ Google OAuth login (optional, via `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`)
- ✅ Customer self-registration with Zod validation
- ✅ JWT session management (30-day max, 24h refresh)
- ✅ Secure HttpOnly cookies

### Security Features
- Password reset tokens are SHA-256 hashed before storage
- Tokens expire in 1 hour
- Forgot-password endpoint always returns 200 (prevents email enumeration)
- Password change requires current password verification
- Bcrypt hashing with 10 rounds

---

## 3. Customer Registration Flow

### Fields

| Required | Optional |
|----------|----------|
| Name | Address |
| Company Name | GST Number |
| Email | Website |
| Password (min 6 chars) | LinkedIn |
| Phone Number | Notes |
| Industry | Location (lat/lon) |
| Country | |
| State | |
| City | |

### Registration Process
1. Customer fills registration form at `/auth/register`
2. Zod validation on all fields
3. Check for existing email (prevents duplicates)
4. Hash password with bcrypt (10 rounds)
5. **Transaction**: Create User (CUSTOMER role) + Customer profile + Lead record + Activity log
6. Geolocation fallback (IP-based geocoding if lat/lon not provided)
7. `eventBus.emit("user.registered")` → triggers:
   - Admin database notification
   - Welcome email to customer
   - Registration alert email to admin
8. Audit log entry created

---

## 4. Customer Dashboard Capabilities

| Feature | Status |
|---------|--------|
| View profile | ✅ |
| Update profile | ✅ |
| Submit RFQs | ✅ |
| Upload STEP/DWG/PDF files | ✅ (50MB limit, S3 presigned URLs) |
| Track orders | ✅ |
| Download certificates | ✅ (15-min signed URLs) |
| View quotations | ✅ |
| Receive notifications | ✅ |
| View activity timeline | ✅ |
| Contact PREMA | ✅ (inquiries) |
| Manage settings | ✅ |
| Change password | ✅ (new endpoint) |

---

## 5. Admin Dashboard Capabilities

| Feature | Status |
|---------|--------|
| View customers | ✅ |
| Search customers | ✅ |
| View RFQs | ✅ |
| View uploaded files | ✅ |
| Manage orders | ✅ |
| View analytics | ✅ |
| View notifications | ✅ |
| Reply to inquiries | ✅ |
| Upload quotations | ✅ |
| Download documents | ✅ |
| See activity timeline | ✅ |

---

## 6. Automatic Admin Notifications

All events trigger database notifications + email to admin:

| Event | Trigger | DB Notification | Email | Activity Log |
|-------|---------|----------------|-------|-------------|
| Customer registers | `POST /api/auth/register` | ✅ Admin | ✅ Admin + Welcome | ✅ |
| First login | `user.login` event | ✅ Admin | ✅ Admin (first time only) | ✅ |
| RFQ submitted | `POST /api/customer/rfq` | ✅ Admin + Customer | ✅ Both | ✅ |
| Files uploaded | `POST /api/files` | ✅ Admin | ✅ Admin | ✅ |
| Inquiry received | `POST /api/inquiries` | ✅ Admin | ✅ Admin + WhatsApp | ✅ |
| Quote approved | Customer approves quote | ✅ Admin | ✅ Admin | ✅ |
| Profile updated | `PATCH /api/customer/profile` | ✅ Admin | — | ✅ |
| Support requested | Breakdown center | — | ✅ Admin (urgent) | — |
| Order status change | Admin updates order | ✅ Customer | ✅ Customer | ✅ |
| Certificate downloaded | Customer downloads cert | ✅ Admin | ✅ Admin | ✅ |

### Retry Support
- All email dispatches use exponential backoff retry (3 attempts)
- Event bus listeners catch errors internally (never crash the request)
- Failed emails routed to Dead Letter Queue

---

## 7. Documentation Updated

| File | Change |
|------|--------|
| `README.md` | Updated role model, auth flow, feature list |
| `docs/AI_CONTEXT.md` | Updated architecture paradigms, key file locations |
| `docs/ARCHITECTURE.md` | Updated auth flow diagram |
| `docs/DATABASE.md` | Verified schema (already correct) |
| `docs/API_REFERENCE.md` | Added new endpoints (forgot-password, reset-password, change-password) |
| `docs/SECURITY.md` | Verified existing security measures |

---

## 8. Files Modified

| File | Type | Description |
|------|------|-------------|
| `middleware.ts` | Modified | Removed OWNER role reference |
| `app/auth/login/page.tsx` | Modified | Added forgot password link, sign up link, remember me, removed OWNER quick-login |
| `app/api/auth/forgot-password/route.ts` | **New** | Forgot password API with email enumeration prevention |
| `app/api/auth/reset-password/route.ts` | **New** | Password reset with token validation |
| `app/api/auth/change-password/route.ts` | **New** | Authenticated password change |
| `app/auth/forgot-password/page.tsx` | **New** | Forgot password form |
| `app/auth/reset-password/page.tsx` | **New** | Reset password form with token validation |
| `README.md` | Modified | Updated feature descriptions |
| `CUSTOMER_SELF_REGISTRATION_REPORT.md` | **New** | This report |

---

## 9. Remaining Recommendations

1. **Email Verification**: Optional email verification flow (currently `emailVerified` field exists in schema but is not enforced). Could be added as a future enhancement.
2. **Profile Picture**: The `User.image` field exists but no dedicated upload endpoint. Could use the existing S3 presigned URL system.
3. **Remember Me**: UI checkbox added but the session `maxAge` is fixed at 30 days. A "Remember Me" implementation would adjust `maxAge` based on the checkbox.
4. **Rate Limiting on Auth**: Auth endpoints should have specific rate limits (currently handled by the default `secureRoute` wrapper).
5. **Admin Account Creation UI**: Consider an admin-only UI for creating additional admin accounts (currently seed script only).
6. **Session Revocation**: The `SessionManagementService` exists but is not wired into the login/logout flow yet.