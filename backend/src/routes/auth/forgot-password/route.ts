import { NextRequest, NextResponse, secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { z } from "zod";
import crypto from "crypto";
import { EncryptionService } from "@/modules/security/enterprise-security.service";

const schema = z.object({ email: z.string().email() });

/**
 * POST /api/auth/forgot-password
 * Generates a time-limited reset token and sends it via email.
 * Always returns 200 to prevent email enumeration.
 */
export const POST = secureRoute(
  { action: "auth_forgot_password", rateLimitLimit: 10 },
  async (req: NextRequest) => {
    try {
        const body = await req.json();
        const parsed = schema.safeParse(body);

        if (!parsed.success) {
            // Always return success to prevent email enumeration
            return NextResponse.json({ success: true });
        }

        const { email } = parsed.data;
        const user = await db.user.findUnique({ where: { email } });

        if (!user || user.deletedAt) {
            // Always return success to prevent email enumeration
            return NextResponse.json({ success: true });
        }

        // Generate a secure token
        const rawToken = EncryptionService.generateToken(32);
        const tokenHash = EncryptionService.hash(rawToken);

        // Store verification token (expires in 1 hour)
        await db.verificationToken.deleteMany({ where: { identifier: email } });
        await db.verificationToken.create({
            data: {
                identifier: email,
                token: tokenHash,
                expires: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
            },
        });

        // Send reset email (non-blocking)
        try {
            const { EmailService } = await import("@/modules/notifications/email.service");
            const resetUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/auth/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

            await EmailService.sendEmail({
                to: email,
                subject: "PREMA — Password Reset Request",
                html: `
          <div style="font-family: sans-serif; max-width: 500px; margin: auto; padding: 20px;">
            <h2 style="color: #0c0c0e;">Password Reset Request</h2>
            <p>We received a request to reset your password. Click the link below to set a new password:</p>
            <a href="${resetUrl}" style="display: inline-block; background: #ef4444; color: white; padding: 12px 24px; text-decoration: none; font-weight: bold; margin: 16px 0;">
              Reset Password
            </a>
            <p style="color: #666; font-size: 13px;">This link expires in 1 hour. If you did not request this, please ignore this email.</p>
          </div>
        `,
            });
        } catch (emailErr) {
            console.error("Failed to send reset email:", emailErr);
            // Don't fail the request — email delivery issues shouldn't leak info
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ success: true }); // Always return success
    }
});