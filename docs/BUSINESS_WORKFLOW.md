# PREMA Engineering Intelligence Platform — Business Workflows

---

## 1. Core Business Pipeline: RFQ → Delivery

```
┌─────────┐    ┌──────────┐    ┌───────────┐    ┌──────────────┐
│ Customer │───>│   RFQ     │───>│  Quoted    │───>│   Approved   │
│ Registers│    │ Submitted │    │  by Admin  │    │   by Customer│
└─────────┘    └──────────┘    └───────────┘    └──────┬───────┘
                                                        │
                    ┌───────────────────────────────────┘
                    ▼
            ┌──────────────┐    ┌──────────────┐    ┌──────────┐
            │  Material     │───>│ Manufacturing │───>│Inspection│
            │  Procurement  │    │  (CNC Jobs)   │    │  (CMM)   │
            └──────────────┘    └──────────────┘    └────┬─────┘
                                                          │
                    ┌─────────────────────────────────────┘
                    ▼
            ┌──────────────┐    ┌──────────┐
            │  Dispatch     │───>│ Delivered │
            │  (Tracking)   │    │           │
            └──────────────┘    └──────────┘
```

### Stage Details

| Stage | Status | Actor | Actions |
|-------|--------|-------|---------|
| RFQ Received | `RFQ_RECEIVED` | System | Auto-created when customer submits RFQ |
| Quoted | `QUOTED` | Admin | Admin adds estimated price, sends quotation |
| Approved | `APPROVED` | Customer | Customer accepts quotation, order created |
| Material Procurement | `MATERIAL_PROCUREMENT` | Admin | Raw material ordered/reserved |
| Manufacturing | `MANUFACTURING` | Admin | CNC jobs assigned to machines |
| Inspection | `INSPECTION` | Quality Engineer | CMM inspection, parameters checked |
| Dispatch | `DISPATCH` | Admin | Shipped with tracking number |
| Delivered | `DELIVERED` | System | Customer confirms receipt |

---

## 2. Customer Onboarding Flow

```
1. Customer visits /auth/register
2. Fills registration form:
   - Required: Name, Email, Password, Company, Phone, Industry, Country, State, City
   - Optional: Address, GST, Website, LinkedIn, PIN, Notes
3. System creates:
   a. User account (bcrypt password hash)
   b. Customer profile
   c. Customer location (manual geolocation)
   d. Attempt IP-based geolocation fallback
4. eventBus.emit("user.registered"):
   a. Lead record created automatically
   b. Admin database notification
   c. Welcome email to customer
   d. Registration alert email to admin
5. Customer can now:
   - Browse products
   - Submit RFQs
   - Upload technical drawings
   - Track orders
   - Download certificates
```

---

## 3. RFQ Lifecycle

```
1. Customer submits RFQ via:
   a. Customer portal (/customer/rfq)
   b. Homepage RFQ Configurator
   c. Command Center search
2. RFQ record created (status: PENDING)
3. eventBus.emit("rfq.created"):
   a. Customer activity logged
   b. Admin notification
   c. Customer confirmation notification
   d. Email sent to admin and customer
4. Admin reviews RFQ:
   a. Reviews specifications
   b. Attaches quotation document
   c. Sets estimated price
   d. Updates status to QUOTED
5. eventBus.emit("rfq.quoted"):
   a. Customer notified
   b. Email sent with quotation
6. Customer approves/rejects:
   a. If APPROVED → Order created automatically
   b. eventBus.emit("quote.approved") → notifications + emails
   c. If REJECTED → RFQ closed
```

---

## 4. Notification System

### Event-Triggered Notifications

| Event | DB Notification | Email | WhatsApp |
|-------|----------------|-------|----------|
| `user.registered` | Admin: "New Customer Registered" | Admin + Customer (welcome) | — |
| `user.login` | Admin: "Customer Login: {company}" | Admin (first login only) | — |
| `rfq.created` | Admin + Customer: "RFQ Submitted" | Admin + Customer | — |
| `rfq.quoted` | Customer: "Quotation Ready" | Customer | — |
| `file.uploaded` | Admin: "File Uploaded" | Admin | — |
| `inquiry.received` | Admin: "New Inquiry" | Admin | CALLBACK/SUPPORT only |
| `profile.updated` | Admin: "Profile Updated" | — | — |
| `quote.approved` | Admin: "Quote Approved" | Admin | — |
| `certificate.downloaded` | Admin: "Certificate Downloaded" | Admin | — |
| `order.updated` | Customer: Status update | Customer (status-specific) | — |
| `inspection.completed` | Customer: "Inspection Complete" | Customer | — |
| `order.dispatched` | Customer: "Order Dispatched" | Customer (tracking#) | — |
| `breakdown.alert` | — | Admin (urgent) | — |

### Email Retry Policy
- 3-attempt exponential backoff
- Errors caught internally (never crash the request)
- Failed emails routed to Dead Letter Queue

---

## 5. CRM & Lead Management

### Lead Scoring
- New registrations auto-scored as `LOW`
- Admins can manually set: `HIGH`, `MEDIUM`, `LOW`
- Scoring factors: industry, company size, repeat interactions

### Customer Tags
Available tags: `Automotive`, `Packaging`, `Oil & Gas`, `Medical`, `Repeat Customer`, `Priority Customer`

### Admin-Only Data
- `adminNotes`: Internal notes not visible to customers
- `leadScore`: Editable by admin only
- `tags`: Editable by admin only

---

## 6. Certificate Verification Flow

```
1. Customer downloads certificate from portal:
   a. System generates 15-minute token-based signed URL
   b. eventBus.emit("certificate.downloaded")
2. Third-party verification:
   a. Visits /verify
   b. Enters certificate ID
   c. System shows: CMM inspection data, material cert, order details
   d. SVG QR code generated for mobile scanning
3. Admin issuance:
   a. Creates certificate record linked to order
   b. Uploads inspection report file
   c. Certificate becomes publicly verifiable
```

---

## 7. Emergency Breakdown Center

For urgent manufacturing emergencies:
1. Customer fills breakdown form on homepage
2. Event emitted: `breakdown.alert`
3. Urgent email dispatched to admin
4. WhatsApp alert sent to dispatch number
5. Admin contacts customer within SLA

---

## 8. AI Engineering Assistant

The AI assistant provides:
- Material property lookups (EN24, EN19, SS304, SS316)
- Bearing specification queries (6205, 6206, 6308)
- ISO fit recommendations (H7/g6, H7/k6)
- Thread standard parameters (M8, M10, M12)
- Order status queries (RBAC-scoped)
- Customer record lookups (admin-only)
- DFM (Design for Manufacturing) guidelines

**Note**: Currently rule-based with simulated RAG traces. Future: pgvector + LLM integration.