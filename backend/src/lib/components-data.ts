"use client";

import { ProductCategory, ProductComponent, ProductSearchResult } from "../types/components";

export const COMPONENT_CATEGORIES: ProductCategory[] = [
  {
    "id": "cat-precision-shafts",
    "slug": "precision-shafts",
    "name": "Precision Shafts",
    "description": "Precision-ground shafts with tight dimensional tolerances.",
    "shortDescription": "Precision rotational shafts",
    "heroImage": "/images/products/precision-shafts/shaft-01.png",
    "icon": "🔩",
    "productCount": 6,
    "displayOrder": 1
  },
  {
    "id": "cat-gear-shafts",
    "slug": "gear-shafts",
    "name": "Gear Shafts",
    "description": "Integrated gear and spline shafts for power transmission.",
    "shortDescription": "Power transmission gear shafts",
    "heroImage": "/images/products/gear-shafts/gear-shaft-01.png",
    "icon": "⚙️",
    "productCount": 2,
    "displayOrder": 2
  },
  {
    "id": "cat-spur-gears",
    "slug": "spur-gears",
    "name": "Spur Gears",
    "description": "High-torque precision spur gears with optimized teeth profiles.",
    "shortDescription": "High-torque spur gears",
    "heroImage": "/images/products/gears/gear-01.png",
    "icon": "⚙️",
    "productCount": 3,
    "displayOrder": 3
  },
  {
    "id": "cat-helical-gears",
    "slug": "helical-gears",
    "name": "Helical Gears",
    "description": "Helical gears cut at an angle for smooth and silent operations.",
    "shortDescription": "Smooth helical gears",
    "heroImage": "/images/products/gears/gear-02.png",
    "icon": "⚙️",
    "productCount": 1,
    "displayOrder": 4
  },
  {
    "id": "cat-splined-shafts",
    "slug": "splined-shafts",
    "name": "Splined Shafts",
    "description": "Splined rotational shafts for high torque coupling.",
    "shortDescription": "Torque-coupling splined shafts",
    "heroImage": "/images/products/precision-shafts/shaft-03.png",
    "icon": "🔩",
    "productCount": 2,
    "displayOrder": 5
  },
  {
    "id": "cat-threaded-components",
    "slug": "threaded-components",
    "name": "Threaded Components",
    "description": "Precision lead screws, nuts, and custom threaded studs.",
    "shortDescription": "Threaded components",
    "heroImage": "/images/products/threaded-components/threaded-01.png",
    "icon": "🔩",
    "productCount": 2,
    "displayOrder": 6
  },
  {
    "id": "cat-bushes-sleeves",
    "slug": "bushes-sleeves",
    "name": "Bushes & Sleeves",
    "description": "Precision bronze bushes and steel sleeves for sliding fit.",
    "shortDescription": "Sliding bushes and sleeves",
    "heroImage": "/images/products/bushes/bush-01.png",
    "icon": "🛢️",
    "productCount": 2,
    "displayOrder": 7
  },
  {
    "id": "cat-rollers",
    "slug": "rollers",
    "name": "Rollers",
    "description": "Precision ground conveyor and drive rollers.",
    "shortDescription": "Industrial rollers",
    "heroImage": "/images/products/rollers/roller-01.jpg",
    "icon": "🔄",
    "productCount": 2,
    "displayOrder": 8
  },
  {
    "id": "cat-pins",
    "slug": "pins",
    "name": "Pins",
    "description": "Precision dowel pins, taper pins, and roll pins.",
    "shortDescription": "Precision pins",
    "heroImage": "/images/products/pins/pin-01.png",
    "icon": "📍",
    "productCount": 2,
    "displayOrder": 9
  },
  {
    "id": "cat-couplings",
    "slug": "couplings",
    "name": "Couplings",
    "description": "Flexible jaw couplings and rigid couplings for shaft connections.",
    "shortDescription": "Flexible and rigid couplings",
    "heroImage": "/images/products/couplings/coupling-01.png",
    "icon": "🔗",
    "productCount": 2,
    "displayOrder": 10
  },
  {
    "id": "cat-fixtures",
    "slug": "fixtures",
    "name": "Fixtures",
    "description": "Machine vices, hydraulic clamps, and custom workholding fixtures.",
    "shortDescription": "Workholding fixtures",
    "heroImage": "/images/products/fixtures/fixture-01.png",
    "icon": "🗜️",
    "productCount": 2,
    "displayOrder": 11
  },
  {
    "id": "cat-jigs",
    "slug": "jigs",
    "name": "Jigs",
    "description": "Precision drilling, boring, and assembly alignment jigs.",
    "shortDescription": "Alignment jigs",
    "heroImage": "/images/products/jigs/jig-01.jpg",
    "icon": "📐",
    "productCount": 2,
    "displayOrder": 12
  },
  {
    "id": "cat-machine-components",
    "slug": "machine-components",
    "name": "Machine Components",
    "description": "Bearing housings, machine slides, and guide rails.",
    "shortDescription": "Slide rails and components",
    "heroImage": "/images/products/machine-components/machine-comp-01.jpg",
    "icon": "🛠️",
    "productCount": 3,
    "displayOrder": 13
  },
  {
    "id": "cat-precision-turned-parts",
    "slug": "precision-turned-parts",
    "name": "Precision Turned Parts",
    "description": "CNC precision turned components, collars, and fittings.",
    "shortDescription": "CNC turned parts",
    "heroImage": "/images/products/cnc-parts/cnc-part-01.png",
    "icon": "🔩",
    "productCount": 2,
    "displayOrder": 14
  },
  {
    "id": "cat-cnc-milled-parts",
    "slug": "cnc-milled-parts",
    "name": "CNC Milled Parts",
    "description": "5-axis milled components and precision plate millings.",
    "shortDescription": "CNC milled parts",
    "heroImage": "/images/products/custom-precision-components/custom-comp-01.png",
    "icon": "⚙️",
    "productCount": 2,
    "displayOrder": 15
  },
  {
    "id": "cat-custom-engineering",
    "slug": "custom-engineering",
    "name": "Custom Engineering Components",
    "description": "Bespoke assemblies, customized gearboxes, and engineering systems.",
    "shortDescription": "Custom engineering solutions",
    "heroImage": "/images/products/gallery/gallery-01.png",
    "icon": "🔧",
    "productCount": 2,
    "displayOrder": 16
  }
];

export const COMPONENT_PRODUCTS: ProductComponent[] = [
  {
    "id": "precision-shaft",
    "name": "Mirror-Polished Precision Shafts",
    "slug": "precision-shaft",
    "partNumber": "PE-SHAFT-001",
    "categoryId": "cat-precision-shafts",
    "categorySlug": "precision-shafts",
    "categoryName": "Precision Shafts",
    "tagline": "Engineered to exact tolerances. Zero compromise on precision.",
    "description": "Precision shafts manufactured to ±0.005mm tolerances with mirror-polished surfaces. Used in critical machinery where downtime is not an option.",
    "shortDescription": "Mirror-polished precision shafts with ±0.005mm tolerance.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-precision-shaft-1",
        "url": "https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-precision-shaft.webp",
        "alt": "Mirror-Polished Precision Shafts",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-precision-shaft.webp",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.005mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.005mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-precision-shaft-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ce-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "precision-shafts"
    ],
    "isActive": true,
    "displayOrder": 1,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "custom-gear",
    "name": "Custom Spur & Helical Gears",
    "slug": "custom-gear",
    "partNumber": "PE-GEAR-102",
    "categoryId": "cat-spur-gears",
    "categorySlug": "spur-gears",
    "categoryName": "Spur Gears",
    "tagline": "High-torque transmission with low backlash.",
    "description": "Custom spur and helical gears cut from premium alloy steels. Engineered for maximum load capacity and quiet operation in high-performance drivetrains.",
    "shortDescription": "Custom precision spur and helical gears.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-custom-gear-1",
        "url": "https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-custom-gear.webp",
        "alt": "Custom Spur & Helical Gears",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-custom-gear.webp",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-custom-gear-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "precision-shaft"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "spur-gears"
    ],
    "isActive": true,
    "displayOrder": 2,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "guide-rail",
    "name": "Hardened Linear Guide Rails",
    "slug": "guide-rail",
    "partNumber": "PE-RAIL-205",
    "categoryId": "cat-machine-components",
    "categorySlug": "machine-components",
    "categoryName": "Machine Components",
    "tagline": "Ultra-smooth linear translation. Heavy load capacities.",
    "description": "Hardened and ground linear guide rails for automated systems, CNC machinery, and high-precision positioning tables.",
    "shortDescription": "Hardened and ground linear guide rails.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-guide-rail-1",
        "url": "https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-guide-rail.webp",
        "alt": "Hardened Linear Guide Rails",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-guide-rail.webp",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-guide-rail-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "custom-gear"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "machine-components"
    ],
    "isActive": true,
    "displayOrder": 3,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ps-001",
    "name": "Mirror-Polished Shaft A1",
    "slug": "ps-001",
    "partNumber": "PE-PS-001",
    "categoryId": "cat-precision-shafts",
    "categorySlug": "precision-shafts",
    "categoryName": "Precision Shafts",
    "tagline": "Mirror-finished precision shafting.",
    "description": "Premium Mirror-Polished Shaft A1 engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Mirror-Polished Shaft A1 with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-ps-001-1",
        "url": "/images/products/precision-shafts/shaft-01.png",
        "alt": "Mirror-Polished Shaft A1",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/precision-shafts/shaft-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.005mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.005mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ps-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "guide-rail"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "precision-shafts"
    ],
    "isActive": true,
    "displayOrder": 4,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ps-002",
    "name": "Mirror-Polished Shaft A2",
    "slug": "ps-002",
    "partNumber": "PE-PS-002",
    "categoryId": "cat-precision-shafts",
    "categorySlug": "precision-shafts",
    "categoryName": "Precision Shafts",
    "tagline": "Cylindrical ground indexing shaft.",
    "description": "Premium Mirror-Polished Shaft A2 engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Mirror-Polished Shaft A2 with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-ps-002-1",
        "url": "/images/products/precision-shafts/shaft-02.png",
        "alt": "Mirror-Polished Shaft A2",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/precision-shafts/shaft-02.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.005mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.005mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ps-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ps-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "precision-shafts"
    ],
    "isActive": true,
    "displayOrder": 5,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ps-003",
    "name": "Mirror-Polished Shaft A3",
    "slug": "ps-003",
    "partNumber": "PE-PS-003",
    "categoryId": "cat-precision-shafts",
    "categorySlug": "precision-shafts",
    "categoryName": "Precision Shafts",
    "tagline": "Flanged precision shaft assembly.",
    "description": "Premium Mirror-Polished Shaft A3 engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Mirror-Polished Shaft A3 with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-ps-003-1",
        "url": "/images/products/precision-shafts/shaft-03.png",
        "alt": "Mirror-Polished Shaft A3",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/precision-shafts/shaft-03.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.005mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.005mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ps-003-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ps-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "precision-shafts"
    ],
    "isActive": true,
    "displayOrder": 6,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ps-004",
    "name": "Mirror-Polished Shaft A4",
    "slug": "ps-004",
    "partNumber": "PE-PS-004",
    "categoryId": "cat-precision-shafts",
    "categorySlug": "precision-shafts",
    "categoryName": "Precision Shafts",
    "tagline": "Precision shaft with keyway slot.",
    "description": "Premium Mirror-Polished Shaft A4 engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Mirror-Polished Shaft A4 with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-ps-004-1",
        "url": "/images/products/precision-shafts/shaft-04.png",
        "alt": "Mirror-Polished Shaft A4",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/precision-shafts/shaft-04.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.005mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.005mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ps-004-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ps-003"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "precision-shafts"
    ],
    "isActive": true,
    "displayOrder": 7,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ps-005",
    "name": "Mirror-Polished Shaft A5",
    "slug": "ps-005",
    "partNumber": "PE-PS-005",
    "categoryId": "cat-precision-shafts",
    "categorySlug": "precision-shafts",
    "categoryName": "Precision Shafts",
    "tagline": "Heavy-duty machine drive shaft.",
    "description": "Premium Mirror-Polished Shaft A5 engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Mirror-Polished Shaft A5 with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-ps-005-1",
        "url": "/images/products/precision-shafts/shaft-05.png",
        "alt": "Mirror-Polished Shaft A5",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/precision-shafts/shaft-05.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.005mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.005mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ps-005-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ps-004"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "precision-shafts"
    ],
    "isActive": true,
    "displayOrder": 8,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "gs-001",
    "name": "Precision Gear Shaft Assembly",
    "slug": "gs-001",
    "partNumber": "PE-GS-001",
    "categoryId": "cat-gear-shafts",
    "categorySlug": "gear-shafts",
    "categoryName": "Gear Shafts",
    "tagline": "Integrated gear shaft transmission.",
    "description": "Premium Precision Gear Shaft Assembly engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Gear Shaft Assembly with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-gs-001-1",
        "url": "/images/products/gear-shafts/gear-shaft-01.png",
        "alt": "Precision Gear Shaft Assembly",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/gear-shafts/gear-shaft-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-gs-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ps-005"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "gear-shafts"
    ],
    "isActive": true,
    "displayOrder": 9,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "gs-002",
    "name": "Spline-End Gear Shaft",
    "slug": "gs-002",
    "partNumber": "PE-GS-002",
    "categoryId": "cat-gear-shafts",
    "categorySlug": "gear-shafts",
    "categoryName": "Gear Shafts",
    "tagline": "Splined end gear shaft collar.",
    "description": "Premium Spline-End Gear Shaft engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Spline-End Gear Shaft with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-gs-002-1",
        "url": "/images/products/gear-shafts/gear-shaft-02.png",
        "alt": "Spline-End Gear Shaft",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/gear-shafts/gear-shaft-02.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-gs-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "gs-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "gear-shafts"
    ],
    "isActive": true,
    "displayOrder": 10,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "sg-001",
    "name": "Precision Spur Gear",
    "slug": "sg-001",
    "partNumber": "PE-SG-001",
    "categoryId": "cat-spur-gears",
    "categorySlug": "spur-gears",
    "categoryName": "Spur Gears",
    "tagline": "Straight teeth precision spur gear.",
    "description": "Premium Precision Spur Gear engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Spur Gear with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-sg-001-1",
        "url": "/images/products/gears/gear-01.png",
        "alt": "Precision Spur Gear",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/gears/gear-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-sg-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "gs-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "spur-gears"
    ],
    "isActive": true,
    "displayOrder": 11,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "sg-002",
    "name": "Stainless Steel Spur Gear",
    "slug": "sg-002",
    "partNumber": "PE-SG-002",
    "categoryId": "cat-spur-gears",
    "categorySlug": "spur-gears",
    "categoryName": "Spur Gears",
    "tagline": "Corrosion-resistant steel gear.",
    "description": "Premium Stainless Steel Spur Gear engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Stainless Steel Spur Gear with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-sg-002-1",
        "url": "/images/products/gears/gear-02.png",
        "alt": "Stainless Steel Spur Gear",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/gears/gear-02.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-sg-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "sg-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "spur-gears"
    ],
    "isActive": true,
    "displayOrder": 12,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "hg-001",
    "name": "Precision Helical Gear",
    "slug": "hg-001",
    "partNumber": "PE-HG-001",
    "categoryId": "cat-helical-gears",
    "categorySlug": "helical-gears",
    "categoryName": "Helical Gears",
    "tagline": "Smooth running helical gear transmission.",
    "description": "Premium Precision Helical Gear engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Helical Gear with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-hg-001-1",
        "url": "/images/products/gears/gear-02.png",
        "alt": "Precision Helical Gear",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/gears/gear-02.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-hg-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "sg-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "helical-gears"
    ],
    "isActive": true,
    "displayOrder": 13,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ss-001",
    "name": "Precision Splined Shaft",
    "slug": "ss-001",
    "partNumber": "PE-SS-001",
    "categoryId": "cat-splined-shafts",
    "categorySlug": "splined-shafts",
    "categoryName": "Splined Shafts",
    "tagline": "High-torque splined shafting.",
    "description": "Premium Precision Splined Shaft engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Splined Shaft with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-ss-001-1",
        "url": "/images/products/precision-shafts/shaft-03.png",
        "alt": "Precision Splined Shaft",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/precision-shafts/shaft-03.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ss-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "hg-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "splined-shafts"
    ],
    "isActive": true,
    "displayOrder": 14,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ss-002",
    "name": "Involute Splined Shaft",
    "slug": "ss-002",
    "partNumber": "PE-SS-002",
    "categoryId": "cat-splined-shafts",
    "categorySlug": "splined-shafts",
    "categoryName": "Splined Shafts",
    "tagline": "CNC cut involute splined axle.",
    "description": "Premium Involute Splined Shaft engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Involute Splined Shaft with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-ss-002-1",
        "url": "/images/products/precision-shafts/shaft-04.png",
        "alt": "Involute Splined Shaft",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/precision-shafts/shaft-04.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ss-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ss-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "splined-shafts"
    ],
    "isActive": true,
    "displayOrder": 15,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "tc-001",
    "name": "Precision Lead Screw",
    "slug": "tc-001",
    "partNumber": "PE-TC-001",
    "categoryId": "cat-threaded-components",
    "categorySlug": "threaded-components",
    "categoryName": "Threaded Components",
    "tagline": "ACME thread lead screw.",
    "description": "Premium Precision Lead Screw engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Lead Screw with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-tc-001-1",
        "url": "/images/products/threaded-components/threaded-01.png",
        "alt": "Precision Lead Screw",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/threaded-components/threaded-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-tc-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ss-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "threaded-components"
    ],
    "isActive": true,
    "displayOrder": 16,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "tc-002",
    "name": "Precision Threaded Stud",
    "slug": "tc-002",
    "partNumber": "PE-TC-002",
    "categoryId": "cat-threaded-components",
    "categorySlug": "threaded-components",
    "categoryName": "Threaded Components",
    "tagline": "Threaded stud attachment component.",
    "description": "Premium Precision Threaded Stud engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Threaded Stud with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-tc-002-1",
        "url": "/images/products/threaded-components/threaded-02.png",
        "alt": "Precision Threaded Stud",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/threaded-components/threaded-02.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-tc-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "tc-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "threaded-components"
    ],
    "isActive": true,
    "displayOrder": 17,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "bs-001",
    "name": "Precision Bronze Bush",
    "slug": "bs-001",
    "partNumber": "PE-BS-001",
    "categoryId": "cat-bushes-sleeves",
    "categorySlug": "bushes-sleeves",
    "categoryName": "Bushes & Sleeves",
    "tagline": "Self-lubricating sleeve bronze bushing.",
    "description": "Premium Precision Bronze Bush engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Bronze Bush with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-bs-001-1",
        "url": "/images/products/bushes/bush-01.png",
        "alt": "Precision Bronze Bush",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/bushes/bush-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-bs-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "tc-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "bushes-sleeves"
    ],
    "isActive": true,
    "displayOrder": 18,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "bs-002",
    "name": "Precision Steel Sleeve",
    "slug": "bs-002",
    "partNumber": "PE-BS-002",
    "categoryId": "cat-bushes-sleeves",
    "categorySlug": "bushes-sleeves",
    "categoryName": "Bushes & Sleeves",
    "tagline": "Hardened steel alignment sleeve.",
    "description": "Premium Precision Steel Sleeve engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Steel Sleeve with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-bs-002-1",
        "url": "/images/products/sleeves/sleeve-01.png",
        "alt": "Precision Steel Sleeve",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/sleeves/sleeve-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-bs-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "bs-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "bushes-sleeves"
    ],
    "isActive": true,
    "displayOrder": 19,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ro-001",
    "name": "Precision Ground Roller",
    "slug": "ro-001",
    "partNumber": "PE-RO-001",
    "categoryId": "cat-rollers",
    "categorySlug": "rollers",
    "categoryName": "Rollers",
    "tagline": "Hardened steel cylindrical roller.",
    "description": "Premium Precision Ground Roller engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Ground Roller with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-ro-001-1",
        "url": "/images/products/rollers/roller-01.jpg",
        "alt": "Precision Ground Roller",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/rollers/roller-01.jpg",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ro-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "bs-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "rollers"
    ],
    "isActive": true,
    "displayOrder": 20,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ro-002",
    "name": "Conveyor Roller Assembly",
    "slug": "ro-002",
    "partNumber": "PE-RO-002",
    "categoryId": "cat-rollers",
    "categorySlug": "rollers",
    "categoryName": "Rollers",
    "tagline": "Conveyor drive roller system.",
    "description": "Premium Conveyor Roller Assembly engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Conveyor Roller Assembly with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-ro-002-1",
        "url": "/images/products/rollers/roller-02.jpg",
        "alt": "Conveyor Roller Assembly",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/rollers/roller-02.jpg",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ro-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ro-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "rollers"
    ],
    "isActive": true,
    "displayOrder": 21,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "pi-001",
    "name": "Precision Dowel Pin",
    "slug": "pi-001",
    "partNumber": "PE-PI-001",
    "categoryId": "cat-pins",
    "categorySlug": "pins",
    "categoryName": "Pins",
    "tagline": "Hardened steel dowel pin locator.",
    "description": "Premium Precision Dowel Pin engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Dowel Pin with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-pi-001-1",
        "url": "/images/products/pins/pin-01.png",
        "alt": "Precision Dowel Pin",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/pins/pin-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-pi-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ro-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "pins"
    ],
    "isActive": true,
    "displayOrder": 22,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "pi-002",
    "name": "Spring Pin / Roll Pin",
    "slug": "pi-002",
    "partNumber": "PE-PI-002",
    "categoryId": "cat-pins",
    "categorySlug": "pins",
    "categoryName": "Pins",
    "tagline": "Slotted spring steel roll pin.",
    "description": "Premium Spring Pin / Roll Pin engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Spring Pin / Roll Pin with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-pi-002-1",
        "url": "/images/products/pins/pin-02.jpg",
        "alt": "Spring Pin / Roll Pin",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/pins/pin-02.jpg",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-pi-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "pi-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "pins"
    ],
    "isActive": true,
    "displayOrder": 23,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "cp-001",
    "name": "Precision Jaw Coupling",
    "slug": "cp-001",
    "partNumber": "PE-CP-001",
    "categoryId": "cat-couplings",
    "categorySlug": "couplings",
    "categoryName": "Couplings",
    "tagline": "Jaw elastomeric coupling insert.",
    "description": "Premium Precision Jaw Coupling engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Jaw Coupling with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-cp-001-1",
        "url": "/images/products/couplings/coupling-01.png",
        "alt": "Precision Jaw Coupling",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/couplings/coupling-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-cp-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "pi-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "couplings"
    ],
    "isActive": true,
    "displayOrder": 24,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "cp-002",
    "name": "Precision Rigid Coupling",
    "slug": "cp-002",
    "partNumber": "PE-CP-002",
    "categoryId": "cat-couplings",
    "categorySlug": "couplings",
    "categoryName": "Couplings",
    "tagline": "Sleeve rigid power coupling.",
    "description": "Premium Precision Rigid Coupling engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Rigid Coupling with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-cp-002-1",
        "url": "/images/products/couplings/coupling-02.png",
        "alt": "Precision Rigid Coupling",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/couplings/coupling-02.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-cp-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "cp-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "couplings"
    ],
    "isActive": true,
    "displayOrder": 25,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "fg-001",
    "name": "Precision Machine Vice",
    "slug": "fg-001",
    "partNumber": "PE-FG-001",
    "categoryId": "cat-fixtures",
    "categorySlug": "fixtures",
    "categoryName": "Fixtures",
    "tagline": "CNC milling machine clamping vice.",
    "description": "Premium Precision Machine Vice engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Machine Vice with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-fg-001-1",
        "url": "/images/products/fixtures/fixture-01.png",
        "alt": "Precision Machine Vice",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/fixtures/fixture-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-fg-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "cp-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "fixtures"
    ],
    "isActive": true,
    "displayOrder": 26,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "fg-002",
    "name": "Custom Welding Fixture",
    "slug": "fg-002",
    "partNumber": "PE-FG-002",
    "categoryId": "cat-fixtures",
    "categorySlug": "fixtures",
    "categoryName": "Fixtures",
    "tagline": "Bespoke robotic welding jig clamp.",
    "description": "Premium Custom Welding Fixture engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Custom Welding Fixture with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-fg-002-1",
        "url": "/images/products/fixtures/fixture-01.png",
        "alt": "Custom Welding Fixture",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/fixtures/fixture-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-fg-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "fg-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "fixtures"
    ],
    "isActive": true,
    "displayOrder": 27,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "jg-001",
    "name": "Precision Drilling Jig",
    "slug": "jg-001",
    "partNumber": "PE-JG-001",
    "categoryId": "cat-jigs",
    "categorySlug": "jigs",
    "categoryName": "Jigs",
    "tagline": "Hardened drill bushing guide plate.",
    "description": "Premium Precision Drilling Jig engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Drilling Jig with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-jg-001-1",
        "url": "/images/products/jigs/jig-01.jpg",
        "alt": "Precision Drilling Jig",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/jigs/jig-01.jpg",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-jg-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "fg-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "jigs"
    ],
    "isActive": true,
    "displayOrder": 28,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "jg-002",
    "name": "Assembly Jig Clamps",
    "slug": "jg-002",
    "partNumber": "PE-JG-002",
    "categoryId": "cat-jigs",
    "categorySlug": "jigs",
    "categoryName": "Jigs",
    "tagline": "Pneumatic clamping assembly fixture.",
    "description": "Premium Assembly Jig Clamps engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Assembly Jig Clamps with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-jg-002-1",
        "url": "/images/products/jigs/jig-02.jpg",
        "alt": "Assembly Jig Clamps",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/jigs/jig-02.jpg",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-jg-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "jg-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "jigs"
    ],
    "isActive": true,
    "displayOrder": 29,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "mc-001",
    "name": "Bearing Housing Component",
    "slug": "mc-001",
    "partNumber": "PE-MC-001",
    "categoryId": "cat-machine-components",
    "categorySlug": "machine-components",
    "categoryName": "Machine Components",
    "tagline": "Plummer block bearing housing cast.",
    "description": "Premium Bearing Housing Component engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Bearing Housing Component with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-mc-001-1",
        "url": "/images/products/machine-components/machine-comp-01.jpg",
        "alt": "Bearing Housing Component",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/machine-components/machine-comp-01.jpg",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-mc-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "jg-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "machine-components"
    ],
    "isActive": true,
    "displayOrder": 30,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "mc-002",
    "name": "Precision Machine Slide",
    "slug": "mc-002",
    "partNumber": "PE-MC-002",
    "categoryId": "cat-machine-components",
    "categorySlug": "machine-components",
    "categoryName": "Machine Components",
    "tagline": "Linear guide machine slide carriage.",
    "description": "Premium Precision Machine Slide engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Precision Machine Slide with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-mc-002-1",
        "url": "/images/products/machine-components/machine-comp-02.png",
        "alt": "Precision Machine Slide",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/machine-components/machine-comp-02.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-mc-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "mc-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "machine-components"
    ],
    "isActive": true,
    "displayOrder": 31,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "pt-001",
    "name": "CNC Precision Turned Fitting",
    "slug": "pt-001",
    "partNumber": "PE-PT-001",
    "categoryId": "cat-precision-turned-parts",
    "categorySlug": "precision-turned-parts",
    "categoryName": "Precision Turned Parts",
    "tagline": "Hex head threaded turned nozzle.",
    "description": "Premium CNC Precision Turned Fitting engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "CNC Precision Turned Fitting with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-pt-001-1",
        "url": "/images/products/cnc-parts/cnc-part-01.png",
        "alt": "CNC Precision Turned Fitting",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/cnc-parts/cnc-part-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-pt-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "mc-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "precision-turned-parts"
    ],
    "isActive": true,
    "displayOrder": 32,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "pt-002",
    "name": "Turned Shaft Collar",
    "slug": "pt-002",
    "partNumber": "PE-PT-002",
    "categoryId": "cat-precision-turned-parts",
    "categorySlug": "precision-turned-parts",
    "categoryName": "Precision Turned Parts",
    "tagline": "Threaded clamping shaft collar spacer.",
    "description": "Premium Turned Shaft Collar engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Turned Shaft Collar with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-pt-002-1",
        "url": "/images/products/cnc-parts/cnc-part-02.png",
        "alt": "Turned Shaft Collar",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/cnc-parts/cnc-part-02.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-pt-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "pt-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "precision-turned-parts"
    ],
    "isActive": true,
    "displayOrder": 33,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "cm-001",
    "name": "5-Axis CNC Milled Component",
    "slug": "cm-001",
    "partNumber": "PE-CM-001",
    "categoryId": "cat-cnc-milled-parts",
    "categorySlug": "cnc-milled-parts",
    "categoryName": "CNC Milled Parts",
    "tagline": "Aerospace grade milled structural block.",
    "description": "Premium 5-Axis CNC Milled Component engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "5-Axis CNC Milled Component with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-cm-001-1",
        "url": "/images/products/custom-precision-components/custom-comp-01.png",
        "alt": "5-Axis CNC Milled Component",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/custom-precision-components/custom-comp-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-cm-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "pt-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "cnc-milled-parts"
    ],
    "isActive": true,
    "displayOrder": 34,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "cm-002",
    "name": "3-Axis CNC Milled Plate",
    "slug": "cm-002",
    "partNumber": "PE-CM-002",
    "categoryId": "cat-cnc-milled-parts",
    "categorySlug": "cnc-milled-parts",
    "categoryName": "CNC Milled Parts",
    "tagline": "Milled alignment mounting base plate.",
    "description": "Premium 3-Axis CNC Milled Plate engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "3-Axis CNC Milled Plate with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-cm-002-1",
        "url": "/images/products/custom-precision-components/custom-comp-02.png",
        "alt": "3-Axis CNC Milled Plate",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/custom-precision-components/custom-comp-02.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-cm-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "cm-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "cnc-milled-parts"
    ],
    "isActive": true,
    "displayOrder": 35,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ce-001",
    "name": "Custom Precision Assembly",
    "slug": "ce-001",
    "partNumber": "PE-CE-001",
    "categoryId": "cat-custom-engineering",
    "categorySlug": "custom-engineering",
    "categoryName": "Custom Engineering Components",
    "tagline": "Multi-part precision mechanism.",
    "description": "Premium Custom Precision Assembly engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Custom Precision Assembly with standard specs.",
    "isFeatured": false,
    "images": [
      {
        "id": "img-ce-001-1",
        "url": "/images/products/gallery/gallery-01.png",
        "alt": "Custom Precision Assembly",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/gallery/gallery-01.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ce-001-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "cm-002"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "custom-engineering"
    ],
    "isActive": true,
    "displayOrder": 36,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  },
  {
    "id": "ce-002",
    "name": "Bespoke Gearbox Assembly",
    "slug": "ce-002",
    "partNumber": "PE-CE-002",
    "categoryId": "cat-custom-engineering",
    "categorySlug": "custom-engineering",
    "categoryName": "Custom Engineering Components",
    "tagline": "Custom planetary gear reduction drive.",
    "description": "Premium Bespoke Gearbox Assembly engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "shortDescription": "Bespoke Gearbox Assembly with standard specs.",
    "isFeatured": true,
    "images": [
      {
        "id": "img-ce-002-1",
        "url": "/images/products/gallery/gallery-02.png",
        "alt": "Bespoke Gearbox Assembly",
        "isPrimary": true
      }
    ],
    "thumbnailUrl": "/images/products/gallery/gallery-02.png",
    "specifications": [
      {
        "label": "Tolerance",
        "value": "±0.01mm"
      },
      {
        "label": "Surface Finish",
        "value": "Ra 0.4μm"
      },
      {
        "label": "Material Options",
        "value": "Stainless Steel / Alloy Steel"
      },
      {
        "label": "Lead Time",
        "value": "3-5 days"
      }
    ],
    "materials": [
      {
        "name": "Stainless Steel 316",
        "grade": "A4",
        "standard": "ASTM A276",
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "grade": "709M40",
        "standard": "BS970",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcesses": [
      {
        "step": 1,
        "process": "CNC Machining",
        "description": "Precision machining to drawing dimensions",
        "duration": "25 mins"
      },
      {
        "step": 2,
        "process": "Grinding & Finishing",
        "description": "Cylindrical/surface grinding to final finish",
        "duration": "15 mins"
      },
      {
        "step": 3,
        "process": "Quality Verification",
        "description": "Dimensional audit using profile projector",
        "duration": "10 mins"
      }
    ],
    "heatTreatments": [
      {
        "name": "Induction Hardening",
        "description": "Selective induction case hardening",
        "hardnessRange": "55-60 HRC"
      }
    ],
    "surfaceFinishes": [
      {
        "name": "Mirror Polish",
        "roughness": "Ra 0.4μm",
        "description": "Superfinished mirror shine"
      }
    ],
    "toleranceCapability": "±0.01mm",
    "qualityStandards": [
      {
        "name": "ISO 9001",
        "description": "ISO Certified Manufacturing Facility",
        "certificateAvailable": true
      }
    ],
    "applications": [
      {
        "industry": "Automotive",
        "useCase": "Subassembly mechanisms",
        "benefit": "Zero failure rate",
        "icon": "🚗"
      },
      {
        "industry": "Heavy Engineering",
        "useCase": "Power transmission structures",
        "benefit": "Extended wear life",
        "icon": "⚙️"
      }
    ],
    "downloads": [
      {
        "id": "dl-ce-002-spec",
        "name": "Technical Specification Sheet",
        "type": "PDF",
        "url": "#",
        "fileSize": "1.5 MB"
      }
    ],
    "relatedProductIds": [
      "ce-001"
    ],
    "industries": [
      "Automotive",
      "Heavy Engineering",
      "Automation"
    ],
    "tags": [
      "precision",
      "industrial",
      "custom-engineering"
    ],
    "isActive": true,
    "displayOrder": 37,
    "createdAt": "2026-06-22",
    "updatedAt": "2026-06-23"
  }
];

export function getProducts(): ProductComponent[] {
  return COMPONENT_PRODUCTS;
}

export function getCategories(): ProductCategory[] {
  return COMPONENT_CATEGORIES;
}

export function getFeaturedProducts(): ProductComponent[] {
  return COMPONENT_PRODUCTS.filter(p => p.isFeatured && p.isActive);
}

export function getProductById(id: string): ProductComponent | undefined {
  return COMPONENT_PRODUCTS.find(p => p.id === id || p.slug === id);
}

export function getRelatedProducts(productId: string): ProductComponent[] {
  const product = getProductById(productId);
  if (!product) return [];
  return COMPONENT_PRODUCTS.filter(p => product.relatedProductIds.includes(p.id) && p.isActive);
}

export function searchProducts(
  query: string,
  filters: any,
  page: number = 1,
  pageSize: number = 12
): ProductSearchResult {
  let filtered = [...COMPONENT_PRODUCTS];

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.partNumber.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (filters.category && filters.category.length > 0) {
    filtered = filtered.filter(p => filters.category.includes(p.categorySlug));
  }

  if (filters.material && filters.material.length > 0) {
    filtered = filtered.filter(p =>
      p.materials.some(m => filters.material.includes(m.name))
    );
  }

  if (filters.industry && filters.industry.length > 0) {
    filtered = filtered.filter(p =>
      p.industries.some(ind => filters.industry.includes(ind))
    );
  }

  if (filters.manufacturingProcess && filters.manufacturingProcess.length > 0) {
    filtered = filtered.filter(p =>
      p.manufacturingProcesses.some(proc => filters.manufacturingProcess.includes(proc.process))
    );
  }

  if (filters.heatTreatment && filters.heatTreatment.length > 0) {
    filtered = filtered.filter(p =>
      p.heatTreatments.some(ht => filters.heatTreatment.includes(ht.name))
    );
  }

  if (filters.surfaceFinish && filters.surfaceFinish.length > 0) {
    filtered = filtered.filter(p =>
      p.surfaceFinishes.some(sf => filters.surfaceFinish.includes(sf.name))
    );
  }

  if (filters.sortBy) {
    if (filters.sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (filters.sortBy === "category") {
      filtered.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
    } else if (filters.sortBy === "newest") {
      filtered.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    }
  }

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const offset = (page - 1) * pageSize;
  const paginated = filtered.slice(offset, offset + pageSize);

  // Generate filters metadata counts based on all products matching search (before filters applied)
  const allForCounts = query ? COMPONENT_PRODUCTS.filter(p => {
    const q = query.toLowerCase();
    return p.name.toLowerCase().includes(q) ||
      p.partNumber.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q));
  }) : COMPONENT_PRODUCTS;

  const categoriesMap = new Map<string, { slug: string; name: string; count: number }>();
  const materialsMap = new Map<string, number>();
  const industriesMap = new Map<string, number>();
  const processesMap = new Map<string, number>();
  const htMap = new Map<string, number>();
  const sfMap = new Map<string, number>();

  COMPONENT_CATEGORIES.forEach(c => categoriesMap.set(c.slug, { slug: c.slug, name: c.name, count: 0 }));

  allForCounts.forEach(p => {
    // Categories
    const cat = categoriesMap.get(p.categorySlug);
    if (cat) cat.count++;

    // Materials
    p.materials.forEach(m => {
      materialsMap.set(m.name, (materialsMap.get(m.name) || 0) + 1);
    });

    // Industries
    p.industries.forEach(ind => {
      industriesMap.set(ind, (industriesMap.get(ind) || 0) + 1);
    });

    // Processes
    p.manufacturingProcesses.forEach(proc => {
      processesMap.set(proc.process, (processesMap.get(proc.process) || 0) + 1);
    });

    // Heat Treatment
    p.heatTreatments.forEach(ht => {
      htMap.set(ht.name, (htMap.get(ht.name) || 0) + 1);
    });

    // Surface Finish
    p.surfaceFinishes.forEach(sf => {
      sfMap.set(sf.name, (sfMap.get(sf.name) || 0) + 1);
    });
  });

  return {
    products: paginated,
    totalCount,
    page,
    pageSize,
    totalPages,
    filters: {
      categories: Array.from(categoriesMap.values()).filter(c => c.count > 0),
      materials: Array.from(materialsMap.entries()).map(([name, count]) => ({ name, count })),
      industries: Array.from(industriesMap.entries()).map(([name, count]) => ({ name, count })),
      manufacturingProcesses: Array.from(processesMap.entries()).map(([name, count]) => ({ name, count })),
      heatTreatments: Array.from(htMap.entries()).map(([name, count]) => ({ name, count })),
      surfaceFinishes: Array.from(sfMap.entries()).map(([name, count]) => ({ name, count }))
    }
  };
}
