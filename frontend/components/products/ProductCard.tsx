"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, FileText, Share2 } from "lucide-react";
import type { ProductComponent } from "@/types/components";

export default function ProductCard({ product }: { product: ProductComponent }) {
    const router = useRouter();
    const prefersReducedMotion = useReducedMotion();
    const [imgError, setImgError] = useState(false);

    const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];

    return (
        <motion.article
            className="group relative bg-card border border-border rounded-none overflow-hidden hover-elastic cursor-pointer"
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
            onClick={() => router.push(`/products-and-components/${product.id}`)}
            role="article"
            aria-label={`${product.name} — ${product.categoryName}`}
        >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-black/5">
                {!imgError ? (
                    <img
                        src={primaryImage.url}
                        alt={primaryImage.alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary/20 text-foreground/30 text-sm">
                        Image Placeholder
                    </div>
                )}

                {/* Category badge */}
                <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-accent/90 text-white text-xs font-semibold uppercase tracking-wider">
                        {product.categoryName}
                    </span>
                </div>

                {/* Featured badge */}
                {product.isFeatured && (
                    <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-foreground/80 text-background text-[10px] font-bold uppercase tracking-widest">
                            Featured
                        </span>
                    </div>
                )}

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-3">
                {/* Tagline */}
                <p className="text-xs font-medium text-accent uppercase tracking-wider">
                    {product.tagline}
                </p>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight leading-snug group-hover:text-accent transition-colors">
                    {product.name}
                </h3>

                {/* Part number and short description */}
                <div className="space-y-1">
                    <p className="text-xs text-foreground/50 font-mono">
                        {product.partNumber}
                    </p>
                    <p className="text-sm text-foreground/70 line-clamp-2">
                        {product.shortDescription}
                    </p>
                </div>

                {/* Key specs */}
                <div className="flex flex-wrap gap-2 pt-2">
                    {product.specifications.slice(0, 3).map((spec, i) => (
                        <span
                            key={i}
                            className="px-2 py-0.5 bg-secondary/50 text-[10px] font-medium text-foreground/60 uppercase tracking-wide"
                        >
                            {spec.value}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                if (navigator.share) {
                                    navigator.share({ title: product.name, url: `/products-and-components/${product.id}` });
                                }
                            }}
                            className="p-1.5 hover:bg-secondary rounded transition-colors"
                            aria-label="Share product"
                        >
                            <Share2 className="w-3.5 h-3.5 text-foreground/50" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                // Save/favorite action placeholder
                            }}
                            className="p-1.5 hover:bg-secondary rounded transition-colors"
                            aria-label="Save product"
                        >
                            <FileText className="w-3.5 h-3.5 text-foreground/50" />
                        </button>
                    </div>
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                        View Details
                        <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </div>
            </div>
        </motion.article>
    );
}