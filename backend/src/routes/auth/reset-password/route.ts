import { NextRequest, NextResponse, secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { z } from "zod";
import * as bcrypt from "bcryptjs";
import { EncryptionService } from "@/modules/security/enterprise-security.service";

const schema = z.object({
    token: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

/**
 * POST /api/auth/reset-password
 * Validates the reset token and sets a new password.
 */
export const POST = secureRoute(
  { action: "auth_reset_password", rateLimitLimit: 10 },
  async (req: NextRequest) => {
    try {
        const body = await req.json();
        const parsed = schema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: "Invalid request", details: parsed.error.format() }, { status: 400 });
        }

        const { token, email, password } = parsed.data;
        const tokenHash = EncryptionService.hash(token);

        // Find the verification token
        const verificationToken = await db.verificationToken.findUnique({
            where: { identifier_token: { identifier: email, token: tokenHash } },
        });

        if (!verificationToken) {
            return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
        }

        // Check expiry
        if (new Date() > verificationToken.expires) {
            return NextResponse.json({ error: "Reset token has expired. Please request a new one." }, { status: 400 });
        }

        // Hash new password and update user
        const passwordHash = await bcrypt.hash(password, 10);
        await db.user.update({
            where: { email },
            data: { passwordHash },
        });

        // Delete the used token
        await db.verificationToken.deleteMany({ where: { identifier: email } });

        return NextResponse.json({ success: true, message: "Password updated successfully" });
    } catch (error: any) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
    }
});