import { NextRequest, NextResponse } from "next/server";
import { secureRoute } from "@/lib/api-wrapper";
import { FileService } from "@/modules/files/files.service";
import { z } from "zod";

const fileRegisterSchema = z.object({
  filename: z.string().min(1).max(255),
  url: z.string().url(),
  fileType: z.string().min(1).max(20),
  size: z.number().positive(),
  rfqId: z.string().uuid().optional(),
  orderId: z.string().uuid().optional(),
}).strict();

export const POST = secureRoute(
  { action: "register_file_upload", rateLimitLimit: 30 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = fileRegisterSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 422 });
    }

    const userId = session.user.id;
    const file = await FileService.registerFile({
      ...parsed.data,
      ownerId: userId,
    });

    return NextResponse.json(file, { status: 201 });
  }
);
