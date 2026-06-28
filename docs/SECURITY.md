# PREMA Engineering Intelligence Platform — Security Manual

---

## 1. Security Architecture Overview

The platform implements a defense-in-depth security model with 10 enterprise security layers:

| Layer | Implementation | Status |
|-------|---------------|--------|
| **2FA (TOTP)** | `TwoFactorAuthService` — TOTP generation, verification, enable/disable | ✅ |
| **Audit Reports** | `AuditReportService` — Date-range reports, security-focused reports | ✅ |
| **Session Management** | `SessionManagementService` — Create, revoke, touch, clean, stats | ✅ |
| **Device Management** | `DeviceManagementService` — Fingerprinting, trust, remove | ✅ |
| **Suspicious Activity** | `SuspiciousActivityDetector` — Brute force, new device, impossible travel, unusual hours | ✅ |
| **Signed URLs** | `SignedUrlService` — HMAC-SHA256 signed tokens with expiry | ✅ |
| **Encryption** | `EncryptionService` — AES-256-GCM, SHA-256 hashing, token generation | ✅ |
| **Secret Rotation** | `SecretRotationService` — Rotation schedule tracking | ✅ |
| **Security Scans** | `SecurityScanService` — 10-point automated security scan | ✅ |
| **Penetration Checklist** | `PenetrationTestChecklist` — 21 OWASP-based test items | ✅ |

---

## 2. Two-Factor Authentication (2FA)

### Enable 2FA
```typescript
// 1. Generate secret
const { secret, otpauthUrl } = TwoFactorAuthService.generateSecret(userId);

// 2. User scans QR code with authenticator app (Google Authenticator, Authy, etc.)

// 3. User provides 6-digit code, verify and enable
const success = await TwoFactorAuthService.enable(userId, secret, code);
```

### Verify TOTP Code
```typescript
const isValid = TwoFactorAuthService.verifyCode(secret, userCode);
// Checks current ± 1 time window (30s steps) for clock drift tolerance
```

### Database Model
```prisma
model TwoFactorSecret {
  id         String    @id @default(uuid())
  userId     String    @unique
  secret     String    // TOTP secret (base64url encoded)
  enabled    Boolean   @default(false)
  verifiedAt DateTime?
}
```

---

## 3. Session Management

### Create Session (on login)
```typescript
const sessionId = await SessionManagementService.createSession(
  userId, sessionToken, userAgent, ipAddress
);
```

### View Active Sessions
```typescript
const sessions = await SessionManagementService.getActiveSessions(userId);
// Returns: [{ id, deviceInfo, ipAddress, location, lastActiveAt, expiresAt }]
```

### Revoke Sessions
```typescript
// Revoke specific session
await SessionManagementService.revokeSession(sessionId, userId);

// Revoke all except current
const revoked = await SessionManagementService.revokeAllSessions(userId, currentToken);
```

### Auto-Cleanup
```typescript
// Delete expired sessions (run via background job)
const cleaned = await SessionManagementService.cleanExpiredSessions();
```

---

## 4. Device Management

### Register Device
```typescript
const fingerprint = DeviceManagementService.generateFingerprint(userAgent, acceptLanguage, screenRes);
const { isNew, trusted } = await DeviceManagementService.registerDevice(userId, fingerprint, deviceName);
```

### Trust/Remove Devices
```typescript
await DeviceManagementService.trustDevice(userId, fingerprint);
await DeviceManagementService.removeDevice(userId, deviceId);
```

---

## 5. Suspicious Activity Detection

### Login Anomaly Checks
```typescript
const alerts = await SuspiciousActivityDetector.checkLoginAnomaly(userId, ipAddress, userAgent);
// Checks: brute force (≥5/hour), new device, impossible travel, unusual hours (3AM-5AM)
```

### Severity Levels
- **CRITICAL**: Brute force (≥5 failed logins/hour)
- **HIGH**: Multiple failed logins (3-4/hour), impossible travel
- **MEDIUM**: New device login
- **LOW**: Unusual time login

---

## 6. Signed URLs

```typescript
// Generate (15-minute expiry by default)
const token = SignedUrlService.generateSignedUrl(resourceId, "download", 900);

// Verify
const { valid, payload, error } = SignedUrlService.verifySignedUrl(token);
```

---

## 7. Encryption

### AES-256-GCM Encryption
```typescript
const { ciphertext, iv, authTag } = EncryptionService.encrypt("sensitive data");
const plaintext = EncryptionService.decrypt(ciphertext, iv, authTag);
```

### SHA-256 Hashing
```typescript
const hash = EncryptionService.hash("password or data");
```

### Random Token Generation
```typescript
const token = EncryptionService.generateToken(32); // 64 hex chars
```

---

## 8. Security Scans

### Run Automated Scan
```typescript
const { score, results, summary } = await SecurityScanService.runScan();
// 10 checks across: Secrets, Transport, Authentication, Threats, Sessions, Access Control
```

### Scan Checks
1. AUTH_SECRET strength (≥32 chars)
2. HTTPS enforcement
3. 2FA adoption rate
4. Failed login volume (thresholds: 10/50)
5. High-risk security events
6. ENCRYPTION_KEY configuration
7. Rate limiting active
8. Stale session cleanup
9. CORS configuration
10. Secret rotation schedule

---

## 9. Penetration Testing Checklist

21 OWASP-based test items across 5 categories:
- **Authentication** (5 items): Brute force, credential stuffing, 2FA, session entropy, password policy
- **Authorization** (4 items): IDOR, RBAC, horizontal/vertical privilege escalation
- **Input Validation** (4 items): SQL injection, XSS, Zod validation, file uploads
- **Cryptography** (4 items): Password hashing, encryption at rest, TLS, no secrets in code
- **Configuration** (4 items): Error messages, security headers, CORS, directory listing
- **Business Logic** (3 items): Price manipulation, race conditions, token replay

---

## 10. API Endpoints

### `GET /api/admin/security?action={action}`

| Action | Description |
|--------|-------------|
| `overview` (default) | Security score, sessions, threats, rotation status |
| `scan` | Run 10-point security scan |
| `pentest` | Get penetration testing checklist |
| `audit` | Security-focused audit report |
| `sessions` | Session statistics |
| `suspicious` | Suspicious activity summary |
| `rotation` | Secret rotation schedule |
| `signed-url` | Generate test signed URL |
| `encrypt` | Encryption demo (encrypt + decrypt round-trip) |

---

## 11. Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `ENCRYPTION_KEY` | AES-256-GCM key (64 hex chars) | Recommended |
| `AUTH_SECRET` | HMAC signing key (≥32 chars) | Required |

---

## 12. Existing Security Infrastructure

The platform also leverages these pre-existing security measures:
- **Rate Limiting**: Dual-layer (IP 60/min + user 30/min) with Redis sliding window
- **RBAC**: Two roles (ADMIN/CUSTOMER) with strict route protection
- **CORS**: Configurable allowed origins
- **JWT Authentication**: HttpOnly secure cookies, 30-day max age
- **Password Hashing**: bcrypt via NextAuth.js
- **Input Validation**: Zod schemas on all API endpoints
- **Request ID Tracking**: UUID per request for traceability
- **Structured Logging**: JSON stdout for log aggregation
- **Sentry Integration**: Error tracking with admin alerts