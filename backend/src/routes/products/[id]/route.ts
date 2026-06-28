/* PREMA ENGINEERING WORKS — Single Product API */
/* GET: Get product by ID */
/* PUT: Update product (admin only) */
/* DELETE: Delete product (admin only) */

import { NextRequest, NextResponse, secureRoute } from "@/lib/api-wrapper";
import { getProductById, COMPONENT_PRODUCTS } from "@/lib/components-data";

export const GET = secureRoute(
  { action: "get_product_by_id", rateLimitLimit: 60 },
  async (_request: NextRequest, session: any, { params }) => {
    const { id } = params;
    const product = getProductById(id);

    if (!product) {
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );
    }

    return NextResponse.json(product);
  }
);

export const PUT = secureRoute(
  { action: "update_product", rateLimitLimit: 20 },
  async (request: NextRequest, session: any, { params }) => {
    const role = session?.user?.role;
    if (role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { id } = params;
    const product = getProductById(id);

    if (!product) {
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );
    }

    const body = await request.json();

    /* In production, this would update via Prisma */
    const updatedProduct = {
        ...product,
        ...body,
        id: product.id, /* Prevent ID change */
        updatedAt: new Date().toISOString().split("T")[0],
    };

    return NextResponse.json({
        message: "Product updated successfully",
        product: updatedProduct,
        note: "This is a placeholder response. In production, data is updated in PostgreSQL via Prisma.",
    });
  }
);

export const DELETE = secureRoute(
  { action: "delete_product", rateLimitLimit: 20 },
  async (_request: NextRequest, session: any, { params }) => {
    const role = session?.user?.role;
    if (role !== "ADMIN") {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    const { id } = params;
    const product = getProductById(id);

    if (!product) {
        return NextResponse.json(
            { error: "Product not found" },
            { status: 404 }
        );
    }

    /* In production, this would soft-delete via Prisma */
    return NextResponse.json({
        message: "Product deleted successfully",
        note: "This is a placeholder response. In production, data is soft-deleted in PostgreSQL via Prisma.",
    });
  }
);