# The Design System: Editorial Precision in Augmented Reality

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Precision"**

This design system is built to move beyond the cold, clinical feel of standard AI tools. It embraces a high-end editorial aesthetic where augmented reality meets luxury grooming. We reject the "boxed-in" layout of traditional SaaS. Instead, we use **intentional asymmetry, expansive breathing room, and tonal depth** to create a feeling of sophisticated curation.

The system is designed to feel like a high-fashion digital lookbook. By utilizing radical typography scales and layered surfaces, we guide the user through a journey of self-reinvention. We don't just "detect hair"; we visualize potential through a lens of premium craftsmanship.

---

## 2. Colors & Surface Philosophy
The palette is rooted in sophisticated plums, dusty roses, and deep obsidian tones, providing a "Royal Tech" atmosphere.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to section off content.
Boundaries are defined exclusively through background shifts. A `surface-container-low` card sitting on a `surface` background provides all the definition needed. If you feel the urge to draw a line, use whitespace or a color shift instead.

### Surface Hierarchy & Nesting
Treat the UI as a physical stack of semi-opaque materials. 
- **Base:** `surface` (The foundation).
- **Secondary Content:** `surface-container-low` (Subtle grouping).
- **Primary Cards:** `surface-container` (The main focal point).
- **Floating Modals/AR Overlays:** `surface-container-high` or `highest` (Direct interaction).

### The "Glass & Gradient" Rule
To bridge the gap between UI and AR, use **Glassmorphism**. Floating elements (like AR hairstyle selectors) should use a semi-transparent `surface-variant` with a `backdrop-blur` of 12px-20px. 
*   **Signature Textures:** For Hero CTAs, use a subtle linear gradient from `primary` to `primary_container` at a 135-degree angle. This adds "soul" and prevents the flat-color fatigue of standard apps.

---

## 3. Typography: The Editorial Voice
Our typography creates an authoritative, modern rhythm. We pair **Plus Jakarta Sans** (Display/Headline) for a high-fashion, wide-track feel with **Manrope** (Body/Label) for clinical readability.

*   **The Power Scale:** Use `display-lg` for impactful brand moments, often paired with asymmetric alignment (e.g., left-aligned text with a large right-hand margin).
*   **The Narrative Flow:**
    *   **Headlines (`headline-lg` to `sm`):** Plus Jakarta Sans. Reduced letter spacing (-0.02em) for a tight, professional look.
    *   **Body (`body-lg` to `sm`):** Manrope. Increased line height (1.6) to ensure the technical AI data feels approachable.
    *   **Labels (`label-md`):** Manrope. All-caps with +0.05em tracking for secondary metadata to denote a "technical spec" feel.

---

## 4. Elevation & Depth
Traditional drop shadows are too heavy for an AR-focused experience. We use **Tonal Layering**.

### The Layering Principle
Depth is achieved by "stacking" container tiers. Place a `surface-container-lowest` element inside a `surface-container-low` section to create a soft "inset" look, as if the content is carved into the interface.

### Ambient Shadows
When a floating effect is required (e.g., a hairstyle preview card), use a **Double-Soft Shadow**:
*   **Shadow 1:** 0 4px 20px 0 rgba(on-surface, 0.04)
*   **Shadow 2:** 0 12px 40px 0 rgba(on-surface, 0.08)
The shadow must match the `on-surface` hue to mimic natural light refraction.

### The "Ghost Border" Fallback
If accessibility requires a container boundary, use a **Ghost Border**: The `outline-variant` token at 15% opacity. Never use 100% opaque lines.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`. `xl` (1.5rem) rounded corners. Text is `on_primary`.
*   **Secondary:** Solid `surface-container-highest` with a `Ghost Border`.
*   **Tertiary:** Ghost button (no background) using `primary` text.

### AR Selector Chips
*   **Default:** `surface-container-low` with `label-md` text.
*   **Active:** `primary_container` background with a subtle glow (0 0 15px `surface_tint`).

### Input Fields
*   **Styling:** Forgo the four-sided box. Use a `surface-container-lowest` background with a 2px bottom-weighted `outline-variant` that transitions to `primary` on focus.

### Cards & Lists
*   **Constraint:** Zero dividers. 
*   **The "Vibe":** Use `xl` (1.5rem) corners. Content is separated by 24px-32px of vertical space. For list items, use a hover state of `surface-bright` at 10% opacity to highlight selection.

### Specialized AR Components
*   **The "Scanning" Reticle:** An animated border using `accent` with a `backdrop-blur`.
*   **The Comparison Slider:** A vertical bar using `secondary` to toggle between "Current" and "Detected" hairstyles.

---

## 6. Do’s and Don’ts

### Do:
*   **Use Asymmetry:** Place text on the left and imagery bleeding off the right edge to create a magazine-like feel.
*   **Embrace Negative Space:** If a screen feels "empty," it’s likely working. Don't fill space with unnecessary borders.
*   **Tone-on-Tone:** Use the `primary_fixed` and `primary_fixed_dim` colors for background elements to create a monochromatic, high-end vibe.

### Don’t:
*   **Don't use #000 or #FFF:** Always use the provided tokens (`surface-container-lowest` or `on-surface`) to keep the "Ink & Paper" feel.
*   **Don't use "Standard" Grids:** Avoid perfectly centered 12-column grids for everything. Shift elements 1 or 2 columns to the left/right to create visual tension.
*   **Don't use hard borders:** If you need to separate content, use a 8px or 16px gap—never a line.