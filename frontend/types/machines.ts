export interface MachineSpec {
    label: string;
    value: string;
    unit?: string;
}

export interface Machine {
    id: string;
    name: string;
    category: "CNC_MILLING" | "CNC_TURNING" | "EDM" | "INSPECTION";
    brand: string;
    model: string;
    tagline: string;
    description: string;
    yearAcquired: number;
    specs: MachineSpec[];
    accuracy: string;
    capacity: string;
    travelRange: string;
    features: string[];
    applications: string[];
    color: string; // accent color
}

export interface AcquisitionEvent {
    year: number;
    machine: string;
    category: string;
    description: string;
}

export const MACHINES: Machine[] = [
    {
        id: "mazak-variaxis",
        name: "Mazak Variaxis i-800",
        category: "CNC_MILLING",
        brand: "Mazak",
        model: "Variaxis i-800 NEO",
        tagline: "5-Axis Simultaneous Machining",
        description:
            "The Variaxis i-800 is a full 5-axis simultaneous machining center designed for complex multi-surface parts. Its tilting rotary table and high-speed spindle enable complete part machining in a single setup, eliminating multiple operations and reducing cycle times by up to 40%. Ideal for aerospace impellers, turbine blades, and complex medical implants.",
        yearAcquired: 2021,
        specs: [
            { label: "X-Axis Travel", value: "730", unit: "mm" },
            { label: "Y-Axis Travel", value: "730", unit: "mm" },
            { label: "Z-Axis Travel", value: "680", unit: "mm" },
            { label: "A-Axis Tilt", value: "-120° to +30°", unit: "" },
            { label: "C-Axis Rotation", value: "360°", unit: "continuous" },
            { label: "Spindle Speed", value: "12,000", unit: "RPM" },
            { label: "Spindle Power", value: "37", unit: "kW" },
            { label: "Tool Magazine", value: "60", unit: "tools" },
            { label: "Rapid Traverse", value: "42", unit: "m/min" },
            { label: "Table Load Capacity", value: "500", unit: "kg" },
        ],
        accuracy: "±0.004 mm positioning, ±0.002 mm repeatability",
        capacity: "730 × 730 × 680 mm work envelope, 500 kg max part weight",
        travelRange: "X: 730mm | Y: 730mm | Z: 680mm | A: -120° to +30° | C: 360°",
        features: [
            "5-axis simultaneous machining",
            "Mazak SmoothX CNC control",
            "Thermal displacement compensation",
            "Built-in collision avoidance system",
            "Intuitive 3D simulation and verification",
            "High-speed machining for hard alloys",
        ],
        applications: [
            "Aerospace impellers and blisks",
            "Turbine blades",
            "Medical implants (hip/knee)",
            "Automotive mold & die",
            "Complex prototype machining",
        ],
        color: "#ef4444",
    },
    {
        id: "mazak-qtn",
        name: "Mazak QTN 250",
        category: "CNC_TURNING",
        brand: "Mazak",
        model: "QTN 250 MSY",
        tagline: "Multi-Tasking Turning Center",
        description:
            "The QTN 250 MSY is a multi-tasking turning center with Y-axis, milling spindle, and sub-spindle. It combines turning, milling, drilling, and boring in a single setup, enabling complete part production without transferring between machines. Perfect for high-volume precision turned components.",
        yearAcquired: 2020,
        specs: [
            { label: "Max Turning Diameter", value: "330", unit: "mm" },
            { label: "Max Turning Length", value: "520", unit: "mm" },
            { label: "Spindle Speed (Main)", value: "5,000", unit: "RPM" },
            { label: "Spindle Speed (Sub)", value: "6,000", unit: "RPM" },
            { label: "Milling Spindle", value: "12,000", unit: "RPM" },
            { label: "Chuck Size", value: "8", unit: "inch" },
            { label: "Boring Bar Capacity", value: "52", unit: "mm" },
            { label: "Rapid Traverse", value: "36", unit: "m/min" },
            { label: "Tool Station", value: "40", unit: "tools" },
        ],
        accuracy: "±0.003 mm positioning, ±0.002 mm repeatability",
        capacity: "Max Ø330mm × 520mm turning, dual-spindle simultaneous machining",
        travelRange: "X: 180mm | Z: 560mm | Y: 100mm",
        features: [
            "Main + sub-spindle for complete machining",
            "Y-axis milling capability",
            "Mazak MAZATROL SmoothG CNC",
            "Milling and turning in single setup",
            "Live tooling for off-center features",
            "Chip-to-chip time: 1.5 seconds",
        ],
        applications: [
            "Precision turned shafts and pins",
            "Hydraulic components",
            "Automotive fuel system parts",
            "Fittings and connectors",
            "High-volume production runs",
        ],
        color: "#f59e0b",
    },
    {
        id: "haas-umc",
        name: "Haas UMC-750SS",
        category: "CNC_MILLING",
        brand: "Haas",
        model: "UMC-750SS Super Speed",
        tagline: "High-Speed 5-Axis Vertical Machining",
        description:
            "The Haas UMC-750SS is a super-speed 5-axis vertical machining center optimized for high-speed contouring and rapid material removal. Its high-torque inline direct-drive spindle and fast rapids make it ideal for prototype and production work on complex 5-axis parts. The SS model delivers significantly faster axis moves than the standard UMC-750.",
        yearAcquired: 2022,
        specs: [
            { label: "X-Axis Travel", value: "762", unit: "mm" },
            { label: "Y-Axis Travel", value: "508", unit: "mm" },
            { label: "Z-Axis Travel", value: "508", unit: "mm" },
            { label: "A-Axis Tilt", value: "-35° to +120°", unit: "" },
            { label: "C-Axis Rotation", value: "360°", unit: "continuous" },
            { label: "Spindle Speed", value: "12,000", unit: "RPM" },
            { label: "Spindle Power", value: "22.4", unit: "kW" },
            { label: "Tool Magazine", value: "40+1", unit: "tools" },
            { label: "Rapid Traverse", value: "36", unit: "m/min" },
            { label: "Table Load Capacity", value: "363", unit: "kg" },
        ],
        accuracy: "±0.005 mm positioning, ±0.0025 mm repeatability",
        capacity: "762 × 508 × 508 mm, 363 kg max part weight",
        travelRange: "X: 762mm | Y: 508mm | Z: 508mm | A: -35° to +120° | C: 360°",
        features: [
            "5-axis simultaneous contouring",
            "Inline direct-drive spindle",
            "Haas NGC control system",
            "Rigid tapping at high speeds",
            "Programmable coolant nozzle",
            "Ethernet/internet connectivity for monitoring",
        ],
        applications: [
            "Aluminum aerospace components",
            "Prototype machining",
            "Complex prismatic parts",
            "Die and mold finishing",
            "Medical device manufacturing",
        ],
        color: "#3b82f6",
    },
    {
        id: "haas-st",
        name: "Haas ST-30Y",
        category: "CNC_TURNING",
        brand: "Haas",
        model: "ST-30Y",
        tagline: "Y-Axis Turning Center with Milling",
        description:
            "The Haas ST-30Y is a high-performance turning center with Y-axis live tooling and C-axis, allowing off-center milling, drilling, and tapping operations. Its robust 12,000 RPM live tooling spindle and 24-station turret make it a versatile workhorse for complex turned-milled components.",
        yearAcquired: 2019,
        specs: [
            { label: "Max Turning Diameter", value: "381", unit: "mm" },
            { label: "Max Turning Length", value: "521", unit: "mm" },
            { label: "Spindle Speed", value: "4,000", unit: "RPM" },
            { label: "Live Tooling Speed", value: "12,000", unit: "RPM" },
            { label: "Chuck Size", value: "10", unit: "inch" },
            { label: "Y-Axis Travel", value: "±52.5", unit: "mm" },
            { label: "Boring Bar Capacity", value: "63.5", unit: "mm" },
            { label: "Tool Station", value: "24+1", unit: "tools" },
        ],
        accuracy: "±0.004 mm positioning, ±0.003 mm repeatability",
        capacity: "Max Ø381mm × 521mm, dual-spindle option available",
        travelRange: "X: 216mm | Z: 559mm | Y: ±52.5mm",
        features: [
            "Y-axis live tooling for off-center operations",
            "C-axis for contouring",
            "Haas NGC control",
            "12-station or 24-station turret",
            "Through-spindle coolant",
            "Rigid tapping",
        ],
        applications: [
            "Complex turned-milled parts",
            "Aerospace fittings",
            "Pneumatic/hydraulic manifolds",
            "Precision shafts with keyways",
            "High-volume turned components",
        ],
        color: "#22c55e",
    },
    {
        id: "sodick-robocut",
        name: "Sodick ALC600G",
        category: "EDM",
        brand: "Sodick",
        model: "ALC600G Wire EDM",
        tagline: "Ultra-Precision Wire Electrical Discharge Machining",
        description:
            "The Sodick ALC600G is a linear motor-driven wire EDM delivering unmatched precision for hardened materials and complex profiles. Its wire EDM technology uses electrical sparks to cut conductive materials without mechanical force, enabling intricate geometries impossible with conventional machining. Ideal for tool making, micro-hole drilling, and exotic alloy components.",
        yearAcquired: 2023,
        specs: [
            { label: "X-Axis Travel", value: "600", unit: "mm" },
            { label: "Y-Axis Travel", value: "400", unit: "mm" },
            { label: "Z-Axis Travel", value: "355", unit: "mm" },
            { label: "Max Workpiece Size", value: "800 × 600 × 355", unit: "mm" },
            { label: "Wire Diameter", value: "0.1 – 0.3", unit: "mm" },
            { label: "Surface Finish", value: "Ra 0.1", unit: "μm" },
            { label: "Positioning Accuracy", value: "±0.001", unit: "mm" },
            { label: "Max Cutting Speed", value: "500", unit: "mm²/min" },
        ],
        accuracy: "±0.001 mm positioning, Ra 0.1μm surface finish",
        capacity: "800 × 600 × 355 mm work envelope, up to 120mm thick material",
        travelRange: "X: 600mm | Y: 400mm | Z: 355mm",
        features: [
            "Linear motor drive (no backlash)",
            "Sodick LPG1 linear motor system",
            "Superior surface finish capability",
            "No mechanical cutting force",
            "Can cut hardened tool steel, carbide, exotic alloys",
            "Intelligent corner control",
        ],
        applications: [
            "Precision die and mold components",
            "Micro-hole drilling",
            "Hardened tool steel profiles",
            "Aerospace turbine blade profiles",
            "Medical device precision parts",
        ],
        color: "#a855f7",
    },
    {
        id: "zeiss-cmm",
        name: "Zeiss CONTURA",
        category: "INSPECTION",
        brand: "Zeiss",
        model: "CONTURA 7/10/6",
        tagline: "Coordinate Measuring Machine",
        description:
            "The Zeiss CONTURA is a high-precision coordinate measuring machine (CMM) used for quality inspection and dimensional verification of manufactured parts. Equipped with VAST XXT scanning probe technology, it performs rapid contact scanning and delivers comprehensive 3D measurement data for CMM inspection reports. Essential for ISO 9001 and AS9100 compliance.",
        yearAcquired: 2022,
        specs: [
            { label: "X-Axis Range", value: "700", unit: "mm" },
            { label: "Y-Axis Range", value: "1000", unit: "mm" },
            { label: "Z-Axis Range", value: "600", unit: "mm" },
            { label: "Probe System", value: "VAST XXT", unit: "scanning" },
            { label: "MPE E (ISO 10360-2)", value: "1.5 + L/333", unit: "μm" },
            { label: "Scanning Speed", value: "200", unit: "mm/s" },
            { label: "Max Part Weight", value: "800", unit: "kg" },
            { label: "Temperature Compensation", value: "0.1°C", unit: "resolution" },
        ],
        accuracy: "MPE E = 1.5 + L/333 μm (ISO 10360-2 certified)",
        capacity: "700 × 1000 × 600 mm measurement volume, 800 kg capacity",
        travelRange: "X: 700mm | Y: 1000mm | Z: 600mm",
        features: [
            "VAST XXT continuous analog scanning",
            "ZEISS CALYPSO measurement software",
            "Automated part alignment and GD&T evaluation",
            "Temperature compensation system",
            "Automated probe changing system",
            "CloudPoint and PiWeb reporting",
        ],
        applications: [
            "Incoming material inspection",
            "In-process dimensional verification",
            "Final quality inspection reports",
            "GD&T compliance checking (ASME Y14.5)",
            "Statistical process control (SPC)",
            "Reverse engineering scans",
        ],
        color: "#06b6d4",
    },
    {
        id: "hexagon-optimus",
        name: "Hexagon OPTIV Performance",
        category: "INSPECTION",
        brand: "Hexagon",
        model: "OPTIV Performance 663/773",
        tagline: "Multi-Sensor Measurement System",
        description:
            "The Hexagon OPTIV Performance is a multi-sensor vision and touch-probe measurement system designed for rapid 2D/3D inspection of small to medium-sized parts. Combining video, laser, and tactile probing in a single platform, it delivers fast and accurate measurements for high-throughput quality control.",
        yearAcquired: 2020,
        specs: [
            { label: "X-Axis Range", value: "600", unit: "mm" },
            { label: "Y-Axis Range", value: "600", unit: "mm" },
            { label: "Z-Axis Range", value: "300", unit: "mm" },
            { label: "Video Accuracy", value: "1.8 + L/250", unit: "μm" },
            { label: "Touch Probe Accuracy", value: "1.5 + L/300", unit: "μm" },
            { label: "Laser Scanner", value: "WS 30", unit: "wide range" },
            { label: "Stage Speed", value: "200", unit: "mm/s" },
            { label: "Max Part Weight", value: "150", unit: "kg" },
        ],
        accuracy: "Video: 1.8 + L/250 μm | Touch probe: 1.5 + L/300 μm",
        capacity: "600 × 600 × 300 mm measurement volume, multi-sensor fusion",
        travelRange: "X: 600mm | Y: 600mm | Z: 300mm",
        features: [
            "Multi-sensor: video + touch probe + laser",
            "ZEISS MESSENGER software integration",
            "Automatic edge detection and feature measurement",
            "Multi-part programming and batch inspection",
            "LED ring illumination + coaxial + profile lighting",
            "CAD-based measurement programming",
        ],
        applications: [
            "2D profile and contour measurement",
            "High-throughput batch inspection",
            "Stamping and sheet metal verification",
            "Small turned/milled part inspection",
            "First article inspection (FAI)",
        ],
        color: "#ec4899",
    },
];

export const ACQUISITION_TIMELINE: AcquisitionEvent[] = [
    {
        year: 2019,
        machine: "Haas ST-30Y",
        category: "CNC_TURNING",
        description: "Expanded turning capabilities with Y-axis live tooling for complex turned-milled components.",
    },
    {
        year: 2020,
        machine: "Mazak QTN 250 MSY",
        category: "CNC_TURNING",
        description: "Multi-tasking turning center for dual-spindle simultaneous machining of precision components.",
    },
    {
        year: 2020,
        machine: "Hexagon OPTIV Performance",
        category: "INSPECTION",
        description: "Multi-sensor measurement system for high-throughput batch inspection.",
    },
    {
        year: 2021,
        machine: "Mazak Variaxis i-800",
        category: "CNC_MILLING",
        description: "Full 5-axis simultaneous machining for aerospace impellers and complex multi-surface parts.",
    },
    {
        year: 2022,
        machine: "Haas UMC-750SS",
        category: "CNC_MILLING",
        description: "Super-speed 5-axis center for high-speed prototyping and production contouring.",
    },
    {
        year: 2022,
        machine: "Zeiss CONTURA CMM",
        category: "INSPECTION",
        description: "Precision coordinate measuring machine for ISO 9001 and AS9100 quality compliance.",
    },
    {
        year: 2023,
        machine: "Sodick ALC600G Wire EDM",
        category: "EDM",
        description: "Ultra-precision wire EDM for hardened materials and micro-geometry profiles.",
    },
];

export const CATEGORY_LABELS: Record<string, string> = {
    CNC_MILLING: "CNC Milling",
    CNC_TURNING: "CNC Turning",
    EDM: "Electrical Discharge",
    INSPECTION: "Inspection & Metrology",
};

export const CATEGORY_ICONS: Record<string, string> = {
    CNC_MILLING: "⚙",
    CNC_TURNING: "⊕",
    EDM: "⚡",
    INSPECTION: "◎",
};