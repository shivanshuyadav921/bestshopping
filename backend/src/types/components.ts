/* PREMA ENGINEERING WORKS — Products & Components Type Definitions */
/* Database-driven types for the product catalog system */

/* ─── Category ─── */
export interface ProductCategory {
    id: string;
    slug: string;
    name: string;
    description: string;
    shortDescription: string;
    heroImage: string;
    icon: string;
    productCount: number;
    displayOrder: number;
}

/* ─── Product Image ─── */
export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
    angle?: string; // front, side, top, detail, assembled
    caption?: string;
}

/* ─── Technical Specification ─── */
export interface TechnicalSpec {
    label: string;
    value: string;
    unit?: string;
    category?: 'dimensional' | 'material' | 'process' | 'quality' | 'general';
}

/* ─── Manufacturing Process ─── */
export interface ManufacturingProcess {
    step: number;
    process: string;
    description: string;
    duration?: string;
    icon?: string;
}

/* ─── Application / Industry ─── */
export interface ProductApplication {
    industry: string;
    useCase: string;
    benefit: string;
    icon: string;
}

/* ─── Download ─── */
export interface ProductDownload {
    id: string;
    name: string;
    type: 'PDF' | 'STEP' | 'DWG' | 'DXF' | 'IGES' | 'SPECIFICATION';
    url: string;
    fileSize?: string;
    description?: string;
}

/* ─── Material ─── */
export interface ProductMaterial {
    name: string;
    grade?: string;
    properties: string[];
    standard?: string;
}

/* ─── Heat Treatment ─── */
export interface HeatTreatment {
    name: string;
    description?: string;
    hardnessRange?: string;
    applicableStandards?: string[];
}

/* ─── Surface Finish ─── */
export interface SurfaceFinish {
    name: string;
    roughness?: string; // Ra value
    description?: string;
    applicableStandards?: string[];
}

/* ─── Quality Standard ─── */
export interface QualityStandard {
    name: string;
    description?: string;
    certificateAvailable: boolean;
}

/* ─── Related Product ─── */
export interface RelatedProduct {
    id: string;
    name: string;
    category: string;
    categorySlug: string;
    heroImage: string;
    tagline: string;
}

/* ─── Main Product Component ─── */
export interface ProductComponent {
    id: string;
    name: string;
    slug: string;
    partNumber: string;
    categoryId: string;
    categorySlug: string;
    categoryName: string;
    tagline: string;
    description: string;
    shortDescription: string;

    /* Visual */
    images: ProductImage[];
    thumbnailUrl: string;

    /* Technical */
    specifications: TechnicalSpec[];
    materials: ProductMaterial[];
    manufacturingProcesses: ManufacturingProcess[];
    heatTreatments: HeatTreatment[];
    surfaceFinishes: SurfaceFinish[];
    toleranceCapability: string;
    qualityStandards: QualityStandard[];

    /* Applications */
    applications: ProductApplication[];

    /* Downloads */
    downloads: ProductDownload[];

    /* Related */
    relatedProductIds: string[];

    /* Industry tags */
    industries: string[];
    tags: string[];

    /* SEO */
    metaTitle?: string;
    metaDescription?: string;

    /* Status */
    isActive: boolean;
    isFeatured: boolean;
    displayOrder: number;

    /* Timestamps */
    createdAt: string;
    updatedAt: string;
}

/* ─── Filter State ─── */
export interface ProductFilters {
    category: string[];
    material: string[];
    industry: string[];
    manufacturingProcess: string[];
    heatTreatment: string[];
    surfaceFinish: string[];
    application: string[];
    search: string;
    sortBy: 'name' | 'category' | 'newest' | 'featured';
}

/* ─── Product Search Result ─── */
export interface ProductSearchResult {
    products: ProductComponent[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
    filters: {
        categories: { slug: string; name: string; count: number }[];
        materials: { name: string; count: number }[];
        industries: { name: string; count: number }[];
        manufacturingProcesses: { name: string; count: number }[];
        heatTreatments: { name: string; count: number }[];
        surfaceFinishes: { name: string; count: number }[];
    };
}

/* ─── RFQ Submission ─── */
export interface ProductRFQ {
    productId: string;
    productName: string;
    partNumber: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    quantity: number;
    material?: string;
    specialRequirements?: string;
    targetDeliveryDate?: string;
    message?: string;
}
