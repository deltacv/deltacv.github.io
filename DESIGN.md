# deltacv - Design & Technical Styleguide

Documentation of the design system, UI components, layout structures, and visual conventions used across `deltacv.org`.

---

## 1. Core Stack & Architecture

- **Framework:** SvelteKit using Svelte 5 Runes (`$state`, `$props`, `$derived`).
- **Styling:** Tailwind CSS with explicit custom hex values for accurate dark mode UI.
- **Iconography:** `lucide-svelte` (stroke width `2` or `2.5`).
- **Media Asset Pipeline:** Assets (videos, screenshots, hero banners) are served via Cloudflare R2 (`PUBLIC_MEDIA_BASE` pointing to `media.deltacv.org`).
  - Implemented via `$lib/media.ts` helper: `m("path.ext")`.
  - Supports route-awareness and page-level overrides via `+page.ts` load functions (`mediaPrefix: 'eocv-sim'` or `mediaPrefix: 'papervision'`).

---

## 2. Color Palette & Surfaces

The site is strictly dark-themed. Avoid pure light backgrounds or harsh white surfaces.

### Surfaces & Borders
| Token / Usage | Hex / Class | Description |
|---|---|---|
| Main Page Background | `#05070a` | Slightly off-black with subtle radial accent overlays |
| Primary Surfaces | `#0d1117` | Cards, container boxes, code blocks |
| Elevated Surfaces | `#161b22` / `#121016` | Modals, interactive feature panels, popovers |
| Subgrid Lines / Borders | `#30363d` | Subtle 1px borders dividing panels (`border border-[#30363d]`) |

### Typography Colors
- **Headings (H1/H2/H3):** Pure White (`#ffffff` / `text-white`).
- **Primary Body:** High contrast off-white (`#e5e7eb` / `text-gray-200`).
- **Secondary / Subtext:** Muted blue-gray (`#8b949e` / `text-gray-400`).
- **Labels / Badges:** Monospace syntax-highlighted shades (`font-mono`, `text-cyan-400`, `text-amber-400`, `text-emerald-400`).

### Brand Accent Gradients
Each core software project maintains a dedicated accent theme used across buttons, hero titles, borders, and feature highlights:
- **VisionBench:** Cyan / Blue (`from-cyan-400 to-blue-500` / `#22d3ee` -> `#0ea5e9`).
- **VisionGraph:** Amber / Orange (`from-amber-400 to-orange-500` / `#fbbf24` -> `#ea580c`).

---

## 3. Typography & Text Hierarchy

- **Hero & Section Titles:** `Outfit` (`font-black`, `tracking-tighter`). Applied to primary section H1s and H2s.
- **Body Text:** System Sans / Inter (`text-base` to `text-xl`, `leading-relaxed`). Limit line length on wide screens (`max-w-2xl` or `text-balance`).
- **Code & Tech Specs:** Monospace (`font-mono`, `text-xs` / `text-sm`). Used for filenames, CLI commands, inline code spans, and variable tuners.

---

## 4. UI Patterns & Layout Structures

### Blueprint Grid Hero Header
Hero sections feature an engineering grid pattern mixed with a subtle radial gradient:
```css
background-image: 
  radial-gradient(circle at 20% 30%, rgba(34, 211, 238, 0.035), transparent 30%),
  linear-gradient(rgba(48, 54, 61, 0.45) 1px, transparent 2px),
  linear-gradient(90deg, rgba(48, 54, 61, 0.45) 1px, transparent 2px);
background-size: 100% 100%, 80px 80px, 80px 80px;
```
- Includes a pill banner badge (`bannerText`) announcing project updates.
- Uses animated text typing effect for subtitle action verbs (`typingWords={["develop", "test", "tune"]}`).

### Grid & Feature Bento Cards
- Standard layout uses `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`.
- Featured items span 2 columns (`md:col-span-2 lg:col-span-2`).
- Card container style: `bg-[#0d1117] border border-[#30363d] rounded-xl p-8`.

### Live Interactive Mockups
Rather than using static imagery for every feature card, interactive UI elements are simulated directly with Tailwind & SVG:
- **Simulated Windows:** Mac-style window controls (red/yellow/green dots) with dark canvas headers.
- **Node Wiring:** Custom `<NodeConnection />` SVG curve connecting interactive node cards.
- **Variable Tuners:** Animated sliders with live numeric readouts (`blurRadius`, `threshold`).

---

## 5. Micro-Animations & Easing

- **Hover States:** Lift cards on hover (`hover:-translate-y-1 transition-all duration-300`).
- **Mobile Active States:** Touch devices rely on `IntersectionObserver` adding `data-mobile-active="true"` to trigger hover states automatically when scrolled into view.
- **Hero Keyframe Curve:**
```css
cubic-bezier(0.16, 1, 0.3, 1) /* Snappy entry, smooth deceleration */
```

---

## 6. Media System & Asset Routing

All media assets pass through `$lib/media.ts`:
- **Relative Path Resolution:** `m("filename.mp4")` resolves relative to current route or `+page.ts` `mediaPrefix`.
- **Absolute Path Resolution:** `m("/filename.mp4")` bypasses route awareness and fetches directly from `PUBLIC_MEDIA_BASE/filename.mp4`.
- **Media Overrides:** Routes can define `mediaPrefix` in `+page.ts` (`eocv-sim` for VisionBench, `papervision` for VisionGraph) to preserve media server directory paths without renaming remote files.
