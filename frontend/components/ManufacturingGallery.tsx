'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { COMPONENT_CATEGORIES, COMPONENT_PRODUCTS } from '@/lib/components-data';

/* ═══════════════════════════════════════════════════════════════ */
/* Gallery Item — derived from product data                       */
/* ═══════════════════════════════════════════════════════════════ */

interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: string;
  categorySlug: string;
  partNumber: string;
  description: string;
  isPrimary: boolean;
}

function buildGalleryItems(): GalleryItem[] {
  const items: GalleryItem[] = [];

  for (const product of COMPONENT_PRODUCTS) {
    if (!product.isActive) continue;

    for (const img of product.images) {
      items.push({
        id: img.id,
        src: img.url,
        alt: img.alt,
        title: product.name,
        category: product.categoryName,
        categorySlug: product.categorySlug,
        partNumber: product.partNumber,
        description: product.shortDescription,
        isPrimary: img.isPrimary,
      });
    }
  }

  return items;
}

/* ═══════════════════════════════════════════════════════════════ */
/* Lightbox Overlay                                               */
/* ═══════════════════════════════════════════════════════════════ */

interface LightboxProps {
  item: GalleryItem;
  allItems: GalleryItem[];
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
}

function Lightbox({ item, allItems, onClose, onNavigate }: LightboxProps) {
  const currentIndex = allItems.findIndex((i) => i.id === item.id);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate('prev');
      if (e.key === 'ArrowRight') onNavigate('next');
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Close lightbox"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Previous button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate('prev'); }}
        className="absolute left-2 md:left-4 z-[110] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Previous image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={(e) => { e.stopPropagation(); onNavigate('next'); }}
        className="absolute right-2 md:right-4 z-[110] flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Next image"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Image and info */}
      <div
        className="relative flex flex-col items-center max-w-[90vw] max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[70vh] max-w-full rounded-lg object-contain shadow-2xl"
          decoding="async"
        />
        <div className="mt-4 text-center text-white">
          <p className="text-xs uppercase tracking-widest text-white/50 mb-1">
            {item.partNumber} · {item.category}
          </p>
          <h3 className="text-lg md:text-xl font-semibold">{item.title}</h3>
          <p className="text-sm text-white/60 mt-1">{item.description}</p>
          <p className="text-xs text-white/40 mt-2">
            {currentIndex + 1} / {allItems.length}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* Main Gallery Component                                         */
/* ═══════════════════════════════════════════════════════════════ */

export default function ManufacturingGallery() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const allItems = useMemo(() => buildGalleryItems(), []);

  // Category list derived from products
  const categories = COMPONENT_CATEGORIES.filter((cat) =>
    COMPONENT_PRODUCTS.some((p) => p.categorySlug === cat.slug && p.isActive)
  );

  // Filter items using useMemo instead of useEffect + setState
  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') {
      return allItems;
    }
    return allItems.filter((item: GalleryItem) => item.categorySlug === activeCategory);
  }, [activeCategory, allItems]);

  // Lightbox navigation
  const handleNavigate = useCallback(
    (direction: 'prev' | 'next') => {
      if (!lightboxItem) return;
      const currentIndex = filteredItems.findIndex((i) => i.id === lightboxItem.id);
      let nextIndex: number;
      if (direction === 'next') {
        nextIndex = (currentIndex + 1) % filteredItems.length;
      } else {
        nextIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
      }
      setLightboxItem(filteredItems[nextIndex]);
    },
    [lightboxItem, filteredItems]
  );

  // Lazy loading via Intersection Observer for fade-in animation
  const setImageRef = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('gallery-visible');
              observerRef.current?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '100px' }
      );
    }
    observerRef.current.observe(node);
  }, []);

  return (
    <section className="w-full bg-background">
      {/* Hero Header */}
      <div className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3 font-medium">
              Manufacturing Excellence
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Product Gallery
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
              Explore our precision-engineered components across 16 manufacturing categories.
              Every component manufactured to exacting tolerances with full traceability.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="sticky top-[72px] z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              All ({allItems.length})
            </button>
            {categories.map((cat: typeof categories[number]) => {
              const count = allItems.filter((i: GalleryItem) => i.categorySlug === cat.slug).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 border ${
                    activeCategory === cat.slug
                      ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                      : 'bg-muted text-muted-foreground border-border hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  {cat.icon} {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No images found for this category.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                ref={setImageRef}
                className="gallery-item break-inside-avoid group cursor-pointer"
                onClick={() => setLightboxItem(item)}
              >
                <div className="relative overflow-hidden rounded-lg border border-border bg-muted/30 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  {/* Image */}
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">
                      {item.partNumber}
                    </p>
                    <h3 className="text-sm font-semibold text-white leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs text-white/60 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="mt-2">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/70">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Zoom icon indicator */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                        <path d="M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          allItems={filteredItems}
          onClose={() => setLightboxItem(null)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Gallery animation styles */}
      <style jsx global>{`
        .gallery-item {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .gallery-item.gallery-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}