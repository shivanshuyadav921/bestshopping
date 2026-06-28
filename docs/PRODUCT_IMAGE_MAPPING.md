# PREMA Engineering — Product Image Metadata & Category Mapping

> Auto-generated mapping of all product components to their categories, image sources,
> and professional file naming conventions. No code changes — metadata reference only.

---

## Summary

| Metric | Count |
|--------|-------|
| **Total Categories** | 16 |
| **Total Products** | 30 (components-data) + 3 (exhibits) = **33** |
| **CDN-hosted Images** | 3 (CloudFront) |
| **Placeholder Images** | 30 (placehold.co — to be replaced) |
| **Unique Image Labels** | 30 |

---

## A. External CDN Product Images (lib/products.ts)

These are real product photographs hosted on CloudFront.

| # | Exhibit ID | Product Name | Category | Image URL | Recommended Local Path |
|---|-----------|-------------|----------|-----------|----------------------|
| 1 | `precision-shaft` | Mirror-Polished Precision Shafts | Shafts | `component-precision-shaft.webp` | `public/images/products/shafts/precision-shaft-hero.webp` |
| 2 | `custom-gear` | Precision-Engineered Custom Gears | Gears | `component-gear.webp` | `public/images/products/gears/precision-gear-hero.webp` |
| 3 | `guide-rail` | Precision-Ground Guide Rails | Rails | `component-guide-rail.webp` | `public/images/products/rails/guide-rail-hero.webp` |

---

## B. Component Product Catalog (lib/components-data.ts)

All 30 products currently use `placehold.co` placeholder URLs. Below is the complete mapping
of each product to its category, image labels, and recommended local image paths.

### Category 1: Precision Shafts (`cat-precision-shafts`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `ps-001` | PE-PS-001 | Mirror-Polished Precision Shaft | 5 | `Precision Shaft — View front` | `public/images/products/precision-shafts/` |
| `ps-002` | PE-PS-002 | Ground & Threaded Precision Shaft | 4 | `Precision Shaft — View front` | `public/images/products/precision-shafts/` |

**Recommended filenames:**
```
public/images/products/precision-shafts/
├── mirror-polished-precision-shaft-front.webp
├── mirror-polished-precision-shaft-side.webp
├── mirror-polished-precision-shaft-top.webp
├── mirror-polished-precision-shaft-detail.webp
├── mirror-polished-precision-shaft-assembled.webp
├── ground-threaded-precision-shaft-front.webp
├── ground-threaded-precision-shaft-side.webp
├── ground-threaded-precision-shaft-top.webp
└── ground-threaded-precision-shaft-detail.webp
```

---

### Category 2: Gear Shafts (`cat-gear-shafts`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `gs-001` | PE-GS-001 | Precision Gear Shaft Assembly | 5 | `Gear Shaft — View front` | `public/images/products/gear-shafts/` |
| `gs-002` | PE-GS-002 | Spline-End Gear Shaft | 4 | `Gear Shaft — View front` | `public/images/products/gear-shafts/` |

**Recommended filenames:**
```
public/images/products/gear-shafts/
├── precision-gear-shaft-assembly-front.webp
├── precision-gear-shaft-assembly-side.webp
├── precision-gear-shaft-assembly-top.webp
├── precision-gear-shaft-assembly-detail.webp
├── precision-gear-shaft-assembly-assembled.webp
├── spline-end-gear-shaft-front.webp
├── spline-end-gear-shaft-side.webp
├── spline-end-gear-shaft-top.webp
└── spline-end-gear-shaft-detail.webp
```

---

### Category 3: Spur Gears (`cat-spur-gears`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `sg-001` | PE-SG-001 | Precision Spur Gear | 5 | `Spur Gear — View front` | `public/images/products/spur-gears/` |
| `sg-002` | PE-SG-002 | Stainless Steel Spur Gear | 4 | `Spur Gear — View front` | `public/images/products/spur-gears/` |

**Recommended filenames:**
```
public/images/products/spur-gears/
├── precision-spur-gear-front.webp
├── precision-spur-gear-side.webp
├── precision-spur-gear-top.webp
├── precision-spur-gear-detail.webp
├── precision-spur-gear-assembled.webp
├── stainless-steel-spur-gear-front.webp
├── stainless-steel-spur-gear-side.webp
├── stainless-steel-spur-gear-top.webp
└── stainless-steel-spur-gear-detail.webp
```

---

### Category 4: Helical Gears (`cat-helical-gears`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `hg-001` | PE-HG-001 | Precision Helical Gear | 5 | `Helical Gear — View front` | `public/images/products/helical-gears/` |
| `hg-002` | PE-HG-002 | Double Helical Gear | 4 | `Helical Gear — View front` | `public/images/products/helical-gears/` |

**Recommended filenames:**
```
public/images/products/helical-gears/
├── precision-helical-gear-front.webp
├── precision-helical-gear-side.webp
├── precision-helical-gear-top.webp
├── precision-helical-gear-detail.webp
├── precision-helical-gear-assembled.webp
├── double-helical-gear-front.webp
├── double-helical-gear-side.webp
├── double-helical-gear-top.webp
└── double-helical-gear-detail.webp
```

---

### Category 5: Splined Shafts (`cat-splined-shafts`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `ss-001` | PE-SS-001 | Precision Splined Shaft | 5 | `Splined Shaft — View front` | `public/images/products/splined-shafts/` |
| `ss-002` | PE-SS-002 | Involute Splined Shaft | 4 | `Splined Shaft — View front` | `public/images/products/splined-shafts/` |

**Recommended filenames:**
```
public/images/products/splined-shafts/
├── precision-splined-shaft-front.webp
├── precision-splined-shaft-side.webp
├── precision-splined-shaft-top.webp
├── precision-splined-shaft-detail.webp
├── precision-splined-shaft-assembled.webp
├── involute-splined-shaft-front.webp
├── involute-splined-shaft-side.webp
├── involute-splined-shaft-top.webp
└── involute-splined-shaft-detail.webp
```

---

### Category 6: Threaded Components (`cat-threaded-components`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `tc-001` | PE-TC-001 | Precision Lead Screw | 5 | `Lead Screw — View front` | `public/images/products/threaded-components/` |
| `tc-002` | PE-TC-002 | Precision Threaded Stud | 4 | `Threaded Stud — View front` | `public/images/products/threaded-components/` |

**Recommended filenames:**
```
public/images/products/threaded-components/
├── precision-lead-screw-front.webp
├── precision-lead-screw-side.webp
├── precision-lead-screw-top.webp
├── precision-lead-screw-detail.webp
├── precision-lead-screw-assembled.webp
├── precision-threaded-stud-front.webp
├── precision-threaded-stud-side.webp
├── precision-threaded-stud-top.webp
└── precision-threaded-stud-detail.webp
```

---

### Category 7: Bushes & Sleeves (`cat-bushes-sleeves`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `bs-001` | PE-BS-001 | Precision Bronze Bush | 5 | `Bronze Bush — View front` | `public/images/products/bushes-sleeves/` |
| `bs-002` | PE-BS-002 | Precision Steel Sleeve | 4 | `Steel Sleeve — View front` | `public/images/products/bushes-sleeves/` |

**Recommended filenames:**
```
public/images/products/bushes-sleeves/
├── precision-bronze-bush-front.webp
├── precision-bronze-bush-side.webp
├── precision-bronze-bush-top.webp
├── precision-bronze-bush-detail.webp
├── precision-bronze-bush-assembled.webp
├── precision-steel-sleeve-front.webp
├── precision-steel-sleeve-side.webp
├── precision-steel-sleeve-top.webp
└── precision-steel-sleeve-detail.webp
```

---

### Category 8: Rollers (`cat-rollers`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `ro-001` | PE-RO-001 | Precision Ground Roller | 5 | `Roller — View front` | `public/images/products/rollers/` |
| `ro-002` | PE-RO-002 | Conveyor Roller Assembly | 4 | `Conveyor Roller — View front` | `public/images/products/rollers/` |

**Recommended filenames:**
```
public/images/products/rollers/
├── precision-ground-roller-front.webp
├── precision-ground-roller-side.webp
├── precision-ground-roller-top.webp
├── precision-ground-roller-detail.webp
├── precision-ground-roller-assembled.webp
├── conveyor-roller-assembly-front.webp
├── conveyor-roller-assembly-side.webp
├── conveyor-roller-assembly-top.webp
└── conveyor-roller-assembly-detail.webp
```

---

### Category 9: Pins (`cat-pins`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `pi-001` | PE-PI-001 | Precision Dowel Pin | 5 | `Dowel Pin — View front` | `public/images/products/pins/` |
| `pi-002` | PE-PI-002 | Spring Pin / Roll Pin | 4 | `Spring Pin — View front` | `public/images/products/pins/` |

**Recommended filenames:**
```
public/images/products/pins/
├── precision-dowel-pin-front.webp
├── precision-dowel-pin-side.webp
├── precision-dowel-pin-top.webp
├── precision-dowel-pin-detail.webp
├── precision-dowel-pin-assembled.webp
├── spring-pin-roll-pin-front.webp
├── spring-pin-roll-pin-side.webp
├── spring-pin-roll-pin-top.webp
└── spring-pin-roll-pin-detail.webp
```

---

### Category 10: Couplings (`cat-couplings`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `cp-001` | PE-CP-001 | Precision Jaw Coupling | 5 | `Jaw Coupling — View front` | `public/images/products/couplings/` |
| `cp-002` | PE-CP-002 | Precision Rigid Coupling | 4 | `Rigid Coupling — View front` | `public/images/products/couplings/` |

**Recommended filenames:**
```
public/images/products/couplings/
├── precision-jaw-coupling-front.webp
├── precision-jaw-coupling-side.webp
├── precision-jaw-coupling-top.webp
├── precision-jaw-coupling-detail.webp
├── precision-jaw-coupling-assembled.webp
├── precision-rigid-coupling-front.webp
├── precision-rigid-coupling-side.webp
├── precision-rigid-coupling-top.webp
└── precision-rigid-coupling-detail.webp
```

---

### Category 11: Fixtures (`cat-fixtures`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `fg-001` | PE-FG-001 | Precision Machine Vice | 5 | `Machine Vice — View front` | `public/images/products/fixtures/` |
| `fg-002` | PE-FG-002 | Custom Welding Fixture | 4 | `Welding Fixture — View front` | `public/images/products/fixtures/` |

**Recommended filenames:**
```
public/images/products/fixtures/
├── precision-machine-vice-front.webp
├── precision-machine-vice-side.webp
├── precision-machine-vice-top.webp
├── precision-machine-vice-detail.webp
├── precision-machine-vice-assembled.webp
├── custom-welding-fixture-front.webp
├── custom-welding-fixture-side.webp
├── custom-welding-fixture-top.webp
└── custom-welding-fixture-detail.webp
```

---

### Category 12: Jigs (`cat-jigs`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `jg-001` | PE-JG-001 | Precision Drilling Jig | 5 | `Drilling Jig — View front` | `public/images/products/jigs/` |
| `jg-002` | PE-JG-002 | Assembly Jig with Pneumatic Clamps | 4 | `Assembly Jig — View front` | `public/images/products/jigs/` |

**Recommended filenames:**
```
public/images/products/jigs/
├── precision-drilling-jig-front.webp
├── precision-drilling-jig-side.webp
├── precision-drilling-jig-top.webp
├── precision-drilling-jig-detail.webp
├── precision-drilling-jig-assembled.webp
├── assembly-jig-pneumatic-front.webp
├── assembly-jig-pneumatic-side.webp
├── assembly-jig-pneumatic-top.webp
└── assembly-jig-pneumatic-detail.webp
```

---

### Category 13: Machine Components (`cat-machine-components`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `mc-001` | PE-MC-001 | CNC Machine Bearing Housing | 5 | `Bearing Housing — View front` | `public/images/products/machine-components/` |
| `mc-002` | PE-MC-002 | Precision Machine Slide | 4 | `Machine Slide — View front` | `public/images/products/machine-components/` |

**Recommended filenames:**
```
public/images/products/machine-components/
├── cnc-machine-bearing-housing-front.webp
├── cnc-machine-bearing-housing-side.webp
├── cnc-machine-bearing-housing-top.webp
├── cnc-machine-bearing-housing-detail.webp
├── cnc-machine-bearing-housing-assembled.webp
├── precision-machine-slide-front.webp
├── precision-machine-slide-side.webp
├── precision-machine-slide-top.webp
└── precision-machine-slide-detail.webp
```

---

### Category 14: Precision Turned Parts (`cat-precision-turned-parts`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `pt-001` | PE-PT-001 | CNC Precision Turned Fitting | 5 | `Turned Fitting — View front` | `public/images/products/precision-turned-parts/` |
| `pt-002` | PE-PT-002 | Precision Turned Shaft Collar | 4 | `Shaft Collar — View front` | `public/images/products/precision-turned-parts/` |

**Recommended filenames:**
```
public/images/products/precision-turned-parts/
├── cnc-precision-turned-fitting-front.webp
├── cnc-precision-turned-fitting-side.webp
├── cnc-precision-turned-fitting-top.webp
├── cnc-precision-turned-fitting-detail.webp
├── cnc-precision-turned-fitting-assembled.webp
├── precision-turned-shaft-collar-front.webp
├── precision-turned-shaft-collar-side.webp
├── precision-turned-shaft-collar-top.webp
└── precision-turned-shaft-collar-detail.webp
```

---

### Category 15: CNC Milled Parts (`cat-cnc-milled-parts`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `cm-001` | PE-CM-001 | 5-Axis CNC Milled Component | 5 | `CNC Milled Part — View front` | `public/images/products/cnc-milled-parts/` |
| `cm-002` | PE-CM-002 | 3-Axis CNC Milled Plate | 4 | `Milled Plate — View front` | `public/images/products/cnc-milled-parts/` |

**Recommended filenames:**
```
public/images/products/cnc-milled-parts/
├── 5-axis-cnc-milled-component-front.webp
├── 5-axis-cnc-milled-component-side.webp
├── 5-axis-cnc-milled-component-top.webp
├── 5-axis-cnc-milled-component-detail.webp
├── 5-axis-cnc-milled-component-assembled.webp
├── 3-axis-cnc-milled-plate-front.webp
├── 3-axis-cnc-milled-plate-side.webp
├── 3-axis-cnc-milled-plate-top.webp
└── 3-axis-cnc-milled-plate-detail.webp
```

---

### Category 16: Custom Engineering Components (`cat-custom-engineering`)

| Product ID | Part Number | Product Name | Image Count | Primary Image Label | Recommended Folder |
|-----------|-------------|-------------|-------------|--------------------|--------------------|
| `ce-001` | PE-CE-001 | Custom Precision Assembly | 5 | `Custom Assembly — View front` | `public/images/products/custom-engineering/` |
| `ce-002` | PE-CE-002 | Bespoke Gearbox Assembly | 4 | `Gearbox Assembly — View front` | `public/images/products/custom-engineering/` |

**Recommended filenames:**
```
public/images/products/custom-engineering/
├── custom-precision-assembly-front.webp
├── custom-precision-assembly-side.webp
├── custom-precision-assembly-top.webp
├── custom-precision-assembly-detail.webp
├── custom-precision-assembly-assembled.webp
├── bespoke-gearbox-assembly-front.webp
├── bespoke-gearbox-assembly-side.webp
├── bespoke-gearbox-assembly-top.webp
└── bespoke-gearbox-assembly-detail.webp
```

---

## C. Image Angle Convention

Every product uses up to 5 standardized angles:

| Angle | Description | Typical Use |
|-------|-------------|-------------|
| `front` | Primary face / hero shot | Thumbnail, product card, listing |
| `side` | Profile / cross-section view | Dimensional reference |
| `top` | Plan view from above | Layout / assembly context |
| `detail` | Close-up of critical feature | Surface finish, tolerance showcase |
| `assembled` | Installed / in-use context | Application reference |

---

## D. Recommended Folder Structure

```
public/images/products/
├── precision-shafts/          (2 products, 9 images)
├── gear-shafts/               (2 products, 9 images)
├── spur-gears/                (2 products, 9 images)
├── helical-gears/             (2 products, 9 images)
├── splined-shafts/            (2 products, 9 images)
├── threaded-components/       (2 products, 9 images)
├── bushes-sleeves/            (2 products, 9 images)
├── rollers/                   (2 products, 9 images)
├── pins/                      (2 products, 9 images)
├── couplings/                 (2 products, 9 images)
├── fixtures/                  (2 products, 9 images)
├── jigs/                      (2 products, 9 images)
├── machine-components/        (2 products, 9 images)
├── precision-turned-parts/    (2 products, 9 images)
├── cnc-milled-parts/          (2 products, 9 images)
├── custom-engineering/        (2 products, 9 images)
├── exhibit-shafts/            (1 product, 1 CDN image)
├── exhibit-gears/             (1 product, 1 CDN image)
└── exhibit-rails/             (1 product, 1 CDN image)

Total: 19 folders, 148 expected images
```

---

## E. Naming Convention Rules

1. **Format**: `{product-slug}-{angle}.webp`
2. **Case**: All lowercase with hyphens (kebab-case)
3. **Extension**: `.webp` preferred (smaller size, modern browsers)
4. **Fallback**: `.jpg` for older browser support
5. **Hero images**: Use `{product-slug}-hero.webp` instead of `-front.webp` for CDN exhibit products
6. **Thumbnails**: Use `{product-slug}-thumb.webp` (400×300) for listing cards
7. **Max dimensions**: 1200×900px for hero, 800×600px for gallery, 400×300px for thumbnails

---

## F. Source-to-Target Mapping (Quick Reference)

| Source (Current) | Target (Recommended) |
|-------------------|---------------------|
| `placehold.co/800x600/1a1a2e/e94560?text=Precision+Shaft+1` | `public/images/products/precision-shafts/mirror-polished-precision-shaft-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Gear+Shaft+1` | `public/images/products/gear-shafts/precision-gear-shaft-assembly-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Spur+Gear+1` | `public/images/products/spur-gears/precision-spur-gear-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Helical+Gear+1` | `public/images/products/helical-gears/precision-helical-gear-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Splined+Shaft+1` | `public/images/products/splined-shafts/precision-splined-shaft-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Lead+Screw+1` | `public/images/products/threaded-components/precision-lead-screw-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Bronze+Bush+1` | `public/images/products/bushes-sleeves/precision-bronze-bush-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Roller+1` | `public/images/products/rollers/precision-ground-roller-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Dowel+Pin+1` | `public/images/products/pins/precision-dowel-pin-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Jaw+Coupling+1` | `public/images/products/couplings/precision-jaw-coupling-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Machine+Vice+1` | `public/images/products/fixtures/precision-machine-vice-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Drilling+Jig+1` | `public/images/products/jigs/precision-drilling-jig-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Bearing+Housing+1` | `public/images/products/machine-components/cnc-machine-bearing-housing-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Turned+Fitting+1` | `public/images/products/precision-turned-parts/cnc-precision-turned-fitting-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=CNC+Milled+Part+1` | `public/images/products/cnc-milled-parts/5-axis-cnc-milled-component-front.webp` |
| `placehold.co/800x600/1a1a2e/e94560?text=Custom+Assembly+1` | `public/images/products/custom-engineering/custom-precision-assembly-front.webp` |

---

## G. Industry Tag Matrix

| Category | Primary Industries |
|----------|-------------------|
| Precision Shafts | Automotive, Heavy Engineering, Automation, Packaging |
| Gear Shafts | Automotive, Mining, Heavy Engineering, Power Plants |
| Spur Gears | Heavy Engineering, Food Processing, Mining, Packaging |
| Helical Gears | Heavy Engineering, Power Plants, Automotive |
| Splined Shafts | Automotive, Heavy Engineering, Automation |
| Threaded Components | Automation, Packaging, Textile, Heavy Engineering |
| Bushes & Sleeves | Heavy Engineering, Mining, Automation, Packaging |
| Rollers | Textile, Packaging, Printing, Automation, Food Processing, Mining |
| Pins | Automotive, Automation, Heavy Engineering, Packaging |
| Couplings | Automation, Packaging, Textile, Heavy Engineering |
| Fixtures | Automotive, Heavy Engineering |
| Jigs | Automotive, Heavy Engineering, Packaging |
| Machine Components | Heavy Engineering, Automation, Automotive |
| Precision Turned Parts | Pharmaceutical, Automotive, Packaging |
| CNC Milled Parts | Automotive, Oil & Gas, Pharmaceutical, Automation |
| Custom Engineering | Automotive, Oil & Gas, Pharmaceutical, Heavy Engineering, Mining, Power Plants |