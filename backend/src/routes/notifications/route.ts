import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { z } from "zod";

const markReadSchema = z.object({
  notificationId: z.string().uuid().optional(),
}).strict();

export const GET = secureRoute(
  { action: "get_notifications", rateLimitLimit: 60 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const notifications = await db.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(notifications);
  }
);

export const PATCH = secureRoute(
  { action: "mark_notifications_read", rateLimitLimit: 40 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const body = await req.json().catch(() => ({}));
    const parsed = markReadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 422 });
    }

    const { notificationId } = parsed.data;

    if (notificationId) {
      await db.notification.updateMany({
        where: { id: notificationId, userId },
        data: { isRead: true },
      });
    } else {
      await db.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
      });
    }

    return NextResponse.json({ success: true });
  }
);
