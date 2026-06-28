"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronDown, X, SlidersHorizontal, Search } from "lucide-react";
import type { ProductSearchResult } from "@/types/components";

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

interface ProductFiltersProps {
    filters: ProductSearchResult["filters"];
    activeFilters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    onClearAll: () => void;
    productCount: number;
}

function FilterGroup({
    title,
    items,
    selected,
    onToggle,
    defaultOpen = false,
}: {
    title: string;
    items: { name: string; count: number }[];
    selected: string[];
    onToggle: (name: string) => void;
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const prefersReducedMotion = useReducedMotion();

    return (
        <div className="border-b border-border/50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full py-3 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                aria-expanded={isOpen}
            >
                <span>{title}</span>
                <div className="flex items-center gap-2">
                    {selected.length > 0 && (
                        <span className="px-1.5 py-0.5 bg-accent text-white text-[10px] font-bold rounded-full">
                            {selected.length}
                        </span>
                    )}
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.2 }}
                    >
                        <ChevronDown className="w-4 h-4 text-foreground/50" />
                    </motion.div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-3 space-y-1 max-h-48 overflow-y-auto">
                            {items.map((item) => (
                                <label
                                    key={item.name}
                                    className="flex items-center gap-2 py-1 px-1 cursor-pointer hover:bg-secondary/50 rounded transition-colors group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(item.name)}
                                        onChange={() => onToggle(item.name)}
                                        className="w-3.5 h-3.5 accent-accent"
                                    />
                                    <span className="text-xs text-foreground/70 group-hover:text-foreground flex-1 truncate">
                                        {item.name}
                                    </span>
                                    <span className="text-[10px] text-foreground/40">
                                        {item.count}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ProductFilters({
    filters,
    activeFilters,
    onFilterChange,
    onClearAll,
    productCount,
}: ProductFiltersProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    const toggleFilter = (group: keyof FilterState, value: string) => {
        const current = activeFilters[group] as string[];
        const updated = current.includes(value)
            ? current.filter((v) => v !== value)
            : [...current, value];
        onFilterChange({ ...activeFilters, [group]: updated });
    };

    const activeCount =
        activeFilters.category.length +
        activeFilters.material.length +
        activeFilters.industry.length +
        activeFilters.manufacturingProcess.length +
        activeFilters.heatTreatment.length +
        activeFilters.surfaceFinish.length;

    const filterContent = (
        <div className="space-y-0">
            {/* Search */}
            <div className="pb-4 border-b border-border/50">
                <label className="text-sm font-medium text-foreground/80 mb-2 block">
                    Search Products
                </label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <input
                        type="text"
                        value={activeFilters.search}
                        onChange={(e) =>
                            onFilterChange({ ...activeFilters, search: e.target.value })
                        }
                        placeholder="Name, part number, material..."
                        className="w-full pl-9 pr-3 py-2 bg-secondary/30 border border-border/50 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    />
                </div>
            </div>

            {/* Sort */}
            <div className="pb-4 border-b border-border/50">
                <label className="text-sm font-medium text-foreground/80 mb-2 block">
                    Sort By
                </label>
                <select
                    value={activeFilters.sortBy}
                    onChange={(e) =>
                        onFilterChange({
                            ...activeFilters,
                            sortBy: e.target.value as FilterState["sortBy"],
                        })
                    }
                    className="w-full px-3 py-2 bg-secondary/30 border border-border/50 text-sm text-foreground focus:outline-none focus:border-accent transition-colors"
                >
                    <option value="featured">Featured First</option>
                    <option value="newest">Newest</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="category">Category</option>
                </select>
            </div>

            {/* Category */}
            <FilterGroup
                title="Category"
                items={filters.categories}
                selected={activeFilters.category}
                onToggle={(v) => toggleFilter("category", v)}
                defaultOpen={true}
            />

            {/* Material */}
            <FilterGroup
                title="Material"
                items={filters.materials}
                selected={activeFilters.material}
                onToggle={(v) => toggleFilter("material", v)}
            />

            {/* Industry */}
            <FilterGroup
                title="Industry"
                items={filters.industries}
                selected={activeFilters.industry}
                onToggle={(v) => toggleFilter("industry", v)}
            />

            {/* Manufacturing Process */}
            <FilterGroup
                title="Manufacturing Process"
                items={filters.manufacturingProcesses}
                selected={activeFilters.manufacturingProcess}
                onToggle={(v) => toggleFilter("manufacturingProcess", v)}
            />

            {/* Heat Treatment */}
            <FilterGroup
                title="Heat Treatment"
                items={filters.heatTreatments}
                selected={activeFilters.heatTreatment}
                onToggle={(v) => toggleFilter("heatTreatment", v)}
            />

            {/* Surface Finish */}
            <FilterGroup
                title="Surface Finish"
                items={filters.surfaceFinishes}
                selected={activeFilters.surfaceFinish}
                onToggle={(v) => toggleFilter("surfaceFinish", v)}
            />
        </div>
    );

    return (
        <>
            {/* Mobile filter toggle */}
            <div className="lg:hidden flex items-center gap-3 mb-4">
                <button
                    onClick={() => setMobileOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-card border border-border text-sm font-medium hover:bg-secondary transition-colors"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeCount > 0 && (
                        <span className="px-1.5 py-0.5 bg-accent text-white text-[10px] font-bold rounded-full">
                            {activeCount}
                        </span>
                    )}
                </button>
                <span className="text-sm text-foreground/60">{productCount} products</span>
            </div>

            {/* Mobile filter drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            className="fixed inset-y-0 left-0 w-80 bg-background z-50 p-6 overflow-y-auto lg:hidden"
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{
                                type: "spring",
                                damping: prefersReducedMotion ? 1000 : 25,
                                stiffness: prefersReducedMotion ? 1000 : 300,
                            }}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold">Filters</h3>
                                <button
                                    onClick={() => setMobileOpen(false)}
                                    className="p-2 hover:bg-secondary rounded transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            {filterContent}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-24">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/60">
                            Filters
                        </h3>
                        {activeCount > 0 && (
                            <button
                                onClick={onClearAll}
                                className="text-xs text-accent hover:underline"
                            >
                                Clear all ({activeCount})
                            </button>
                        )}
                    </div>
                    <div className="bg-card border border-border p-4">{filterContent}</div>
                    <p className="text-xs text-foreground/40 mt-3 text-center">
                        {productCount} products found
                    </p>
                </div>
            </aside>
        </>
    );
}