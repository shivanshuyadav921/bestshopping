import { NextRequest, NextResponse } from "@/lib/api-wrapper";
import { secureRoute } from "@/lib/api-wrapper";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { z } from "zod";
import { cacheService } from "@/lib/cache";

const createMaterialSchema = z.object({
  code: z.string().min(2).max(20),
  name: z.string().min(2).max(100),
  grade: z.string().max(50).optional(),
  properties: z.record(z.string(), z.any()).optional(),
}).strict();

export const GET = secureRoute(
  { action: "get_materials", rateLimitLimit: 50 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cacheKey = "materials_list";
    try {
      const cached = await cacheService.get<any[]>(cacheKey);
      if (cached) {
        return NextResponse.json(cached, {
          headers: {
            "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
          },
        });
      }
    } catch (e) {
      console.warn("Materials cache read error, falling back to db query", e);
    }

    const materials = await db.material.findMany({
      where: { deletedAt: null },
      orderBy: { code: "asc" },
    });

    try {
      await cacheService.set(cacheKey, materials, 3600); // 1 hour TTL
    } catch (e) {
      console.warn("Materials cache write error", e);
    }

    return NextResponse.json(materials, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=600",
      },
    });
  }
);

export const POST = secureRoute(
  { action: "create_material", rateLimitLimit: 20 },
  async (req: NextRequest, session: any) => {
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role as UserRole;
    if (role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = createMaterialSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 422 });
    }

    const material = await db.material.create({
      data: parsed.data,
    });

    await cacheService.del("materials_list");

    return NextResponse.json(material, { status: 201 });
  }
);
