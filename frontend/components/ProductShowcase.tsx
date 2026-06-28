'use client';

/* PREMA ENGINEERING WORKS — Enhanced Product Showcase */
/* Design: Scroll-triggered animations, detailed specs, engineering focus */

import { useEffect, useRef, useState } from 'react';
import { COMPONENT_PRODUCTS } from '@/lib/components-data';

interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  headline: string;
  description: string;
  specs: {
    material: string;
    tolerance: string;
    finish: string;
    application: string;
  };
  capabilities: string[];
}

const products: Product[] = COMPONENT_PRODUCTS.filter(p => p.isActive !== false).map(p => {
  const specs = {
    material: p.specifications?.find(s => s.label.toLowerCase().includes('material'))?.value || 'Premium Alloy',
    tolerance: p.specifications?.find(s => s.label.toLowerCase().includes('tolerance'))?.value || '±0.01mm',
    finish: p.specifications?.find(s => s.label.toLowerCase().includes('finish'))?.value || 'Precision Ground',
    application: p.specifications?.find(s => s.label.toLowerCase().includes('lead') || s.label.toLowerCase().includes('application'))?.value || 'Industrial Machinery',
  };

  return {
    id: p.id,
    name: p.name,
    category: p.categoryName,
    image: p.images?.[0]?.url || p.thumbnailUrl,
    headline: p.tagline || p.shortDescription,
    description: p.description,
    specs,
    capabilities: p.manufacturingProcesses?.map(pr => pr.process) || ['CNC Machining'],
  };
});

export default function ProductShowcase() {
  const [mounted, setMounted] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<Set<string>>(new Set());
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    setMounted(true);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleProducts((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.2 }
    );

    products.forEach((product) => {
      if (refs.current[product.id]) {
        observer.observe(refs.current[product.id]!);
      }
    });

    return () => observer.disconnect();
  }, []);

  if (!mounted) {
    return (
      <section className="py-24 md:py-32 bg-background">
        <div className="container">
          <div className="max-w-3xl mb-24">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Manufactured Excellence
            </h2>
            <p className="text-lg text-foreground/70">
              Every component is engineered for precision, reliability, and performance. Real manufacturing output. Real engineering. Real results.
            </p>
          </div>
          <div className="h-96 w-full bg-foreground/5 animate-pulse border border-border" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Manufactured Excellence
          </h2>
          <p className="text-lg text-foreground/70">
            Every component is engineered for precision, reliability, and performance. Real manufacturing output. Real engineering. Real results.
          </p>
        </div>

        {/* Products */}
        <div className="space-y-32">
          {products.map((product, index) => {
            const isVisible = visibleProducts.has(product.id);
            const isReversed = index % 2 === 1;

            return (
              <div
                key={product.id}
                ref={(el) => {
                  if (el) refs.current[product.id] = el;
                }}
                id={product.id}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${isReversed ? 'md:grid-flow-dense' : ''}`}
              >
                {/* Image */}
                <div
                  className={`relative aspect-square md:aspect-auto overflow-hidden ${
                    isReversed ? 'md:order-2' : ''
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover shadow-2xl transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 border border-border/50" />
                </div>

                {/* Content */}
                <div className={`${isReversed ? 'md:order-1' : ''}`}>
                  <div className="space-y-6">
                    {/* Category */}
                    <div>
                      <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                        {product.category}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight">
                      {product.headline}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Specifications Grid */}
                    <div className="space-y-4 pt-2">
                      <h4 className="text-xs font-semibold tracking-widest text-foreground/60 uppercase">
                        Technical Specifications
                      </h4>
                      <div className="grid grid-cols-2 gap-6">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <p className="text-xs font-medium text-foreground/50 uppercase tracking-wider">
                              {key}
                            </p>
                            <p className="text-sm font-medium text-foreground">{value}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Capabilities */}
                    <div className="space-y-3 pt-4">
                      <h4 className="text-xs font-semibold tracking-widest text-foreground/60 uppercase">
                        Capabilities
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {product.capabilities.map((cap) => (
                          <span
                            key={cap}
                            className="px-3 py-1.5 bg-secondary text-foreground/70 text-xs font-medium rounded-none border border-border"
                          >
                            {cap}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-6">
                      <a
                        href="#contact"
                        className="inline-block px-6 py-3 border border-foreground text-foreground font-medium transition-all duration-200 hover:bg-foreground hover:text-background active:scale-95"
                      >
                        Request Specifications
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
