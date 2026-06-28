# PREMA ENGINEERING WORKS — Design Philosophy

## Design Direction: Precision Minimalism + Industrial Heritage

### Design Movement
**Bauhaus meets contemporary precision engineering** — clean geometry, functional beauty, and uncompromising attention to detail. Inspired by Swiss design, high-end manufacturing aesthetics (Rolex, Apple), and aerospace engineering documentation.

### Core Principles

1. **Components as Heroes** — Every manufactured part is displayed with museum-quality lighting and detail. Photography/rendering style emphasizes precision, tolerances, and engineering excellence.
2. **Ruthless Clarity** — No decorative flourishes. Every visual element serves a functional purpose. Whitespace is generous and intentional.
3. **Material Authenticity** — Surfaces reflect real materials: brushed steel, precision machining marks, industrial textures. No plastic gradients or playful rounded corners.
4. **Engineering Transparency** — Specifications, tolerances, materials, and capabilities are front-and-center. Visitors immediately understand what PREMA manufactures and why it matters.

### Color Philosophy

**Primary Palette:**
- **Deep Charcoal** (`oklch(0.18 0.01 280)`) — Trust, precision, industrial heritage. Dominant in typography and structural elements.
- **Platinum Silver** (`oklch(0.92 0.002 280)`) — Clean, refined, premium. Background and breathing room.
- **Signal Red** (`oklch(0.55 0.24 30)`) — Accent color for critical information, CTAs, and component highlights. Draws attention without shouting.
- **Brushed Steel** (`oklch(0.72 0.01 280)`) — Subtle accent for borders, dividers, and secondary elements.

**Emotional Intent:** Confidence without arrogance. Premium without pretension. Industrial without coldness.

### Layout Paradigm

**Asymmetric, Component-Focused Grid:**
- Hero section: Full-bleed component showcase with dramatic lighting and minimal text overlay
- Product sections: Staggered layouts alternating component imagery (left/right) with technical specs and capabilities
- Navigation: Minimal top bar, sticky during scroll, disappears on scroll-down to maximize content space
- Sections use 60/40 or 70/30 splits (image-heavy, text-light) rather than centered layouts
- Generous vertical rhythm: sections breathe with 120-160px gaps

### Signature Elements

1. **Component Spotlight** — High-resolution, professionally lit images of actual manufactured parts. Each component gets a dedicated frame with subtle drop shadow and precise typography labeling tolerances/materials.
2. **Technical Specification Cards** — Minimal cards displaying material, tolerance, finish, and application. Typography is small, precise, and hierarchical.
3. **Precision Dividers** — Thin horizontal lines (1-2px) in brushed steel, occasionally interrupted by component silhouettes or technical drawings.
4. **Grid Backgrounds** — Subtle, barely-visible grid pattern (very light gray, 1px lines at 40px intervals) in secondary sections to evoke engineering blueprints without being distracting.

### Interaction Philosophy

- **Hover States:** Subtle lift effect on component cards (shadow deepens, slight scale). No color change—interaction is tactile, not visual.
- **Scroll Behavior:** Components fade in as they enter viewport. Parallax is minimal and purposeful (not gratuitous).
- **CTAs:** Buttons are rectangular, no rounded corners. Hover state: background color shifts, text remains constant. Click feedback is immediate (scale 0.98).
- **Micro-interactions:** Loading states show precision spinners (circular progress, minimal animation). Transitions are 200-250ms, easing is `cubic-bezier(0.23, 1, 0.32, 1)` (snappy out).

### Animation Guidelines

- **Entrance:** Components fade in + slight upward translate (20px) over 400ms when scrolling into view. Staggered by 60ms per item.
- **Hover:** Card lift (shadow increase, no scale) over 180ms. Button press scales to 0.98 over 120ms.
- **Scroll:** Parallax is minimal (10-15% offset) on hero background only. No parallax on text or CTAs.
- **Transitions:** All motion respects `prefers-reduced-motion`. Reduced-motion mode disables parallax and stagger, keeps entrance fades.

### Typography System

**Font Pairing:**
- **Display/Headlines:** Neue Haas Grotesk or similar geometric sans-serif (bold, 700-900 weight) — evokes precision and engineering heritage. Fallback: system sans-serif (bold).
- **Body/UI:** Inter (400-600 weight) — highly legible, neutral, modern. Used for all body text, labels, and UI elements.

**Hierarchy:**
- **H1 (Hero Headline):** 56-64px, 700 weight, letter-spacing -0.02em, line-height 1.1
- **H2 (Section Headlines):** 40-48px, 700 weight, letter-spacing -0.01em, line-height 1.2
- **H3 (Subsections):** 28-32px, 600 weight, letter-spacing 0, line-height 1.3
- **Body:** 16px, 400 weight, line-height 1.6, letter-spacing 0.005em
- **Small/Labels:** 12-14px, 500 weight, letter-spacing 0.05em (uppercase for technical specs)
- **Micro/Captions:** 11px, 400 weight, letter-spacing 0.02em, color: muted foreground

### Brand Essence

**One-Line Positioning:**
*When critical machinery stops, PREMA manufactures the precision component that gets it running again.*

**Personality Adjectives:**
- Reliable
- Meticulous
- Uncompromising

### Brand Voice

**Tone:** Direct, technical, confident. No marketing fluff. Speak to engineers and production managers who understand tolerances and downtime costs.

**Headline Examples:**
- "Precision shafts that hold tolerances other shops can't match."
- "When your production line stops, we manufacture the part that restarts it."
- "Custom gears engineered for your exact specifications."

**Microcopy Examples:**
- "Download specifications" (not "Learn more")
- "Request a quote" (not "Get in touch")
- "ISO 9001 certified manufacturing" (not "We're certified")

### Wordmark & Logo

**Logo Concept:** Bold geometric symbol combining a precision shaft (vertical line with subtle taper) and a gear tooth (angular accent). No text. Monochromatic, works at any size from favicon to hero section. Evokes both engineering precision and industrial heritage.

**Signature Brand Color:** Deep Charcoal (`oklch(0.18 0.01 280)`) — unmistakably PREMA. Used in logo, headlines, and key CTAs.

---

## Implementation Notes

- **Component Photography:** Real manufactured parts photographed with studio lighting (white background, subtle shadows). If photography unavailable, commission high-quality 3D renders.
- **Grid Background:** Use SVG or CSS to render subtle grid pattern. Opacity: 3-5%, color: charcoal. Only in secondary sections.
- **Precision Dividers:** 1px solid brushed steel, full-width with 40px top/bottom margin.
- **Responsive:** Mobile-first. Hero section stacks vertically. Component cards become single-column on mobile. Typography scales proportionally.
- **Performance:** Lazy-load component images. Use WebP with JPEG fallback. Optimize SVGs. Target Lighthouse score: 90+.

---

## Visual Asset Strategy

1. **Hero Background:** Generate premium industrial/precision manufacturing aesthetic — clean, minimal, emphasizing precision and reliability.
2. **Component Showcase Images:** Use real manufactured parts or high-quality 3D renders. Must showcase precision, finish, and engineering detail.
3. **Brand Logo:** Generate bold geometric symbol (precision shaft + gear accent) as PNG with transparent background.
4. **Texture Overlays:** Subtle brushed steel or grid patterns for depth without distraction.
5. **Icons:** Minimal, geometric, consistent with brand aesthetic. Use for capabilities, process steps, and CTAs.
