/* PREMA ENGINEERING WORKS — Products & Components API */
/* GET: List/search products with filtering */
/* POST: Create new product (admin only) */

import { NextRequest, NextResponse, secureRoute } from "@/lib/api-wrapper";
import { searchProducts, getProducts, getCategories, COMPONENT_PRODUCTS } from "@/lib/components-data";

export const GET = secureRoute(
  { action: "get_products", rateLimitLimit: 60 },
  async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "12", 10);
    const sortBy = (searchParams.get("sortBy") as "name" | "category" | "newest" | "featured") || "featured";

    const category = searchParams.getAll("category");
    const material = searchParams.getAll("material");
    const industry = searchParams.getAll("industry");
    const manufacturingProcess = searchParams.getAll("manufacturingProcess");
    const heatTreatment = searchParams.getAll("heatTreatment");
    const surfaceFinish = searchParams.getAll("surfaceFinish");

    const result = searchProducts(
        query,
        {
            category,
            material,
            industry,
            manufacturingProcess,
            heatTreatment,
            surfaceFinish,
            sortBy,
        },
        page,
        pageSize
    );

    return NextResponse.json(result);
  }
);

export const POST = secureRoute(
  { action: "create_product", rateLimitLimit: 20 },
  async (request: NextRequest, session: any) => {
    const role = session?.user?.role;
    if (role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const body = await request.json();

    /* Basic validation */
    if (!body.name || !body.categorySlug) {
        return NextResponse.json(
            { error: "Name and categorySlug are required" },
            { status: 400 }
        );
    }

    /* In production, this would write to database via Prisma */
    const newProduct = {
        id: `custom-${Date.now()}`,
        name: body.name,
        slug: body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
        partNumber: body.partNumber || `PE-CUSTOM-${Date.now()}`,
        categoryId: body.categoryId || "",
        categorySlug: body.categorySlug,
        categoryName: body.categoryName || body.categorySlug,
        tagline: body.tagline || "",
        description: body.description || "",
        shortDescription: body.shortDescription || "",
        images: body.images || [],
        thumbnailUrl: body.thumbnailUrl || "",
        specifications: body.specifications || [],
        materials: body.materials || [],
        manufacturingProcesses: body.manufacturingProcesses || [],
        heatTreatments: body.heatTreatments || [],
        surfaceFinishes: body.surfaceFinishes || [],
        toleranceCapability: body.toleranceCapability || "",
        qualityStandards: body.qualityStandards || [],
        applications: body.applications || [],
        downloads: body.downloads || [],
        relatedProductIds: body.relatedProductIds || [],
        industries: body.industries || [],
        tags: body.tags || [],
        isActive: true,
        isFeatured: body.isFeatured || false,
        displayOrder: body.displayOrder || COMPONENT_PRODUCTS.length + 1,
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json(
        {
            message: "Product created successfully",
            product: newProduct,
            note: "This is a placeholder response. In production, data is stored in PostgreSQL via Prisma.",
        },
        { status: 201 }
    );
  }
);