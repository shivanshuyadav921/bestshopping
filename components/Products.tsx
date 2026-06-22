/* PREMA ENGINEERING WORKS — Products Section */
/* Design: Asymmetric layout, component-focused, 60/40 image-to-text splits */
/* Components as Heroes: Museum-quality product photography */
/* Technical Specifications: Minimal cards with material, tolerance, finish */

interface ProductItem {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  specs: {
    material: string;
    tolerance: string;
    finish: string;
    application: string;
  };
}

const products: ProductItem[] = [
  {
    id: 'precision-shaft',
    name: 'Precision Shafts',
    category: 'Core Components',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-precision-shaft-afLEzfKBTeUbtfU3VXX3Ew.webp',
    description:
      'Mirror-polished precision shafts engineered to exact tolerances. Critical components for machinery that cannot afford downtime.',
    specs: {
      material: 'EN8, EN9, Alloy Steel',
      tolerance: '±0.01mm',
      finish: 'Mirror Polish / Hard Chrome',
      application: 'Bottle Lines, Packaging Machinery',
    },
  },
  {
    id: 'custom-gears',
    name: 'Custom Gears',
    category: 'Engineered Components',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-gear-emX9sdCbvN2e9HXAutXBu5.webp',
    description:
      'Precision-engineered gears with exact tooth geometry. Manufactured to your specifications for seamless integration.',
    specs: {
      material: '20CrMnTi, 18CrNiMo7-6',
      tolerance: '±0.02mm',
      finish: 'Shot Peened / Hardened',
      application: 'Drive Systems, Transmission',
    },
  },
  {
    id: 'guide-rails',
    name: 'Guide Rails',
    category: 'Linear Motion',
    image:
      'https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-guide-rail-9bhRiEc6BSaCBaWhvEo9CK.webp',
    description:
      'Precision-ground guide rails for smooth, accurate linear motion. Engineered for zero-downtime production lines.',
    specs: {
      material: 'EN9, Stainless Steel 316',
      tolerance: '±0.005mm',
      finish: 'Precision Ground',
      application: 'Automation, CNC Machinery',
    },
  },
];

export default function Products() {
  return (
    <section id="products" className="py-24 md:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Manufactured Excellence
          </h2>
          <p className="text-lg text-foreground/70">
            Every component is engineered for precision, reliability, and performance. Real manufacturing output, not stock imagery.
          </p>
        </div>

        {/* Products Grid */}
        <div className="space-y-20 md:space-y-32">
          {products.map((product, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={product.id}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${
                  isReversed ? 'md:grid-flow-dense' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`relative aspect-square md:aspect-auto ${
                    isReversed ? 'md:order-2' : ''
                  }`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover shadow-2xl"
                  />
                  <div className="absolute inset-0 border border-border/50" />
                </div>

                {/* Content */}
                <div className={`${isReversed ? 'md:order-1' : ''}`}>
                  <div className="space-y-6">
                    {/* Category Badge */}
                    <div className="inline-block">
                      <span className="text-xs font-semibold tracking-widest text-accent uppercase">
                        {product.category}
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-base md:text-lg text-foreground/70 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Specifications */}
                    <div className="space-y-3 pt-4">
                      <h4 className="text-sm font-semibold tracking-widest text-foreground/60 uppercase">
                        Specifications
                      </h4>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="space-y-1">
                            <p className="text-xs font-medium text-foreground/50 uppercase tracking-wide">
                              {key}
                            </p>
                            <p className="text-sm font-medium text-foreground">{value}</p>
                          </div>
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
