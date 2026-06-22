import { NextRequest, NextResponse } from "next/server";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";

export const GET = secureRoute(
  { action: "get_customer_files", rateLimitLimit: 50 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const files = await db.uploadedFile.findMany({
      where: {
        ownerId: userId,
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(files);
  }
);
