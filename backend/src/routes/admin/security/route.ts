import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { requireAuth, requireRole } from "@/lib/security";
import { ADMIN_ROLES } from "@/lib/security";
import {
    TwoFactorAuthService,
    AuditReportService,
    SessionManagementService,
    SuspiciousActivityDetector,
    SecurityScanService,
    PenetrationTestChecklist,
    SecretRotationService,
    SignedUrlService,
    EncryptionService,
} from "@/modules/security/enterprise-security.service";

/** GET /api/admin/security — Security dashboard overview */
export const GET = secureRoute(
    { action: "admin_security_overview", rateLimitLimit: 30, cache: "none" },
    async (req: NextRequest, session: any) => {
        const user = requireAuth(session);
        requireRole(user.role, ADMIN_ROLES);

        const url = new URL(req.url);
        const action = url.searchParams.get("action") || "overview";

        switch (action) {
            case "scan": {
                const scanResult = await SecurityScanService.runScan();
                return NextResponse.json({ action: "security_scan", ...scanResult });
            }
            case "pentest": {
                const checklist = PenetrationTestChecklist.getChecklist();
                return NextResponse.json({ action: "pentest_checklist", items: checklist });
            }
            case "audit": {
                const days = parseInt(url.searchParams.get("days") || "30");
                const report = await AuditReportService.generateSecurityReport(days);
                return NextResponse.json({ action: "security_audit_report", ...report });
            }
            case "sessions": {
                const stats = await SessionManagementService.getSessionStats();
                return NextResponse.json({ action: "session_stats", ...stats });
            }
            case "suspicious": {
                const days = parseInt(url.searchParams.get("days") || "7");
                const summary = await SuspiciousActivityDetector.getSummary(days);
                return NextResponse.json({ action: "suspicious_activity", ...summary });
            }
            case "rotation": {
                const schedule = SecretRotationService.checkRotationSchedule();
                return NextResponse.json({ action: "secret_rotation", secrets: schedule });
            }
            case "signed-url": {
                const resourceId = url.searchParams.get("resourceId") || "test";
                const action2 = url.searchParams.get("urlAction") || "download";
                const token = SignedUrlService.generateSignedUrl(resourceId, action2, 900);
                return NextResponse.json({ action: "signed_url_generated", token, expiresIn: "15 minutes" });
            }
            case "encrypt": {
                const plaintext = url.searchParams.get("text") || "Hello PREMA";
                const encrypted = EncryptionService.encrypt(plaintext);
                const decrypted = EncryptionService.decrypt(encrypted.ciphertext, encrypted.iv, encrypted.authTag);
                return NextResponse.json({ action: "encryption_demo", original: plaintext, encrypted, decrypted });
            }
            default: {
                // Overview
                const [scanResult, sessionStats, suspiciousSummary, rotationSchedule] = await Promise.all([
                    SecurityScanService.runScan(),
                    SessionManagementService.getSessionStats(),
                    SuspiciousActivityDetector.getSummary(7),
                    SecretRotationService.checkRotationSchedule(),
                ]);

                return NextResponse.json({
                    action: "overview",
                    securityScan: { score: scanResult.score, summary: scanResult.summary },
                    sessions: sessionStats,
                    suspiciousActivity: {
                        totalEvents: suspiciousSummary.totalEvents,
                        highRiskEvents: suspiciousSummary.highRiskEvents,
                        topThreats: suspiciousSummary.topThreats,
                    },
                    secretRotation: rotationSchedule.filter((s) => s.needsRotation).length,
                    encryption: "AES-256-GCM active",
                    signedUrls: "HMAC-SHA256 active",
                });
            }
        }
    }
);