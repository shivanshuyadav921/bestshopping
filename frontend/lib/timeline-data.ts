import type { TimelineSection } from "@/types/timeline";

export const TIMELINE_SECTIONS: TimelineSection[] = [
  {
    id: "sec-origins",
    number: "01",
    title: "Company Origins",
    description: "The founding story of Prema Engineering Works, starting from manual precision tooling and conventional job works.",
    icon: "oem",
    entries: [
      {
        id: "ent-origins-1",
        year: "2005",
        title: "Workshop Establishment",
        subtitle: "Founding of the Prema workshop",
        description: "Established in a 1,200 sq.ft. facility with manual lathes and indexing milling machines to produce basic custom machinery components.",
        icon: "oem",
        category: "origins",
        metrics: [
          { label: "Floor Space", value: "1,200 sq.ft", description: "Initial workshop footprint" },
          { label: "Manual Lathes", value: "3 Units", description: "Conventional capacity" }
        ],
        details: [
          "Founded by a team of three precision machinist specialists.",
          "Focused on manufacturing custom bushings, guide pins, and simple shafts.",
          "Established initial QA inspection using manual micrometers and vernier calipers."
        ],
        highlight: true
      },
      {
        id: "ent-origins-2",
        year: "2007",
        title: "First OEM Supplier Contract",
        subtitle: "Entering the heavy machinery supply chain",
        description: "Secured a long-term supply agreement for heavy machinery bushings and custom shafts with a regional agricultural equipment OEM.",
        icon: "drawing",
        category: "origins",
        metrics: [
          { label: "Contract Value", value: "Tier 1 Supplier", description: "Direct OEM onboarding" },
          { label: "Delivery Target", value: "98.5%", description: "Contractual SLA requirement" }
        ],
        details: [
          "Developed specialized tooling fixtures to accelerate conventional output.",
          "Onboarded two additional senior tool-and-die makers.",
          "Achieved a 99.1% quality acceptance rate during initial audit."
        ]
      }
    ]
  },
  {
    id: "sec-evolution",
    number: "02",
    title: "Manufacturing Evolution",
    description: "Our transition from manual conventional tooling to computerized numerical controls (CNC) and multi-axis precision automation.",
    icon: "machining",
    entries: [
      {
        id: "ent-evolution-1",
        year: "2011",
        title: "CNC Integration & Digital Automation",
        subtitle: "Entering the age of CNC machining",
        description: "Commissioned the first Haas VF-3 Vertical Milling Center and Mazak CNC turning center, transitioning the core shop floor from manual operation to software-driven execution.",
        icon: "machining",
        category: "evolution",
        metrics: [
          { label: "Haas VF-3 CNC", value: "1 Unit", description: "3-axis machining capacity" },
          { label: "Part Precision", value: "±0.020mm", description: "New standard repeatability" }
        ],
        details: [
          "Trained conventional machinists in G-code programming and CAD/CAM setup.",
          "Reduced cycle times for complex gear blanks by 45%.",
          "Implemented CAD-driven digital drawing controls."
        ],
        highlight: true
      },
      {
        id: "ent-evolution-2",
        year: "2015",
        title: "Multi-Axis & Dual Spindle Turning",
        subtitle: "Expansion of complex geometries",
        description: "Acquired advanced dual-spindle CNC turning centers and integrated Mastercam CAD/CAM software to program complex profiles in a single setup.",
        icon: "cad",
        category: "evolution",
        metrics: [
          { label: "CNC Tooling Lines", value: "6 Units", description: "Total automated machines" },
          { label: "Cycle Time Reduction", value: "60%", description: "For multi-stage shafts" }
        ],
        details: [
          "Eliminated secondary handling for turned parts using live tooling configurations.",
          "Implemented tool life monitoring and automated offset compensations.",
          "Standardized heat treatment tempering cycles for high-tensile components."
        ]
      }
    ]
  },
  {
    id: "sec-machines",
    number: "03",
    title: "Machine Acquisitions",
    description: "Chronology of advanced tooling, multi-axis machining centers, and wire EDM additions to the shop floor.",
    icon: "gear-part",
    entries: [
      {
        id: "ent-machines-1",
        year: "2013",
        title: "Heavy CNC Mill-Turn Center",
        subtitle: "Onboarding heavy-duty turning capacity",
        description: "Acquired the Mazak Quick Turn 250, enabling high-torque machining of superalloys and large diameter components.",
        icon: "shaft-part",
        category: "machines",
        metrics: [
          { label: "Spindle Power", value: "15 kW", description: "High-load capabilities" },
          { label: "Max Turn Ø", value: "350mm", description: "Expanded envelope size" }
        ],
        details: [
          "Equipped with live tooling to perform milling, drilling, and tapping on a single machine.",
          "Optimized for turning AISI 4140 alloy steels and tool-grade materials."
        ]
      },
      {
        id: "ent-machines-2",
        year: "2020",
        title: "Sub-Micron Wire EDM Integration",
        subtitle: "Unlocking electrical discharge machining",
        description: "Commissioned the Fanuc Robocut C400iB wire-cut EDM, allowing precision profiling of hardened metals down to 2µm tolerances.",
        icon: "precision",
        category: "machines",
        metrics: [
          { label: "EDM Precision", value: "2µm", description: "Sub-micron accuracy" },
          { label: "Table Load", value: "500kg", description: "Maximum work envelope weight" }
        ],
        details: [
          "Allows stress-free cutting of aerospace-grade titanium and carbide dies.",
          "Enabled internal spline and micro-slot geometries previously impossible via milling.",
          "Features automated wire threading for unattended overnight operations."
        ],
        highlight: true
      },
      {
        id: "ent-machines-3",
        year: "2023",
        title: "5-Axis Simultaneous Mill-Turn Complex",
        subtitle: "Onboarding the Mazak Integrex i-100",
        description: "Integrated our flagship 5-axis multitasking machining center with synchronous B-axis head rotation, enabling complete single-setup manufacturing of aerospace impeller blades.",
        icon: "gear-part",
        category: "machines",
        metrics: [
          { label: "Spindle Speed", value: "12,000 RPM", description: "High-speed milling" },
          { label: "Control Axes", value: "5 Simultaneous", description: "Full continuous pathing" }
        ],
        details: [
          "Reduced setup errors to absolute zero by replacing 4 separate operations with a single process.",
          "Integrated adaptive feedrate control to protect delicate micro-cutters."
        ]
      }
    ]
  },
  {
    id: "sec-certifications",
    number: "04",
    title: "Certification History",
    description: "Building credibility and trust through standard quality management certifications and aerospace audits.",
    icon: "certification",
    entries: [
      {
        id: "ent-cert-1",
        year: "2013",
        title: "ISO 9001:2008 Certification",
        subtitle: "Quality Management System standardization",
        description: "Passed our first formal international standards audit, certifying all quality inspection protocols, component traceability, and documentation policies.",
        icon: "certification",
        category: "certifications",
        metrics: [
          { label: "Audit Finding", value: "0 Major", description: "Clean audit status" },
          { label: "Traceability", value: "100%", description: "Material certificates" }
        ],
        details: [
          "Standardized material heat numbers, batch logs, and calibration frequencies.",
          "Created formal inspection checklists for in-process and final checks.",
          "Established customer corrective action request (CAR) procedures."
        ]
      },
      {
        id: "ent-cert-2",
        year: "2021",
        title: "Aerospace AS9100D Certification",
        subtitle: "Adopting global aviation and defense standards",
        description: "Achieved AS9100D accreditation after a comprehensive two-stage audit of our quality control center, confirming compliance with critical aviation standards.",
        icon: "quality",
        category: "certifications",
        metrics: [
          { label: "QA Standards", value: "AS9100D", description: "Aviation/Defense benchmark" },
          { label: "Pass Rate", value: "100%", description: "First-attempt approval" }
        ],
        details: [
          "Implemented strict foreign object debris (FOD) control zones.",
          "Established first-article inspection reporting (FAIR) per AS9002 guidelines.",
          "Built a digital repository for material mill certifications and testing logs."
        ],
        highlight: true
      }
    ]
  },
  {
    id: "sec-industries",
    number: "05",
    title: "Industry Expansion",
    description: "Developing specialized manufacturing capabilities to cater to medical, pharmaceutical, marine, and defense sectors.",
    icon: "precision",
    entries: [
      {
        id: "ent-ind-1",
        year: "2016",
        title: "Medical Device Components Onboarding",
        subtitle: "Entering biocompatible manufacturing",
        description: "Began manufacturing medical-grade stainless steel (316L) pump rotors and titanium orthopedic housing prototypes requiring ultra-smooth finishes.",
        icon: "pharma",
        category: "industries",
        metrics: [
          { label: "Surface Finish", value: "Ra 0.4µm", description: "Mirror-polish requirement" },
          { label: "Material Type", value: "316L Stainless", description: "Biocompatible alloys" }
        ],
        details: [
          "Developed chemical passivation protocols for component surfaces.",
          "Built high-accuracy concentricity inspection fixtures to verify cylindrical rotor tolerances."
        ]
      },
      {
        id: "ent-ind-2",
        year: "2018",
        title: "Aerospace Superalloy Processing",
        subtitle: "Machining Inconel and Titanium Grade 5",
        description: "Approved for the fabrication of complex aerospace brackets, exhaust sensor housings, and fuel manifold connectors using Inconel 718 and Titanium Grade 5.",
        icon: "precision",
        category: "industries",
        metrics: [
          { label: "Tensile Strength", value: "1100+ MPa", description: "Superalloy hardness level" },
          { label: "Tooling Life", value: "Extended", description: "Custom insert geometry" }
        ],
        details: [
          "Optimized cutting parameters using high-pressure through-spindle coolant to prevent work hardening.",
          "Machined high-criticality components with strict wall thickness tolerances down to 0.8mm."
        ],
        highlight: true
      }
    ]
  },
  {
    id: "sec-achievements",
    number: "06",
    title: "Major Achievements",
    description: "Milestones celebrating product delivery volume, zero-failure track records, and operational efficiency indices.",
    icon: "quality",
    entries: [
      {
        id: "ent-ach-1",
        year: "2019",
        title: "50,000 Precision Shafts Delivered",
        subtitle: "Zero structural failures track record",
        description: "Reached the milestone of shipping our 50,000th precision shaft, boasting a verified field failure rate of exactly 0.00% over a five-year service life.",
        icon: "shaft-part",
        category: "achievements",
        metrics: [
          { label: "Shafts Delivered", value: "50,000+", description: "Total cumulative volume" },
          { label: "Field Failure Rate", value: "0.00%", description: "5-year reliability index" }
        ],
        details: [
          "Monitored shaft fatigue lives under simulate load tests.",
          "Supplied to multiple critical automation lines in the packaging and pharmaceutical sectors."
        ]
      },
      {
        id: "ent-ach-2",
        year: "2025",
        title: "100,000 Flight-Ready Components Milestone",
        subtitle: "Supplying major commercial aviation projects",
        description: "Successfully shipped our 100,000th flight-certified structural fastener and sensor mount assembly, maintaining a 99.98% quality acceptance rate.",
        icon: "quality",
        category: "achievements",
        metrics: [
          { label: "Flight-Certified", value: "100k+ Parts", description: "Cumulative aviation parts" },
          { label: "QMS Acceptance", value: "99.98%", description: "Customer incoming QA rate" }
        ],
        details: [
          "Each part is individually laser-marked with a QR code referencing its specific chemical and dimensional mill certifications.",
          "Established automated 3D CMM inspection loops verifying dimensions in under 3 minutes."
        ],
        highlight: true
      }
    ]
  }
];
