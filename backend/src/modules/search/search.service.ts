import { db } from "@/lib/db";

export interface SearchResult {
  type: "MATERIAL" | "FIT" | "SURFACE_FINISH" | "HEAT_TREATMENT" | "BEARING" | "THREAD" | "ORDER" | "RFQ";
  title: string;
  subtitle: string;
  score: number;
  metadata: any;
}

export class SearchService {
  /**
   * Performs a fuzzy search across the engineering tables and ranks results by relevance.
   */
  static async search(query: string): Promise<SearchResult[]> {
    if (!query || query.trim().length < 2) return [];

    const cleanedQuery = query.trim().toLowerCase();
    const results: SearchResult[] = [];

    // Run searches in parallel
    const [materials, fits, finishes, treatments, bearings, threads] = await Promise.all([
      db.material.findMany({
        where: {
          OR: [
            { code: { contains: cleanedQuery, mode: "insensitive" } },
            { name: { contains: cleanedQuery, mode: "insensitive" } },
          ],
          deletedAt: null,
        },
        take: 10,
      }),
      db.fit.findMany({
        where: {
          OR: [
            { code: { contains: cleanedQuery, mode: "insensitive" } },
            { type: { contains: cleanedQuery, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),
      db.surfaceFinish.findMany({
        where: {
          OR: [
            { code: { contains: cleanedQuery, mode: "insensitive" } },
            { description: { contains: cleanedQuery, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),
      db.heatTreatment.findMany({
        where: {
          OR: [
            { processName: { contains: cleanedQuery, mode: "insensitive" } },
            { description: { contains: cleanedQuery, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),
      db.bearing.findMany({
        where: {
          OR: [
            { modelNumber: { contains: cleanedQuery, mode: "insensitive" } },
            { type: { contains: cleanedQuery, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),
      db.threadStandard.findMany({
        where: {
          OR: [
            { designation: { contains: cleanedQuery, mode: "insensitive" } },
            { type: { contains: cleanedQuery, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),
    ]);

    // Score & Format Materials
    for (const m of materials) {
      let score = 10;
      if (m.code.toLowerCase() === cleanedQuery) score += 50;
      else if (m.code.toLowerCase().includes(cleanedQuery)) score += 20;

      results.push({
        type: "MATERIAL",
        title: m.code,
        subtitle: m.name,
        score,
        metadata: { grade: m.grade, properties: m.properties },
      });
    }

    // Score & Format Fits
    for (const f of fits) {
      let score = 10;
      if (f.code.toLowerCase() === cleanedQuery) score += 50;
      else if (f.code.toLowerCase().includes(cleanedQuery)) score += 20;

      results.push({
        type: "FIT",
        title: f.code,
        subtitle: `${f.type} Fit (Hole: ${f.holeLimit}, Shaft: ${f.shaftLimit})`,
        score,
        metadata: { holeLimit: f.holeLimit, shaftLimit: f.shaftLimit, type: f.type },
      });
    }

    // Score & Format Surface Finishes
    for (const sf of finishes) {
      let score = 10;
      if (sf.code.toLowerCase() === cleanedQuery) score += 50;
      else if (sf.code.toLowerCase().includes(cleanedQuery)) score += 20;

      results.push({
        type: "SURFACE_FINISH",
        title: sf.code,
        subtitle: `Ra ${sf.valueRa} µm - ${sf.description || ""}`,
        score,
        metadata: { valueRa: sf.valueRa, description: sf.description },
      });
    }

    // Score & Format Heat Treatments
    for (const ht of treatments) {
      let score = 10;
      if (ht.processName.toLowerCase() === cleanedQuery) score += 50;
      else if (ht.processName.toLowerCase().includes(cleanedQuery)) score += 20;

      results.push({
        type: "HEAT_TREATMENT",
        title: ht.processName,
        subtitle: ht.description || "",
        score,
        metadata: { parameters: ht.parameters },
      });
    }

    // Score & Format Bearings
    for (const b of bearings) {
      let score = 10;
      if (cleanedQuery.includes(b.modelNumber.toLowerCase())) score += 40;
      if (b.modelNumber.toLowerCase() === cleanedQuery) score += 50;

      results.push({
        type: "BEARING",
        title: `Bearing ${b.modelNumber}`,
        subtitle: `${b.type} (d=${b.innerDiameter}mm, D=${b.outerDiameter}mm, B=${b.width}mm)`,
        score,
        metadata: {
          innerDiameter: b.innerDiameter,
          outerDiameter: b.outerDiameter,
          width: b.width,
          dynamicLoad: b.dynamicLoad,
          staticLoad: b.staticLoad,
        },
      });
    }

    // Score & Format Threads
    for (const t of threads) {
      let score = 10;
      if (t.designation.toLowerCase() === cleanedQuery) score += 50;

      results.push({
        type: "THREAD",
        title: `Thread Standard ${t.designation}`,
        subtitle: `${t.type} Thread (Pitch: ${t.pitch}mm, Dia: ${t.majorDiameter}mm)`,
        score,
        metadata: { pitch: t.pitch, majorDiameter: t.majorDiameter, type: t.type },
      });
    }

    // Sort by relevance score descending
    return results.sort((a, b) => b.score - a.score);
  }
}
