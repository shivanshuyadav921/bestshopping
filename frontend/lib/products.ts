/* PREMA ENGINEERING WORKS — Product Museum Data Structure */
/* Each product is a museum exhibit with detailed specifications and manufacturing information */

export interface ProductMaterial {
  name: string;
  properties: string[];
}

export interface ManufacturingStep {
  step: number;
  process: string;
  description: string;
  duration?: string;
}

export interface ApplicationExample {
  industry: string;
  useCase: string;
  benefit: string;
  icon: string;
}

export interface AssemblyPart {
  name: string;
  description: string;
  material: string;
  position: { x: number; y: number; z: number };
  icon: string;
}

export interface ProductExhibit {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  
  /* Visual assets */
  heroImage: string;
  modelImage: string; /* For 3D model placeholder */
  
  /* Technical specifications */
  specifications: {
    label: string;
    value: string;
  }[];
  
  /* Materials */
  materials: ProductMaterial[];
  
  /* Manufacturing process */
  manufacturingProcess: ManufacturingStep[];
  
  /* Applications */
  applications: ApplicationExample[];
  
  /* Assembly parts */
  assemblyParts: AssemblyPart[];
  
  /* Museum exhibit metadata */
  exhibitTheme: 'precision' | 'industrial' | 'luxury' | 'engineering';
  lightingStyle: 'studio' | 'dramatic' | 'ambient';
}

export const PRODUCT_EXHIBITS: ProductExhibit[] = [
  {
    "id": "precision-shaft",
    "name": "Mirror-Polished Precision Shafts",
    "category": "Precision Shafts",
    "tagline": "Engineered to exact tolerances. Zero compromise on precision.",
    "description": "Precision shafts manufactured to ±0.005mm tolerances with mirror-polished surfaces. Used in critical machinery where downtime is not an option.",
    "heroImage": "/images/products/component-precision-shaft.webp",
    "modelImage": "/images/products/component-precision-shaft.webp",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Mirror-Polished Precision Shafts.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "custom-gear",
    "name": "Custom Spur & Helical Gears",
    "category": "Spur Gears",
    "tagline": "High-torque transmission with low backlash.",
    "description": "Custom spur and helical gears cut from premium alloy steels. Engineered for maximum load capacity and quiet operation in high-performance drivetrains.",
    "heroImage": "/images/products/component-custom-gear.webp",
    "modelImage": "/images/products/component-custom-gear.webp",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Custom Spur & Helical Gears.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "guide-rail",
    "name": "Hardened Linear Guide Rails",
    "category": "Machine Components",
    "tagline": "Ultra-smooth linear translation. Heavy load capacities.",
    "description": "Hardened and ground linear guide rails for automated systems, CNC machinery, and high-precision positioning tables.",
    "heroImage": "/images/products/component-guide-rail.webp",
    "modelImage": "/images/products/component-guide-rail.webp",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Hardened Linear Guide Rails.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ps-001",
    "name": "Mirror-Polished Shaft A1",
    "category": "Precision Shafts",
    "tagline": "Mirror-finished precision shafting.",
    "description": "Premium Mirror-Polished Shaft A1 engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/precision-shafts/shaft-01.png",
    "modelImage": "/images/products/precision-shafts/shaft-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Mirror-Polished Shaft A1.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ps-002",
    "name": "Mirror-Polished Shaft A2",
    "category": "Precision Shafts",
    "tagline": "Cylindrical ground indexing shaft.",
    "description": "Premium Mirror-Polished Shaft A2 engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/precision-shafts/shaft-02.png",
    "modelImage": "/images/products/precision-shafts/shaft-02.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Mirror-Polished Shaft A2.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ps-003",
    "name": "Mirror-Polished Shaft A3",
    "category": "Precision Shafts",
    "tagline": "Flanged precision shaft assembly.",
    "description": "Premium Mirror-Polished Shaft A3 engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/precision-shafts/shaft-03.png",
    "modelImage": "/images/products/precision-shafts/shaft-03.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Mirror-Polished Shaft A3.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ps-004",
    "name": "Mirror-Polished Shaft A4",
    "category": "Precision Shafts",
    "tagline": "Precision shaft with keyway slot.",
    "description": "Premium Mirror-Polished Shaft A4 engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/precision-shafts/shaft-04.png",
    "modelImage": "/images/products/precision-shafts/shaft-04.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Mirror-Polished Shaft A4.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ps-005",
    "name": "Mirror-Polished Shaft A5",
    "category": "Precision Shafts",
    "tagline": "Heavy-duty machine drive shaft.",
    "description": "Premium Mirror-Polished Shaft A5 engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/precision-shafts/shaft-05.png",
    "modelImage": "/images/products/precision-shafts/shaft-05.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Mirror-Polished Shaft A5.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "gs-001",
    "name": "Precision Gear Shaft Assembly",
    "category": "Gear Shafts",
    "tagline": "Integrated gear shaft transmission.",
    "description": "Premium Precision Gear Shaft Assembly engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/gear-shafts/gear-shaft-01.png",
    "modelImage": "/images/products/gear-shafts/gear-shaft-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Gear Shaft Assembly.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "gs-002",
    "name": "Spline-End Gear Shaft",
    "category": "Gear Shafts",
    "tagline": "Splined end gear shaft collar.",
    "description": "Premium Spline-End Gear Shaft engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/gear-shafts/gear-shaft-02.png",
    "modelImage": "/images/products/gear-shafts/gear-shaft-02.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Spline-End Gear Shaft.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "sg-001",
    "name": "Precision Spur Gear",
    "category": "Spur Gears",
    "tagline": "Straight teeth precision spur gear.",
    "description": "Premium Precision Spur Gear engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/gears/gear-01.png",
    "modelImage": "/images/products/gears/gear-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Spur Gear.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "sg-002",
    "name": "Stainless Steel Spur Gear",
    "category": "Spur Gears",
    "tagline": "Corrosion-resistant steel gear.",
    "description": "Premium Stainless Steel Spur Gear engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/gears/gear-02.png",
    "modelImage": "/images/products/gears/gear-02.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Stainless Steel Spur Gear.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "hg-001",
    "name": "Precision Helical Gear",
    "category": "Helical Gears",
    "tagline": "Smooth running helical gear transmission.",
    "description": "Premium Precision Helical Gear engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/gears/gear-02.png",
    "modelImage": "/images/products/gears/gear-02.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Helical Gear.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ss-001",
    "name": "Precision Splined Shaft",
    "category": "Splined Shafts",
    "tagline": "High-torque splined shafting.",
    "description": "Premium Precision Splined Shaft engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/precision-shafts/shaft-03.png",
    "modelImage": "/images/products/precision-shafts/shaft-03.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Splined Shaft.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ss-002",
    "name": "Involute Splined Shaft",
    "category": "Splined Shafts",
    "tagline": "CNC cut involute splined axle.",
    "description": "Premium Involute Splined Shaft engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/precision-shafts/shaft-04.png",
    "modelImage": "/images/products/precision-shafts/shaft-04.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Involute Splined Shaft.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "tc-001",
    "name": "Precision Lead Screw",
    "category": "Threaded Components",
    "tagline": "ACME thread lead screw.",
    "description": "Premium Precision Lead Screw engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/threaded-components/threaded-01.png",
    "modelImage": "/images/products/threaded-components/threaded-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Lead Screw.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "tc-002",
    "name": "Precision Threaded Stud",
    "category": "Threaded Components",
    "tagline": "Threaded stud attachment component.",
    "description": "Premium Precision Threaded Stud engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/threaded-components/threaded-02.png",
    "modelImage": "/images/products/threaded-components/threaded-02.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Threaded Stud.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "bs-001",
    "name": "Precision Bronze Bush",
    "category": "Bushes & Sleeves",
    "tagline": "Self-lubricating sleeve bronze bushing.",
    "description": "Premium Precision Bronze Bush engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/bushes/bush-01.png",
    "modelImage": "/images/products/bushes/bush-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Bronze Bush.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "bs-002",
    "name": "Precision Steel Sleeve",
    "category": "Bushes & Sleeves",
    "tagline": "Hardened steel alignment sleeve.",
    "description": "Premium Precision Steel Sleeve engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/sleeves/sleeve-01.png",
    "modelImage": "/images/products/sleeves/sleeve-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Steel Sleeve.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ro-001",
    "name": "Precision Ground Roller",
    "category": "Rollers",
    "tagline": "Hardened steel cylindrical roller.",
    "description": "Premium Precision Ground Roller engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/rollers/roller-01.jpg",
    "modelImage": "/images/products/rollers/roller-01.jpg",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Ground Roller.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ro-002",
    "name": "Conveyor Roller Assembly",
    "category": "Rollers",
    "tagline": "Conveyor drive roller system.",
    "description": "Premium Conveyor Roller Assembly engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/rollers/roller-02.jpg",
    "modelImage": "/images/products/rollers/roller-02.jpg",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Conveyor Roller Assembly.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "pi-001",
    "name": "Precision Dowel Pin",
    "category": "Pins",
    "tagline": "Hardened steel dowel pin locator.",
    "description": "Premium Precision Dowel Pin engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/pins/pin-01.png",
    "modelImage": "/images/products/pins/pin-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Dowel Pin.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "pi-002",
    "name": "Spring Pin / Roll Pin",
    "category": "Pins",
    "tagline": "Slotted spring steel roll pin.",
    "description": "Premium Spring Pin / Roll Pin engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/pins/pin-02.jpg",
    "modelImage": "/images/products/pins/pin-02.jpg",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Spring Pin / Roll Pin.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "cp-001",
    "name": "Precision Jaw Coupling",
    "category": "Couplings",
    "tagline": "Jaw elastomeric coupling insert.",
    "description": "Premium Precision Jaw Coupling engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/couplings/coupling-01.png",
    "modelImage": "/images/products/couplings/coupling-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Jaw Coupling.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "cp-002",
    "name": "Precision Rigid Coupling",
    "category": "Couplings",
    "tagline": "Sleeve rigid power coupling.",
    "description": "Premium Precision Rigid Coupling engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/couplings/coupling-02.png",
    "modelImage": "/images/products/couplings/coupling-02.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Rigid Coupling.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "fg-001",
    "name": "Precision Machine Vice",
    "category": "Fixtures",
    "tagline": "CNC milling machine clamping vice.",
    "description": "Premium Precision Machine Vice engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/fixtures/fixture-01.png",
    "modelImage": "/images/products/fixtures/fixture-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Machine Vice.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "fg-002",
    "name": "Custom Welding Fixture",
    "category": "Fixtures",
    "tagline": "Bespoke robotic welding jig clamp.",
    "description": "Premium Custom Welding Fixture engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/fixtures/fixture-01.png",
    "modelImage": "/images/products/fixtures/fixture-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Custom Welding Fixture.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "jg-001",
    "name": "Precision Drilling Jig",
    "category": "Jigs",
    "tagline": "Hardened drill bushing guide plate.",
    "description": "Premium Precision Drilling Jig engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/jigs/jig-01.jpg",
    "modelImage": "/images/products/jigs/jig-01.jpg",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Drilling Jig.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "jg-002",
    "name": "Assembly Jig Clamps",
    "category": "Jigs",
    "tagline": "Pneumatic clamping assembly fixture.",
    "description": "Premium Assembly Jig Clamps engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/jigs/jig-02.jpg",
    "modelImage": "/images/products/jigs/jig-02.jpg",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Assembly Jig Clamps.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "mc-001",
    "name": "Bearing Housing Component",
    "category": "Machine Components",
    "tagline": "Plummer block bearing housing cast.",
    "description": "Premium Bearing Housing Component engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/machine-components/machine-comp-01.jpg",
    "modelImage": "/images/products/machine-components/machine-comp-01.jpg",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Bearing Housing Component.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "mc-002",
    "name": "Precision Machine Slide",
    "category": "Machine Components",
    "tagline": "Linear guide machine slide carriage.",
    "description": "Premium Precision Machine Slide engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/machine-components/machine-comp-02.png",
    "modelImage": "/images/products/machine-components/machine-comp-02.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Precision Machine Slide.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "pt-001",
    "name": "CNC Precision Turned Fitting",
    "category": "Precision Turned Parts",
    "tagline": "Hex head threaded turned nozzle.",
    "description": "Premium CNC Precision Turned Fitting engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/cnc-parts/cnc-part-01.png",
    "modelImage": "/images/products/cnc-parts/cnc-part-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of CNC Precision Turned Fitting.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "pt-002",
    "name": "Turned Shaft Collar",
    "category": "Precision Turned Parts",
    "tagline": "Threaded clamping shaft collar spacer.",
    "description": "Premium Turned Shaft Collar engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/cnc-parts/cnc-part-02.png",
    "modelImage": "/images/products/cnc-parts/cnc-part-02.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Turned Shaft Collar.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "cm-001",
    "name": "5-Axis CNC Milled Component",
    "category": "CNC Milled Parts",
    "tagline": "Aerospace grade milled structural block.",
    "description": "Premium 5-Axis CNC Milled Component engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/custom-precision-components/custom-comp-01.png",
    "modelImage": "/images/products/custom-precision-components/custom-comp-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of 5-Axis CNC Milled Component.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "cm-002",
    "name": "3-Axis CNC Milled Plate",
    "category": "CNC Milled Parts",
    "tagline": "Milled alignment mounting base plate.",
    "description": "Premium 3-Axis CNC Milled Plate engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/custom-precision-components/custom-comp-02.png",
    "modelImage": "/images/products/custom-precision-components/custom-comp-02.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of 3-Axis CNC Milled Plate.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ce-001",
    "name": "Custom Precision Assembly",
    "category": "Custom Engineering Components",
    "tagline": "Multi-part precision mechanism.",
    "description": "Premium Custom Precision Assembly engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/gallery/gallery-01.png",
    "modelImage": "/images/products/gallery/gallery-01.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Custom Precision Assembly.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  },
  {
    "id": "ce-002",
    "name": "Bespoke Gearbox Assembly",
    "category": "Custom Engineering Components",
    "tagline": "Custom planetary gear reduction drive.",
    "description": "Premium Bespoke Gearbox Assembly engineered for high performance, reliability, and precision industrial operations. Manufactured to strict tolerances from high-grade raw materials.",
    "heroImage": "/images/products/gallery/gallery-02.png",
    "modelImage": "/images/products/gallery/gallery-02.png",
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
        "properties": [
          "Corrosion resistant",
          "High strength",
          "Biocompatible"
        ]
      },
      {
        "name": "Alloy Steel 4140",
        "properties": [
          "High tensile strength",
          "Wear resistant",
          "Heat treatable"
        ]
      }
    ],
    "manufacturingProcess": [
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
    "assemblyParts": [
      {
        "name": "Main Body",
        "description": "Primary structural assembly piece of Bespoke Gearbox Assembly.",
        "material": "Stainless Steel 316",
        "position": {
          "x": 0,
          "y": 0,
          "z": 0
        },
        "icon": "📏"
      }
    ],
    "exhibitTheme": "precision",
    "lightingStyle": "studio"
  }
];

export const getProductById = (id: string): ProductExhibit | undefined => {
  return PRODUCT_EXHIBITS.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): ProductExhibit[] => {
  return PRODUCT_EXHIBITS.filter((product) => product.category === category);
};
