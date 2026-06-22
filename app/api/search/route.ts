import { NextRequest, NextResponse } from "next/server";
import { secureRoute } from "@/lib/api-wrapper";
import { SearchService } from "@/modules/search/search.service";
import { z } from "zod";

const searchQueryParams = z.object({
  q: z.string().min(2).max(100),
});

export const GET = secureRoute(
  { action: "search_platform", rateLimitLimit: 30 }, // protect search from intensive DB loading
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q");

    const parsed = searchQueryParams.safeParse({ q: query });
    if (!parsed.success) {
      return NextResponse.json({ error: "Query query string must be 2-100 characters" }, { status: 400 });
    }

    const results = await SearchService.search(parsed.data.q);
    return NextResponse.json(results);
  }
);
