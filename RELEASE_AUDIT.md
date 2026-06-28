# PREMA Advanced Manufacturing Platform — Release Audit (RC-1)

This document maps out the audit statuses of all features, routes, APIs, and databases within the PREMA full-stack application.

---

## 1. Frontend Audit

### Route Pages
- **✅ Landing Page (`/`)**: public access, interactive Framer Motion components, header/footer layout.
- **✅ Products Catalog (`/products-and-components`)**: renders category grid, search filters, and product cards.
- **✅ Product Details (`/products-and-components/[id]`)**: tabs for specs, materials, and processes.
- **✅ Gallery (`/gallery`)**: category filters and dynamic image view.
- **✅ Timeline (`/timeline`)**: dynamic history view.
- **✅ Tools (`/tools`)**: calculator tools.
- **✅ Dashboard (`/dashboard`)**: stateful layout, dynamic customer data tabs.
- **✅ Profile (`/profile`)**: user info edits, location tracking details.
- **✅ Settings (`/settings`)**: account security edits.
- **✅ Login (`/auth/login`)**: NextAuth credentials session mapping.
- **✅ Signup (`/auth/register`)**: customer form with optional GPS geolocation.
- **✅ Forgot Password (`/auth/forgot-password`)**: requests password reset email.
- **✅ Reset Password (`/auth/reset-password`)**: password update with token matching.

### Layout & UI
- **✅ Header Navigation**: dynamic login/signup and dashboard/signout links.
- **✅ Footer Links**: navigation and social links.
- **✅ Responsive Layout**: grid system for mobile, tablet, and desktop viewports.
- **✅ Theme Switching**: supports system preferences, light mode, and dark mode.
- **✅ Company Reviews Carousel**: sliding autoplay carousel with 6 reviewers.
- **✅ Featured Reviewers Grid**: clickable reviewer selection block.

---

## 2. Backend Audit

### Services & Middleware
- **✅ DB Connection Client**: PostgreSQL client wrapper with query logging.
- **✅ Rate Limiting Middleware**: sliding window rate limiter.
- **✅ RBAC Authorization Matrix**: role-based access checks (Owner, Admin, Engineer, Customer).
- **✅ Zod Payload Validation**: schema constraints on request payloads.
- **✅ Audit Logging**: tracks model creations, updates, and registrations.
- **✅ Email System**: dynamic Resend mock/smtp routing.
- **✅ Event Bus System**: asynchronous event listeners.

### API Routes
- **✅ Register Customer (`POST /api/auth/register`)**
- **✅ Forgot Password (`POST /api/auth/forgot-password`)**
- **✅ Reset Password (`POST /api/auth/reset-password`)**
- **✅ Get Customer Profile (`GET /api/customer/profile`)**
- **✅ Update Customer Profile (`PATCH /api/customer/profile`)**
- **✅ Get Materials List (`GET /api/materials`)**
- **✅ Global Search (`GET /api/search`)**
- **✅ Submit RFQ (`POST /api/customer/rfq`)**

---

## 3. Database Audit

- **✅ Schema Models**: User, Account, Session, Customer, Location, Activity, Lead, Inquiry, RFQ, Order.
- **✅ Seeding**: creates admin user `shivanshuy921@gmail.com` (password `shiva@123`), customer `customer@client.com`, materials, fits, and finishes.
- **✅ Lifecycle Pools**: robust connection pool handling (min 2, max 15) and connection timeout controls.

---

## 4. E2E Journeys & Build Status

- **✅ Visitor Browse & Search Journey**: Landing Page -> Browse Products -> Search -> View Specs.
- **✅ Authentication Lifecycle**: Signup -> Hash -> DB Insert -> Login -> Session Persistence -> Logout -> Redirect to `/`.
- **✅ Linter & Compile Verification**: passes both ESLint and TypeScript compilation checks.
