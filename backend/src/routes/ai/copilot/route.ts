import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { CopilotService } from "@/modules/ai/copilot.service";

/** POST /api/ai/copilot — Ask the AI Engineering Copilot */
export const POST = secureRoute(
    { action: "ai_copilot_ask", rateLimitLimit: 30, cache: "none" },
    async (req: NextRequest, session: any) => {
        const body = await req.json();
        const message = body.message || "";

        if (!message || message.trim().length < 2) {
            return NextResponse.json({ error: "Message is required (min 2 characters)" }, { status: 400 });
        }

        const response = await CopilotService.ask(message, session);
        return NextResponse.json(response);
    }
);