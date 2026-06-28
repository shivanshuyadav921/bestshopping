"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/products/ProductCard";
import { getProductById, getRelatedProducts, getCategories } from "@/lib/components-data";
import {
    ChevronLeft,
    ChevronRight,
    Download,
    FileText,
    Share2,
    ZoomIn,
    X,
    Send,
    Package,
    Ruler,
    Shield,
    Factory,
    FlaskConical,
    Gauge,
    Award,
} from "lucide-react";

type DetailTab = "specs" | "materials" | "process" | "applications" | "quality" | "downloads";

export default function ProductDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const router = useRouter();
    const resolvedParams = use(params);
    const prefersReducedMotion = useReducedMotion();
    const [activeTab, setActiveTab] = useState<DetailTab>("specs");
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [rfqOpen, setRfqOpen] = useState(false);
    const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

    const transition = prefersReducedMotion ? { duration: 0.01 } : { duration: 0.8 };
    const initialY = prefersReducedMotion ? 0 : 20;

    const product = getProductById(resolvedParams.id);
    const relatedProducts = product ? getRelatedProducts(product.id) : [];
    const categories = getCategories();

    if (!product) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center space-y-4">
                    <div className="text-6xl">🔍</div>
                    <h1 className="text-2xl font-bold">Product Not Found</h1>
                    <p className="text-foreground/60">
                        The product you are looking for does not exist or has been removed.
                    </p>
                    <button
                        onClick={() => router.push("/products-and-components")}
                        className="px-6 py-2 bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
                    >
                        Browse All Products
                    </button>
                </div>
            </div>
        );
    }

    const currentImage = product.images[selectedImageIndex];

    const handleImageError = (imgId: string) => {
        setImgErrors((prev) => new Set(prev).add(imgId));
    };

    const tabs: { id: DetailTab; label: string; icon: React.ReactNode }[] = [
        { id: "specs", label: "Specifications", icon: <Ruler className="w-4 h-4" /> },
        { id: "materials", label: "Materials", icon: <FlaskConical className="w-4 h-4" /> },
        { id: "process", label: "Manufacturing", icon: <Factory className="w-4 h-4" /> },
        { id: "applications", label: "Applications", icon: <Package className="w-4 h-4" /> },
        { id: "quality", label: "Quality", icon: <Shield className="w-4 h-4" /> },
        { id: "downloads", label: "Downloads", icon: <Download className="w-4 h-4" /> },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            <main className="pt-20">
                {/* Breadcrumb */}
                <div className="container py-4 border-b border-border">
                    <nav className="flex items-center gap-2 text-xs text-foreground/50">
                        <button
                            onClick={() => router.push("/")}
                            className="hover:text-foreground transition-colors"
                        >
                            Home
                        </button>
                        <span>/</span>
                        <button
                            onClick={() => router.push("/products-and-components")}
                            className="hover:text-foreground transition-colors"
                        >
                            Products & Components
                        </button>
                        <span>/</span>
                        <button
                            onClick={() =>
                                router.push(
                                    `/products-and-components?category=${product.categorySlug}`
                                )
                            }
                            className="hover:text-foreground transition-colors"
                        >
                            {product.categoryName}
                        </button>
                        <span>/</span>
                        <span className="text-foreground/80 truncate">{product.name}</span>
                    </nav>
                </div>

                {/* Hero: Image Gallery + Product Info */}
                <section className="container py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={transition}
                            className="space-y-4"
                        >
                            {/* Main Image */}
                            <div
                                className="relative aspect-square bg-black/5 border border-border overflow-hidden cursor-zoom-in group"
                                onClick={() => setLightboxOpen(true)}
                            >
                                {!imgErrors.has(currentImage.id) ? (
                                    <img
                                        src={currentImage.url}
                                        alt={currentImage.alt}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        onError={() => handleImageError(currentImage.id)}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-foreground/30 text-sm">
                                        Image Placeholder
                                    </div>
                                )}
                                <div className="absolute bottom-3 right-3 p-2 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ZoomIn className="w-5 h-5" />
                                </div>
                                {/* Navigation arrows */}
                                {product.images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImageIndex(
                                                    (selectedImageIndex - 1 + product.images.length) %
                                                    product.images.length
                                                );
                                            }}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedImageIndex(
                                                    (selectedImageIndex + 1) % product.images.length
                                                );
                                            }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-white hover:bg-black/70 transition-colors"
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}
                            </div>

                            {/* Thumbnail Strip */}
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`flex-shrink-0 w-20 h-20 border-2 overflow-hidden transition-colors ${idx === selectedImageIndex
                                                ? "border-accent"
                                                : "border-border hover:border-foreground/30"
                                            }`}
                                    >
                                        {!imgErrors.has(img.id) ? (
                                            <img
                                                src={img.url}
                                                alt={img.alt}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                                onError={() => handleImageError(img.id)}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-secondary/20 flex items-center justify-center text-foreground/20 text-[8px]">
                                                {idx + 1}
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Product Info */}
                        <motion.div
                            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                                delay: prefersReducedMotion ? 0 : 0.2,
                                duration: prefersReducedMotion ? 0.01 : 0.8,
                            }}
                            className="space-y-6"
                        >
                            {/* Category */}
                            <div className="flex items-center gap-3">
                                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold uppercase tracking-wider">
                                    {product.categoryName}
                                </span>
                                {product.isFeatured && (
                                    <span className="px-2 py-1 bg-foreground/10 text-foreground/60 text-[10px] font-bold uppercase tracking-widest">
                                        Featured
                                    </span>
                                )}
                            </div>

                            {/* Title */}
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold tracking-tight leading-tight">
                                    {product.name}
                                </h1>
                                <p className="text-lg text-accent font-medium">{product.tagline}</p>
                            </div>

                            {/* Part number */}
                            <div className="flex items-center gap-4 text-sm">
                                <span className="text-foreground/50">
                                    Part No:{" "}
                                    <span className="text-foreground font-mono font-medium">
                                        {product.partNumber}
                                    </span>
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-foreground/70 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Key Specs Quick View */}
                            <div className="grid grid-cols-2 gap-3">
                                {product.specifications.slice(0, 6).map((spec, i) => (
                                    <div
                                        key={i}
                                        className="bg-secondary/30 border border-border/50 p-3"
                                    >
                                        <p className="text-[10px] text-foreground/50 uppercase tracking-wider mb-1">
                                            {spec.label}
                                        </p>
                                        <p className="text-sm font-semibold text-foreground">
                                            {spec.value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Tolerance Capability */}
                            <div className="bg-accent/5 border border-accent/20 p-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <Gauge className="w-4 h-4 text-accent" />
                                    <span className="text-xs font-bold uppercase tracking-wider text-accent">
                                        Tolerance Capability
                                    </span>
                                </div>
                                <p className="text-sm text-foreground/80">{product.toleranceCapability}</p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    onClick={() => setRfqOpen(true)}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
                                >
                                    <Send className="w-4 h-4" />
                                    Request Quote (RFQ)
                                </button>
                                <button
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: product.name,
                                                url: `/products-and-components/${product.id}`,
                                            });
                                        }
                                    }}
                                    className="px-6 py-3 border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Share2 className="w-4 h-4" />
                                    Share
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Tabbed Content */}
                <section className="border-t border-border">
                    <div className="container">
                        {/* Tab Navigation */}
                        <div className="flex overflow-x-auto border-b border-border">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors relative ${activeTab === tab.id
                                            ? "text-foreground"
                                            : "text-foreground/50 hover:text-foreground/80"
                                        }`}
                                >
                                    {tab.icon}
                                    {tab.label}
                                    {activeTab === tab.id && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                                            layoutId="activeTab"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="py-12">
                            {/* Specifications Tab */}
                            {activeTab === "specs" && (
                                <motion.div
                                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6">Technical Specifications</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {product.specifications.map((spec, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between items-center p-4 bg-card border border-border"
                                            >
                                                <span className="text-sm text-foreground/60">{spec.label}</span>
                                                <span className="text-sm font-semibold text-foreground ml-4 text-right">
                                                    {spec.value}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Materials Tab */}
                            {activeTab === "materials" && (
                                <motion.div
                                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6">Materials</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {product.materials.map((material, i) => (
                                            <div key={i} className="bg-card border border-border p-6 space-y-4">
                                                <div>
                                                    <h3 className="text-xl font-bold">{material.name}</h3>
                                                    {material.grade && (
                                                        <p className="text-sm text-foreground/50 font-mono">
                                                            Grade: {material.grade}
                                                        </p>
                                                    )}
                                                    {material.standard && (
                                                        <p className="text-sm text-foreground/50">
                                                            Standard: {material.standard}
                                                        </p>
                                                    )}
                                                </div>
                                                <ul className="space-y-2">
                                                    {material.properties.map((prop, pi) => (
                                                        <li key={pi} className="flex items-start gap-2">
                                                            <span className="text-accent mt-0.5 text-sm">✓</span>
                                                            <span className="text-sm text-foreground/80">{prop}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Manufacturing Process Tab */}
                            {activeTab === "process" && (
                                <motion.div
                                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6">Manufacturing Process</h2>
                                    <div className="space-y-0">
                                        {product.manufacturingProcesses.map((step, i) => (
                                            <div
                                                key={i}
                                                className="flex gap-6 pb-8 border-l-2 border-accent/20 ml-5 relative"
                                            >
                                                <div className="absolute -left-[13px] top-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center text-white text-xs font-bold">
                                                    {step.step}
                                                </div>
                                                <div className="flex-1 pl-4">
                                                    <h4 className="text-lg font-semibold mb-1">{step.process}</h4>
                                                    <p className="text-sm text-foreground/70 mb-2">
                                                        {step.description}
                                                    </p>
                                                    {step.duration && (
                                                        <p className="text-xs text-foreground/50">
                                                            Duration: {step.duration}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Applications Tab */}
                            {activeTab === "applications" && (
                                <motion.div
                                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6">Applications</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {product.applications.map((app, i) => (
                                            <div
                                                key={i}
                                                className="bg-card border border-border p-6 space-y-3 hover-elastic"
                                            >
                                                <span className="text-3xl">{app.icon}</span>
                                                <h4 className="text-lg font-bold">{app.industry}</h4>
                                                <p className="text-sm text-foreground/70">{app.useCase}</p>
                                                <div className="pt-2 border-t border-border/50">
                                                    <p className="text-xs text-accent font-medium">
                                                        Benefit: {app.benefit}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {/* Quality Tab */}
                            {activeTab === "quality" && (
                                <motion.div
                                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6">Quality Standards</h2>

                                    {/* Heat Treatments */}
                                    {product.heatTreatments.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                <FlaskConical className="w-5 h-5 text-accent" />
                                                Available Heat Treatments
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {product.heatTreatments.map((ht, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-card border border-border p-4 space-y-2"
                                                    >
                                                        <h4 className="font-semibold text-sm">{ht.name}</h4>
                                                        {ht.description && (
                                                            <p className="text-xs text-foreground/60">
                                                                {ht.description}
                                                            </p>
                                                        )}
                                                        {ht.hardnessRange && (
                                                            <p className="text-xs font-mono text-accent">
                                                                Hardness: {ht.hardnessRange}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Surface Finishes */}
                                    {product.surfaceFinishes.length > 0 && (
                                        <div className="mb-8">
                                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                                <Gauge className="w-5 h-5 text-accent" />
                                                Surface Finishes
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {product.surfaceFinishes.map((sf, i) => (
                                                    <div
                                                        key={i}
                                                        className="bg-card border border-border p-4 space-y-2"
                                                    >
                                                        <h4 className="font-semibold text-sm">{sf.name}</h4>
                                                        {sf.roughness && (
                                                            <p className="text-xs font-mono text-accent">
                                                                {sf.roughness}
                                                            </p>
                                                        )}
                                                        {sf.description && (
                                                            <p className="text-xs text-foreground/60">
                                                                {sf.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Quality Standards */}
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                            <Award className="w-5 h-5 text-accent" />
                                            Certifications & Standards
                                        </h3>
                                        <div className="space-y-3">
                                            {product.qualityStandards.map((qs, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between p-4 bg-card border border-border"
                                                >
                                                    <div>
                                                        <p className="text-sm font-semibold">{qs.name}</p>
                                                        {qs.description && (
                                                            <p className="text-xs text-foreground/60">
                                                                {qs.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    {qs.certificateAvailable && (
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-bold uppercase">
                                                            Certificate Available
                                                        </span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Downloads Tab */}
                            {activeTab === "downloads" && (
                                <motion.div
                                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
                                >
                                    <h2 className="text-2xl font-bold mb-6">Downloads</h2>
                                    {product.downloads.length > 0 ? (
                                        <div className="space-y-3">
                                            {product.downloads.map((dl) => (
                                                <a
                                                    key={dl.id}
                                                    href={dl.url}
                                                    className="flex items-center justify-between p-4 bg-card border border-border hover:border-accent transition-colors group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <FileText className="w-5 h-5 text-foreground/50 group-hover:text-accent transition-colors" />
                                                        <div>
                                                            <p className="text-sm font-semibold">{dl.name}</p>
                                                            <p className="text-xs text-foreground/50">
                                                                {dl.type}
                                                                {dl.fileSize && ` — ${dl.fileSize}`}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Download className="w-4 h-4 text-foreground/40 group-hover:text-accent transition-colors" />
                                                </a>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-foreground/50 text-sm">
                                            Downloads will be available soon. Contact us for detailed documentation.
                                        </p>
                                    )}
                                </motion.div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="border-t border-border bg-foreground/5">
                        <div className="container py-16">
                            <h2 className="text-2xl font-bold tracking-tight mb-8">Related Products</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {relatedProducts.map((rp) => (
                                    <ProductCard key={rp.id} product={rp} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="bg-foreground/5 border-t border-border">
                    <div className="container py-16 text-center space-y-6">
                        <h2 className="text-3xl font-bold">Interested in This Component?</h2>
                        <p className="text-foreground/70 max-w-2xl mx-auto">
                            Contact our engineering team for custom specifications, volume pricing, or technical
                            consultation.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setRfqOpen(true)}
                                className="px-8 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors flex items-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Request Quote
                            </button>
                            <a
                                href="#contact"
                                className="px-8 py-3 border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-colors"
                            >
                                Contact Sales
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            {/* Lightbox */}
            {lightboxOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setLightboxOpen(false)}
                >
                    <button
                        onClick={() => setLightboxOpen(false)}
                        className="absolute top-4 right-4 p-3 text-white/70 hover:text-white transition-colors"
                    >
                        <X className="w-8 h-8" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex(
                                (selectedImageIndex - 1 + product.images.length) %
                                product.images.length
                            );
                        }}
                        className="absolute left-4 p-3 text-white/70 hover:text-white transition-colors"
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <img
                        src={currentImage.url}
                        alt={currentImage.alt}
                        className="max-w-full max-h-[90vh] object-contain"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImageIndex(
                                (selectedImageIndex + 1) % product.images.length
                            );
                        }}
                        className="absolute right-4 p-3 text-white/70 hover:text-white transition-colors"
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                    <div className="absolute bottom-4 text-white/50 text-sm">
                        {selectedImageIndex + 1} / {product.images.length}
                    </div>
                </div>
            )}

            {/* RFQ Modal */}
            {rfqOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
                    onClick={() => setRfqOpen(false)}
                >
                    <motion.div
                        className="bg-background border border-border w-full max-w-lg p-8 space-y-6"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-bold">Request Quote</h2>
                            <button
                                onClick={() => setRfqOpen(false)}
                                className="p-2 hover:bg-secondary transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="bg-secondary/30 p-3 text-sm">
                            <p className="font-mono text-foreground/50">{product.partNumber}</p>
                            <p className="font-semibold">{product.name}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-foreground/60 block mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:border-accent"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-foreground/60 block mb-1">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        className="w-full px-3 py-2 bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:border-accent"
                                        placeholder="you@company.com"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-foreground/60 block mb-1">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        className="w-full px-3 py-2 bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:border-accent"
                                        placeholder="+91 XXXXX XXXXX"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-foreground/60 block mb-1">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:border-accent"
                                        placeholder="Company name"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-medium text-foreground/60 block mb-1">
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue={1}
                                        className="w-full px-3 py-2 bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:border-accent"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-foreground/60 block mb-1">
                                        Material
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full px-3 py-2 bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:border-accent"
                                        placeholder="e.g. SS316, EN8"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-medium text-foreground/60 block mb-1">
                                    Special Requirements
                                </label>
                                <textarea
                                    rows={3}
                                    className="w-full px-3 py-2 bg-secondary/30 border border-border/50 text-sm focus:outline-none focus:border-accent resize-none"
                                    placeholder="Tolerances, certifications, delivery requirements..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setRfqOpen(false)}
                                className="flex-1 px-4 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
                            >
                                <Send className="w-4 h-4" />
                                Submit RFQ
                            </button>
                            <button
                                onClick={() => setRfqOpen(false)}
                                className="px-4 py-3 border border-border text-foreground/70 hover:bg-secondary transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}

            <Footer />
        </div>
    );
}