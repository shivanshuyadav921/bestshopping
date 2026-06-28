import { NextRequest, NextResponse, secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { z } from "zod";
import * as bcrypt from "bcryptjs";

const schema = z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

/**
 * POST /api/auth/change-password
 * Requires authentication. Changes the user's password.
 */
export const POST = secureRoute(
    { action: "change_password" },
    async (req: NextRequest, session: any) => {
        try {
            if (!session?.user?.id) {
                return NextResponse.json({ error: "Authentication required" }, { status: 401 });
            }

            const body = await req.json();
            const parsed = schema.safeParse(body);

            if (!parsed.success) {
                return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 400 });
            }

            const { currentPassword, newPassword } = parsed.data;

            // Get current user
            const user = await db.user.findUnique({ where: { id: session.user.id } });
            if (!user || !user.passwordHash) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            // Verify current password
            const isValid = await bcrypt.compare(currentPassword, user.passwordHash);
            if (!isValid) {
                return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
            }

            // Hash and update new password
            const passwordHash = await bcrypt.hash(newPassword, 10);
            await db.user.update({
                where: { id: user.id },
                data: { passwordHash },
            });

            return NextResponse.json({ success: true, message: "Password changed successfully" });
        } catch (error: any) {
            console.error("Change password error:", error);
            return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
        }
    }
);