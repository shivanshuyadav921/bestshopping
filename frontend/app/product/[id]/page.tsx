/* PREMA ENGINEERING WORKS — Product Museum Exhibit */
/* Museum-quality presentation with 3D viewer, specs, and manufacturing details */

'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { getProductById, ProductExhibit } from '@/lib/products';
import { ChevronLeft } from 'lucide-react';

const ProductViewer3D = dynamic(() => import('@/components/ProductViewer3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-black/50 text-foreground/50">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full" />
        <span className="text-xs uppercase tracking-widest font-mono">Initializing 3D Canvas...</span>
      </div>
    </div>
  ),
});

const ExplodedAssembly = dynamic(() => import('@/components/ExplodedAssembly'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center bg-black/20 rounded-lg border border-border">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin w-6 h-6 border-2 border-neutral-400 border-t-transparent rounded-full" />
        <span className="text-xs font-mono text-neutral-400">Loading Assembly Coordinates...</span>
      </div>
    </div>
  ),
});

export default function ProductExhibitPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const prefersReducedMotion = useReducedMotion();

  const transition = prefersReducedMotion ? { duration: 0.01 } : { duration: 0.8 };
  const initialY = prefersReducedMotion ? 0 : 20;
  const initialX = prefersReducedMotion ? 0 : 20;

  const [activeTab, setActiveTab] = useState<'specs' | 'materials' | 'process' | 'applications'>('specs');
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto" />
          <p className="text-foreground/70">Loading exhibit...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/products')}
            className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Museum
          </button>
          <h1 className="text-lg font-semibold tracking-tight">{product.name}</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="container py-16 space-y-24">
        {/* Hero Section with 3D Viewer */}
        <motion.section
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: initialY }}
          animate={{ opacity: 1, y: 0 }}
          transition={transition}
        >
          {/* 3D Viewer */}
          <div className="aspect-square rounded-lg overflow-hidden bg-black">
            <ProductViewer3D
              imageUrl={product.modelImage}
              productName={product.name}
              lightingStyle={product.lightingStyle}
            />
          </div>

          {/* Product Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: initialX }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : 0.2, duration: prefersReducedMotion ? 0.01 : 0.8 }}
          >
            {/* Category badge */}
            <div className="inline-block">
              <span className="px-4 py-2 bg-accent/10 text-accent text-sm font-medium rounded-full">
                {product.category}
              </span>
            </div>

            {/* Title and tagline */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight leading-tight">{product.name}</h1>
              <p className="text-xl text-foreground/70 leading-relaxed">{product.tagline}</p>
            </div>

            {/* Description */}
            <p className="text-lg text-foreground/60 leading-relaxed">{product.description}</p>

            {/* CTA */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => {
                  const element = document.getElementById('rfq');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                  else router.push('/#rfq');
                }}
                className="px-8 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors rounded-sm"
              >
                Request Quote
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className="px-8 py-3 border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-colors rounded-sm"
              >
                View Specifications
              </button>
            </div>
          </motion.div>
        </motion.section>

        {/* Specifications Section */}
        <motion.section
          className="space-y-8"
          initial={{ opacity: 0, y: initialY }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight">Technical Specifications</h2>
            <p className="text-foreground/60">Engineered precision in every dimension</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {product.specifications.map((spec, idx) => (
              <motion.div
                key={idx}
                className="bg-card rounded-lg p-6 border border-border"
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: prefersReducedMotion ? 0 : idx * 0.05, duration: prefersReducedMotion ? 0.01 : 0.6 }}
                viewport={{ once: true }}
              >
                <p className="text-sm text-foreground/60 uppercase tracking-wide mb-2">{spec.label}</p>
                <p className="text-lg font-semibold text-foreground">{spec.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Exploded Assembly Section */}
        <motion.section
          className="space-y-8"
          initial={{ opacity: 0, y: initialY }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="space-y-2">
            <h2 className="text-4xl font-bold tracking-tight">Component Assembly</h2>
            <p className="text-foreground/60">Understand the precision engineering in every detail</p>
          </div>
          <ExplodedAssembly productName={product.name} parts={product.assemblyParts} />
        </motion.section>

        {/* Tabbed Content */}
        <motion.section
          className="space-y-8"
          initial={{ opacity: 0, y: initialY }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-border" role="tablist" aria-label="Product specifications tabs">
            {(['specs', 'materials', 'process', 'applications'] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                aria-controls={`detail-panel-${tab}`}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-medium text-sm uppercase tracking-wide transition-colors relative focus:outline-none focus:text-accent focus:border-accent ${
                  activeTab === tab
                    ? 'text-foreground'
                    : 'text-foreground/60 hover:text-foreground/80'
                }`}
              >
                {tab === 'specs' && 'Specifications'}
                {tab === 'materials' && 'Materials'}
                {tab === 'process' && 'Manufacturing'}
                {tab === 'applications' && 'Applications'}
                {activeTab === tab && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    layoutId="activeTab"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            id={`detail-panel-${activeTab}`}
            role="tabpanel"
            aria-label={`${activeTab} detail panel`}
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.4 }}
            className="space-y-6"
          >
            {activeTab === 'materials' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.materials.map((material, idx) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-2xl font-bold">{material.name}</h3>
                    <ul className="space-y-2">
                      {material.properties.map((prop, pidx) => (
                        <li key={pidx} className="flex items-start gap-3">
                          <span className="text-accent mt-1">✓</span>
                          <span className="text-foreground/80">{prop}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-6">
                {product.manufacturingProcess.map((step, idx) => (
                  <motion.div
                    key={idx}
                    className="flex gap-6 pb-6 border-b border-border last:border-0"
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : idx * 0.1 }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-grow space-y-2">
                      <h4 className="text-lg font-semibold">{step.process}</h4>
                      <p className="text-foreground/70">{step.description}</p>
                      {step.duration && (
                        <p className="text-sm text-foreground/60">Duration: {step.duration}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {product.applications.map((app, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-card rounded-lg p-8 border border-border space-y-4"
                    initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : idx * 0.1 }}
                  >
                    <div className="text-4xl">{app.icon}</div>
                    <h4 className="text-xl font-bold">{app.industry}</h4>
                    <p className="text-foreground/70">{app.useCase}</p>
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm text-accent font-medium">Benefit: {app.benefit}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="bg-foreground/5 rounded-lg p-12 text-center space-y-6"
          initial={{ opacity: 0, y: initialY }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={transition}
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="text-3xl font-bold">Ready to Integrate This Component?</h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Contact our engineering team to discuss your specific requirements and get a custom quote.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <button
              onClick={() => {
                const element = document.getElementById('rfq');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                else router.push('/#rfq');
              }}
              className="px-8 py-3 bg-accent text-white font-medium hover:bg-accent/90 transition-colors rounded-sm"
            >
              Request Quote
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
                else router.push('/#contact');
              }}
              className="px-8 py-3 border border-foreground/20 text-foreground font-medium hover:bg-foreground/5 transition-colors rounded-sm"
            >
              Contact Sales
            </button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
