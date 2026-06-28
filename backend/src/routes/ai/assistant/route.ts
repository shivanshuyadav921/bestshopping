import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { AIService } from "@/modules/ai/ai.service";
import { z } from "zod";

const chatPayloadSchema = z.object({
  message: z.string().min(2, "Query must be at least 2 characters").max(500, "Query cannot exceed 500 characters"),
});

export const POST = secureRoute(
  { action: "ai_chat", rateLimitLimit: 20 }, // Limit chat to 20 requests per minute per IP
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const body = await req.json();
      const parsed = chatPayloadSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: parsed.error.issues[0]?.message || "Invalid payload" },
          { status: 400 }
        );
      }

      const response = await AIService.ask(parsed.data.message, session);
      return NextResponse.json(response);
    } catch (error: any) {
      console.error("AI assistant endpoint error:", error);
      return NextResponse.json({ error: "Failed to process AI assistant request" }, { status: 500 });
    }
  }
);
