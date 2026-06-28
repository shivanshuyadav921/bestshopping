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
    id: 'precision-shaft',
    name: 'Mirror-Polished Precision Shafts',
    category: 'Shafts',
    tagline: 'Engineered to exact tolerances. Zero compromise on precision.',
    description: 'Precision shafts manufactured to ±0.005mm tolerances with mirror-polished surfaces. Used in critical machinery where downtime is not an option.',
    
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-precision-shaft.webp',
    modelImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-precision-shaft.webp',
    
    specifications: [
      { label: 'Tolerance', value: '±0.005mm' },
      { label: 'Surface Finish', value: 'Ra 0.4μm (mirror-polished)' },
      { label: 'Length Range', value: '50mm - 500mm' },
      { label: 'Diameter Range', value: '10mm - 100mm' },
      { label: 'Material Options', value: 'Stainless Steel, Alloy Steel' },
      { label: 'Lead Time', value: '3-5 days' },
    ],
    
    materials: [
      {
        name: 'Stainless Steel 316',
        properties: ['Corrosion resistant', 'High strength', 'Temperature stable', 'Non-magnetic'],
      },
      {
        name: 'Alloy Steel 4140',
        properties: ['High tensile strength', 'Excellent machinability', 'Heat treatable', 'Wear resistant'],
      },
    ],
    
    manufacturingProcess: [
      {
        step: 1,
        process: 'Material Selection',
        description: 'Premium grade stainless or alloy steel selected based on application requirements',
        duration: '1 day',
      },
      {
        step: 2,
        process: 'CNC Turning',
        description: 'Precision turning on multi-axis CNC machines to achieve exact diameter and length specifications',
        duration: '2 hours',
      },
      {
        step: 3,
        process: 'Surface Grinding',
        description: 'Fine grinding to achieve Ra 0.4μm surface finish and ±0.005mm tolerance',
        duration: '1 hour',
      },
      {
        step: 4,
        process: 'Mirror Polishing',
        description: 'Hand-finished mirror polish for aesthetic perfection and corrosion resistance',
        duration: '2 hours',
      },
      {
        step: 5,
        process: 'Quality Inspection',
        description: '100% inspection with CMM (Coordinate Measuring Machine) verification',
        duration: '1 hour',
      },
      {
        step: 6,
        process: 'Packaging',
        description: 'Anti-corrosion coating and precision packaging for safe delivery',
        duration: '30 minutes',
      },
    ],
    
    applications: [
      {
        industry: 'Pharmaceutical',
        useCase: 'Filling machine drive shafts',
        benefit: 'Zero downtime, precise dosing',
        icon: '⚕️',
      },
      {
        industry: 'Food & Beverage',
        useCase: 'Conveyor system spindles',
        benefit: 'Hygienic, corrosion-free operation',
        icon: '🍽️',
      },
      {
        industry: 'Automotive',
        useCase: 'Assembly line indexing',
        benefit: 'Exact positioning, high speed',
        icon: '🚗',
      },
      {
        industry: 'Textiles',
        useCase: 'Spinning frame shafts',
        benefit: 'Vibration-free, precision rotation',
        icon: '🧵',
      },
    ],
    
    assemblyParts: [
      {
        name: 'Main Shaft Body',
        description: 'Precision-turned cylindrical core with mirror polish',
        material: 'Stainless Steel 316',
        position: { x: 0, y: 0, z: 0 },
        icon: '📏',
      },
      {
        name: 'Drive End Flange',
        description: 'Precision-machined mounting flange',
        material: 'Alloy Steel 4140',
        position: { x: 120, y: 0, z: 0 },
        icon: '⚙',
      },
      {
        name: 'Bearing Seat',
        description: 'Ground bearing mounting surface',
        material: 'Stainless Steel 316',
        position: { x: -120, y: 0, z: 0 },
        icon: '◯',
      },
      {
        name: 'Keyway Slot',
        description: 'Precision-cut keyway for power transmission',
        material: 'Stainless Steel 316',
        position: { x: 0, y: 100, z: 0 },
        icon: '🔑',
      },
    ],
    
    exhibitTheme: 'precision',
    lightingStyle: 'studio',
  },
  
  {
    id: 'custom-gear',
    name: 'Precision-Engineered Custom Gears',
    category: 'Gears',
    tagline: 'Power transmission perfected. Every tooth engineered for performance.',
    description: 'Custom gears with precision tooth geometry, heat treatment, and surface finishing. Designed for maximum efficiency and longevity in demanding applications.',
    
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-gear.webp',
    modelImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-gear.webp',
    
    specifications: [
      { label: 'Module Range', value: '0.5 - 8' },
      { label: 'Tooth Accuracy', value: 'DIN 6-7 grade' },
      { label: 'Pitch Diameter', value: 'Up to 500mm' },
      { label: 'Surface Hardness', value: '58-62 HRC' },
      { label: 'Efficiency', value: '98-99%' },
      { label: 'Lead Time', value: '5-7 days' },
    ],
    
    materials: [
      {
        name: 'Alloy Steel 20CrMnTi',
        properties: ['Case hardened', 'High contact strength', 'Excellent fatigue resistance', 'Precision machinability'],
      },
      {
        name: 'Stainless Steel 316L',
        properties: ['Corrosion resistant', 'Food-safe', 'Non-magnetic', 'Temperature stable'],
      },
    ],
    
    manufacturingProcess: [
      {
        step: 1,
        process: 'Design & CAD',
        description: 'Custom gear design optimized for your application using advanced FEA simulation',
        duration: '1 day',
      },
      {
        step: 2,
        process: 'Forging',
        description: 'Precision forging to near-net shape for material efficiency',
        duration: '2 days',
      },
      {
        step: 3,
        process: 'Hobbing',
        description: 'Precision gear hobbing with multi-axis CNC for exact tooth geometry',
        duration: '4 hours',
      },
      {
        step: 4,
        process: 'Heat Treatment',
        description: 'Case hardening to 58-62 HRC for maximum wear resistance',
        duration: '1 day',
      },
      {
        step: 5,
        process: 'Grinding & Finishing',
        description: 'Precision grinding to DIN 6-7 grade accuracy and smooth surface finish',
        duration: '3 hours',
      },
      {
        step: 6,
        process: 'Quality Verification',
        description: '100% tooth profile inspection and load testing',
        duration: '2 hours',
      },
    ],
    
    applications: [
      {
        industry: 'Heavy Machinery',
        useCase: 'Gearbox drive systems',
        benefit: 'High torque transmission, minimal noise',
        icon: '⚙️',
      },
      {
        industry: 'Food Processing',
        useCase: 'Bottle capping systems',
        benefit: 'Precise torque control, hygienic design',
        icon: '🍾',
      },
      {
        industry: 'Mining',
        useCase: 'Conveyor drive gears',
        benefit: 'Extreme durability, high load capacity',
        icon: '⛏️',
      },
      {
        industry: 'Renewable Energy',
        useCase: 'Wind turbine gearboxes',
        benefit: 'Efficiency optimization, long service life',
        icon: '💨',
      },
    ],
    
    assemblyParts: [
      {
        name: 'Gear Body',
        description: 'Main gear body with precision tooth geometry',
        material: 'Alloy Steel 20CrMnTi',
        position: { x: 0, y: 0, z: 0 },
        icon: '⚙',
      },
      {
        name: 'Tooth Profile',
        description: 'Precision-cut involute teeth for smooth power transmission',
        material: 'Alloy Steel 20CrMnTi',
        position: { x: 80, y: 80, z: 0 },
        icon: '🔧',
      },
      {
        name: 'Center Bore',
        description: 'Precision bore for shaft mounting',
        material: 'Alloy Steel 20CrMnTi',
        position: { x: -80, y: -80, z: 0 },
        icon: '◯',
      },
      {
        name: 'Keyway',
        description: 'Precision keyway for positive drive',
        material: 'Alloy Steel 20CrMnTi',
        position: { x: 0, y: -100, z: 0 },
        icon: '🔑',
      },
    ],
    
    exhibitTheme: 'engineering',
    lightingStyle: 'dramatic',
  },
  
  {
    id: 'guide-rail',
    name: 'Precision-Ground Guide Rails',
    category: 'Rails',
    tagline: 'Linear motion perfected. Smooth, silent, unstoppable.',
    description: 'Precision-ground guide rails for linear motion systems. Engineered for exact parallelism, minimal friction, and exceptional durability in high-speed applications.',
    
    heroImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-guide-rail.webp',
    modelImage: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663778233019/HgWQygy6hcEjZgykeuoFnG/component-guide-rail.webp',
    
    specifications: [
      { label: 'Length Range', value: '100mm - 2000mm' },
      { label: 'Parallelism', value: '±0.01mm over 1000mm' },
      { label: 'Surface Finish', value: 'Ra 0.2μm' },
      { label: 'Load Capacity', value: 'Up to 500kg per rail' },
      { label: 'Speed Rating', value: 'Up to 5m/s' },
      { label: 'Lead Time', value: '4-6 days' },
    ],
    
    materials: [
      {
        name: 'Hardened Steel 100Cr6',
        properties: ['High hardness (62-65 HRC)', 'Excellent wear resistance', 'Low friction', 'Precision ground'],
      },
      {
        name: 'Stainless Steel 440C',
        properties: ['Corrosion resistant', 'High hardness', 'Food-safe', 'Hygienic design'],
      },
    ],
    
    manufacturingProcess: [
      {
        step: 1,
        process: 'Material Preparation',
        description: 'Premium grade steel selected and inspected for material consistency',
        duration: '1 day',
      },
      {
        step: 2,
        process: 'Rough Grinding',
        description: 'Initial grinding to remove surface imperfections and achieve near-final dimensions',
        duration: '2 hours',
      },
      {
        step: 3,
        process: 'Heat Treatment',
        description: 'Precision heat treatment to achieve 62-65 HRC hardness',
        duration: '1 day',
      },
      {
        step: 4,
        process: 'Fine Grinding',
        description: 'Multi-pass precision grinding to achieve ±0.01mm parallelism and Ra 0.2μm finish',
        duration: '3 hours',
      },
      {
        step: 5,
        process: 'Lapping',
        description: 'Fine lapping for ultra-smooth surface and optimal bearing performance',
        duration: '2 hours',
      },
      {
        step: 6,
        process: 'Inspection & Testing',
        description: '100% dimensional inspection, parallelism verification, and friction testing',
        duration: '1 hour',
      },
    ],
    
    applications: [
      {
        industry: 'Packaging',
        useCase: 'High-speed labeling machines',
        benefit: 'Smooth motion, minimal vibration',
        icon: '📦',
      },
      {
        industry: 'Semiconductor',
        useCase: 'Wafer handling systems',
        benefit: 'Precision positioning, clean operation',
        icon: '🔬',
      },
      {
        industry: 'Printing',
        useCase: 'Paper feed mechanisms',
        benefit: 'Consistent alignment, high speed',
        icon: '🖨️',
      },
      {
        industry: 'Medical Devices',
        useCase: 'Surgical equipment stages',
        benefit: 'Precision movement, sterile design',
        icon: '⚕️',
      },
    ],
    
    assemblyParts: [
      {
        name: 'Rail Body',
        description: 'Main precision-ground rail with parallel surfaces',
        material: 'Hardened Steel 100Cr6',
        position: { x: 0, y: 0, z: 0 },
        icon: '📏',
      },
      {
        name: 'Guide Surface',
        description: 'Ultra-smooth ground surface for carriage movement',
        material: 'Hardened Steel 100Cr6',
        position: { x: 100, y: 0, z: 0 },
        icon: '→',
      },
      {
        name: 'Mounting Face',
        description: 'Precision mounting surface for installation',
        material: 'Hardened Steel 100Cr6',
        position: { x: -100, y: 0, z: 0 },
        icon: '🔨',
      },
      {
        name: 'End Blocks',
        description: 'Precision-ground end stops for carriage limits',
        material: 'Hardened Steel 100Cr6',
        position: { x: 0, y: 80, z: 0 },
        icon: '■',
      },
    ],
    
    exhibitTheme: 'precision',
    lightingStyle: 'ambient',
  },
];

export const getProductById = (id: string): ProductExhibit | undefined => {
  return PRODUCT_EXHIBITS.find((product) => product.id === id);
};

export const getProductsByCategory = (category: string): ProductExhibit[] => {
  return PRODUCT_EXHIBITS.filter((product) => product.category === category);
};
