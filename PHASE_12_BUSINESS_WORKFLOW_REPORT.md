# PREMA Engineering Intelligence Platform — Phase 12: Business Workflow Redesign Report

This document reports on the design decisions, schema additions, architecture, and UI dashboard elements implemented in Phase 12 to transform the platform into a Customer Intelligence, RFQ, and Manufacturing Portal centered around customer interactions and admin notifications.

---

## 1. Customer Profile Refactor (Database & API)

To support complete demographics, the `Customer` table has been restructured in `prisma/schema.prisma` with required and optional fields:

*   **Required Fields**: Name, Email (unique), Company Name, Phone, Industry, Country, State, City.
*   **Optional Fields**: Mailing Address, GST Number, Corporate Website, LinkedIn URL, PIN/ZIP Code, Additional Notes.
*   **Sign-Up API (`/api/auth/register`)**: Customer registration validates properties with a Zod schema, hashes passwords, generates a Customer Profile, logs a registered event in the activity timeline, inserts a Lead record, and triggers geocoding.
*   **Profile API (`/api/customer/profile`)**: Binds customer profiles to session tokens, enabling GET queries (returning profile, location, and timeline data) and PATCH updates.

---

## 2. Location Intelligence Fallback Path

Every registered customer profile includes geographic coordinates resolved through a three-layer fallback mechanism:

1.  **Manual Input**: Direct state, city, and country details provided by the customer during onboarding.
2.  **Browser Geolocation API**: Prompted precision coordinate tracking locking Latitude and Longitude values.
3.  **IP-based Geocoder Fallback**: Real-time IP address lookups querying coordinate data (`lib/geocoder.ts`) with built-in development fallbacks (local networks resolve to Bengaluru, Karnataka coordinates by default).

---

## 3. Centralized Event Notifications System

Admin awareness has been established as a core feature. Whenever customer operations occur, an event is emitted asynchronously to the application Event Bus (`lib/event-bus.ts`) and handled by `modules/notifications/notification.listeners.ts`:

| Event Trigger | Event Key | Database Notification | Email Dispatch | Timeline Log |
|---|---|---|---|---|
| Customer Registers | `user.registered` | Yes (Admins) | Yes (Admin onboarding info) | Yes (`CustomerActivity`) |
| Customer Logs In | `user.login` | Yes (Admins) | Yes (Admin alert on first login) | Yes (`CustomerActivity`) |
| Customer Submits RFQ | `rfq.created` | Yes (Admins & Customer) | Yes (Admin alert & Customer receipt) | Yes (`CustomerActivity`) |
| Customer Uploads Drawing | `file.uploaded` | Yes (Admins) | Yes (Admin feasibility alert) | Yes (`CustomerActivity`) |
| Customer Sends Inquiry | `inquiry.received` | Yes (Admins) | Yes (Admin detail alert) | Yes (`AuditLog` only) |
| Customer Updates Profile | `profile.updated` | Yes (Admins) | No | Yes (`CustomerActivity`) |
| Customer Approves Quote | `quote.approved` | Yes (Admins) | Yes (Admin procurement alert) | Yes (`CustomerActivity`) |
| Customer Downloads Cert | `certificate.downloaded` | Yes (Admins) | Yes (Admin compliance alert) | Yes (`CustomerActivity`) |

*   **Resend Service & Backoff Retries**: Direct integrations in `EmailService` send HTML templates via Resend. The service implements an automatic 3-attempt exponential backoff retry loop. Errors are caught internally to prevent external API issues from triggering runtime application crashes.

---

## 4. Leads Queue & Customer Directory (Admin Console)

Outbound pipelines and customer directory search panels have been built directly into the Admin dashboard tabs:

*   **Recent Leads Queue**: Displays registrations as Leads. Support for full text queries (leads search input) and status filters (`ALL`, `NEW`, `CONTACTED`) provides seamless tracking.
*   **Searchable Customer Directory**: Enables searching across customers by Name, Company, Industry, State, City, Phone, and Email. Displays geolocation locking coordinates, recent timelines, and supports updating customer internal notes directly inside the grid view.
*   **Inquiries log (Communication Center)**: Lists CONTACT, CALLBACK, and SUPPORT inquiries with call/message details. Admins can update ticket statuses (`PENDING`, `RESOLVED`) and append internal resolution notes.

---

## 5. Visual Analytics Dashboards

Aggregated statistics have been implemented on the Admin Analytics panel using vibrant, styled SVG-based relative width demographic metrics:
1.  **Industry Distribution**: Percentage and count of client registrations categorized by business sector.
2.  **Geographic Demographics**: Regional distribution of customer profiles categorized by Country and State.
3.  **RFQ Volume Trends**: Monthly bar chart tracking the volume of requests submitted over the past 6 months.
4.  **Operational Metrics**: Live counters showing active production jobs, pending RFQs, total directory profiles, and QA Success pass rates.

---

## 6. Future Implementations & WhatsApp Readiness

*   **WhatsApp Escalation Webhooks**: The communication callback data fields match typical SMS/WhatsApp integration schemas. Inbound callback requests are structured to call outbound webhooks for instant dispatcher routing once a gateway API key is supplied.
*   **STEP/DWG Client Rendering**: CAD drawing file uploads can be wired directly to client-side parsers for immediate design previews.
