"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { searchProducts, getCategories, getFeaturedProducts } from "@/lib/components-data";
import { Cog } from "lucide-react";

interface FilterState {
    category: string[];
    material: string[];
    industry: string[];
    manufacturingProcess: string[];
    heatTreatment: string[];
    surfaceFinish: string[];
    search: string;
    sortBy: "name" | "category" | "newest" | "featured";
}

const DEFAULT_FILTERS: FilterState = {
    category: [],
    material: [],
    industry: [],
    manufacturingProcess: [],
    heatTreatment: [],
    surfaceFinish: [],
    search: "",
    sortBy: "featured",
};

export default function ProductsAndComponentsPage() {
    const prefersReducedMotion = useReducedMotion();
    const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
    const [page, setPage] = useState(1);

    const transition = prefersReducedMotion ? { duration: 0.01 } : { duration: 0.8 };
    const initialY = prefersReducedMotion ? 0 : 20;

    const categories = useMemo(() => getCategories(), []);
    const featuredProducts = useMemo(() => getFeaturedProducts(), []);

    const searchResult = useMemo(() => {
        return searchProducts(filters.search, filters, page, 12);
    }, [filters, page]);

    const handleFilterChange = useCallback((newFilters: FilterState) => {
        setFilters(newFilters);
        setPage(1);
    }, []);

    const handleClearAll = useCallback(() => {
        setFilters(DEFAULT_FILTERS);
        setPage(1);
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            {/* Hero Section */}
            <main className="pt-24">
                <section className="relative overflow-hidden bg-foreground/5 border-b border-border">
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 grid-pattern opacity-30" />

                    <div className="container relative py-20">
                        <motion.div
                            className="max-w-4xl space-y-6"
                            initial={{ opacity: 0, y: initialY }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={transition}
                        >
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent/10 border border-accent/20">
                                    <Cog className="w-5 h-5 text-accent" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                                    Products & Components
                                </span>
                            </div>

                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.9]">
                                Precision-Engineered
                                <br />
                                <span className="text-accent">Components</span>
                            </h1>

                            <p className="text-lg text-foreground/60 max-w-2xl leading-relaxed">
                                From precision shafts to custom assemblies — explore our comprehensive range of
                                manufactured components. Every part engineered to exact tolerances, every surface
                                finished to perfection.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-8 pt-4">
                                {[
                                    { value: "16", label: "Categories" },
                                    { value: "32+", label: "Products" },
                                    { value: "12+", label: "Industries" },
                                    { value: "±0.005mm", label: "Tolerance" },
                                ].map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: prefersReducedMotion ? 0 : 0.3 + idx * 0.1 }}
                                    >
                                        <p className="text-2xl font-bold text-accent">{stat.value}</p>
                                        <p className="text-xs text-foreground/50 uppercase tracking-wider">
                                            {stat.label}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Categories Overview */}
                <section className="container py-12 border-b border-border">
                    <motion.div
                        initial={{ opacity: 0, y: initialY }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={transition}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-2xl font-bold tracking-tight mb-6">Browse by Category</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        handleFilterChange({
                                            ...DEFAULT_FILTERS,
                                            category: [cat.slug],
                                        });
                                        document
                                            .getElementById("product-grid")
                                            ?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className={`group p-4 border text-center transition-all duration-200 hover:border-accent hover:bg-accent/5 ${filters.category.includes(cat.slug)
                                        ? "border-accent bg-accent/10"
                                        : "border-border bg-card"
                                        }`}
                                >
                                    <span className="text-2xl block mb-2">{cat.icon}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/70 group-hover:text-accent leading-tight block">
                                        {cat.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </section>

                {/* Product Grid with Filters */}
                <section id="product-grid" className="container py-12">
                    <div className="flex gap-8">
                        {/* Filters Sidebar */}
                        <ProductFilters
                            filters={searchResult.filters}
                            activeFilters={filters}
                            onFilterChange={handleFilterChange}
                            onClearAll={handleClearAll}
                            productCount={searchResult.totalCount}
                        />

                        {/* Product Grid */}
                        <div className="flex-1 min-w-0">
                            {/* Active filter tags */}
                            {(filters.category.length > 0 ||
                                filters.material.length > 0 ||
                                filters.industry.length > 0 ||
                                filters.manufacturingProcess.length > 0 ||
                                filters.heatTreatment.length > 0 ||
                                filters.surfaceFinish.length > 0 ||
                                filters.search) && (
                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {filters.search && (
                                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent text-xs font-medium">
                                                Search: {`"${filters.search}"`}
                                                <button
                                                    onClick={() =>
                                                        handleFilterChange({ ...filters, search: "" })
                                                    }
                                                    className="ml-1 hover:text-foreground"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        )}
                                        {[...filters.category, ...filters.material, ...filters.industry, ...filters.manufacturingProcess, ...filters.heatTreatment, ...filters.surfaceFinish].map(
                                            (tag) => (
                                                <span
                                                    key={tag}
                                                    className="inline-flex items-center gap-1 px-3 py-1 bg-secondary text-foreground/70 text-xs font-medium"
                                                >
                                                    {tag}
                                                    <button
                                                        onClick={() => {
                                                            const newFilters = { ...filters };
                                                            for (const key of [
                                                                "category",
                                                                "material",
                                                                "industry",
                                                                "manufacturingProcess",
                                                                "heatTreatment",
                                                                "surfaceFinish",
                                                            ] as const) {
                                                                (newFilters[key] as string[]) = (
                                                                    newFilters[key] as string[]
                                                                ).filter((v) => v !== tag);
                                                            }
                                                            handleFilterChange(newFilters);
                                                        }}
                                                        className="ml-1 hover:text-foreground"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            )
                                        )}
                                    </div>
                                )}

                            {searchResult.products.length === 0 ? (
                                <div className="text-center py-20 space-y-4">
                                    <div className="text-4xl">🔍</div>
                                    <h3 className="text-xl font-bold">No products found</h3>
                                    <p className="text-foreground/60">
                                        Try adjusting your filters or search terms.
                                    </p>
                                    <button
                                        onClick={handleClearAll}
                                        className="px-6 py-2 bg-accent text-white text-sm font-medium hover:bg-accent/90 transition-colors"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {searchResult.products.map((product) => (
                                            <ProductCard key={product.id} product={product} />
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {searchResult.totalPages > 1 && (
                                        <div className="flex items-center justify-center gap-2 mt-12">
                                            <button
                                                onClick={() => setPage(Math.max(1, page - 1))}
                                                disabled={page === 1}
                                                className="px-4 py-2 border border-border text-sm font-medium hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Previous
                                            </button>
                                            {Array.from(
                                                { length: searchResult.totalPages },
                                                (_, i) => i + 1
                                            ).map((p) => (
                                                <button
                                                    key={p}
                                                    onClick={() => setPage(p)}
                                                    className={`w-10 h-10 text-sm font-medium transition-colors ${p === page
                                                        ? "bg-accent text-white"
                                                        : "border border-border hover:bg-secondary"
                                                        }`}
                                                >
                                                    {p}
                                                </button>
                                            ))}
                                            <button
                                                onClick={() =>
                                                    setPage(
                                                        Math.min(searchResult.totalPages, page + 1)
                                                    )
                                                }
                                                disabled={page === searchResult.totalPages}
                                                className="px-4 py-2 border border-border text-sm font-medium hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Featured Products Section */}
                {filters.category.length === 0 &&
                    filters.material.length === 0 &&
                    filters.industry.length === 0 &&
                    !filters.search && (
                        <section className="bg-foreground/5 border-t border-border">
                            <div className="container py-16">
                                <motion.div
                                    className="text-center space-y-4 mb-12"
                                    initial={{ opacity: 0, y: initialY }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={transition}
                                    viewport={{ once: true }}
                                >
                                    <h2 className="text-3xl font-bold tracking-tight">
                                        Featured Components
                                    </h2>
                                    <p className="text-foreground/60 max-w-2xl mx-auto">
                                        Our most in-demand precision components, selected for their engineering
                                        excellence and broad industrial applicability.
                                    </p>
                                </motion.div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {featuredProducts.slice(0, 6).map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            </div>
                        </section>
                    )}

                {/* Industries Served */}
                <section className="container py-16 border-t border-border">
                    <motion.div
                        className="text-center space-y-4 mb-12"
                        initial={{ opacity: 0, y: initialY }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={transition}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold tracking-tight">Industries We Serve</h2>
                        <p className="text-foreground/60 max-w-2xl mx-auto">
                            Precision components for the most demanding industrial applications.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {[
                            { icon: "🚗", name: "Automotive" },
                            { icon: "⛽", name: "Oil & Gas" },
                            { icon: "📦", name: "Packaging" },
                            { icon: "🍽", name: "Food Processing" },
                            { icon: "💊", name: "Pharmaceutical" },
                            { icon: "🏗", name: "Steel Plants" },
                            { icon: "⚡", name: "Power Plants" },
                            { icon: "⛏", name: "Mining" },
                            { icon: "🔧", name: "Heavy Engineering" },
                            { icon: "🧵", name: "Textile" },
                            { icon: "🤖", name: "Automation" },
                            { icon: "⚙", name: "Special Purpose Machines" },
                        ].map((ind) => (
                            <button
                                key={ind.name}
                                onClick={() => {
                                    handleFilterChange({
                                        ...DEFAULT_FILTERS,
                                        industry: [ind.name],
                                    });
                                    document
                                        .getElementById("product-grid")
                                        ?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="p-4 bg-card border border-border text-center hover:border-accent hover:bg-accent/5 transition-all"
                            >
                                <span className="text-2xl block mb-2">{ind.icon}</span>
                                <span className="text-xs font-medium text-foreground/70">{ind.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-foreground/5 border-t border-border">
                    <div className="container py-16 text-center space-y-6">
                        <h2 className="text-3xl font-bold">Need a Custom Component?</h2>
                        <p className="text-foreground/70 max-w-2xl mx-auto">
                            Our engineering team specializes in custom solutions. Whether you need a modification
                            to an existing design or a completely new component, we are ready to help.
                        </p>
                        <div className="flex gap-4 justify-center pt-4">
                            <a
                                href="#contact"
                                className="px-8 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors"
                            >
                                Request Custom Quote
                            </a>
                            <Link
                                href="/products-and-components/"
                                className="px-8 py-3 border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-colors"
                            >
                                Browse All Products
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}