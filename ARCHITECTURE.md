# ARCHITECTURE.md — Brillnex Landing Page

> **Last Updated:** 2026-05-26  
> **Version:** 1.0.0

---

## 1. High-Level Architecture

```
┌──────────────────────────────────────────────────────────┐
│                     Vercel CDN                           │
│                  (Static Hosting)                        │
└──────────────────────┬───────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────┐
│                   Vite Build                             │
│           (Bundler + Dev Server + HMR)                   │
└──────────────────────┬───────────────────────────────────┘
                       │
          ┌────────────┴────────────┐
          ▼                         ▼
┌──────────────────┐     ┌──────────────────────┐
│   index.html     │     │     src/             │
│   (Entry Point)  │     │   (Application Code) │
└──────────────────┘     └──────────────────────┘
```

This is a **client-side single-page application (SPA)** with no backend. All routing is handled via anchor scroll links. External communication happens exclusively through WhatsApp deep links.

---

## 2. Directory Structure

```
brillnex-landing/
├── index.html                 # HTML entry point (Vite injects main.jsx)
├── package.json               # Dependencies and scripts
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind theme (brand colours, animations, fonts)
├── postcss.config.js          # PostCSS pipeline (Tailwind + Autoprefixer)
├── eslint.config.js           # ESLint rules
├── PROJECT_CONTEXT.md         # Project context documentation
├── ARCHITECTURE.md            # This file
│
├── public/                    # Static assets (served at root /)
│   ├── logo.jpg               # Brillnex logo (favicon + branding)
│   ├── favicon.svg            # SVG favicon
│   └── icons.svg              # Shared SVG sprite
│
├── src/                       # Application source code
│   ├── main.jsx               # React DOM mount point
│   ├── index.css              # Global styles (fonts, Tailwind base, utilities)
│   ├── App.jsx                # Root component (page layout + all sections)
│   ├── HoverButton.jsx        # Reusable CTA button with hover interaction
│   ├── CinematicFooter.jsx    # Footer component with GSAP animations
│   └── assets/                # Bundled assets (processed by Vite)
│       ├── hero.png           # Hero section illustration
│       ├── react.svg          # React logo (unused, from scaffold)
│       └── vite.svg           # Vite logo (unused, from scaffold)
│
├── dist/                      # Production build output (gitignored)
└── .vercel/                   # Vercel deployment config
```

---

## 3. Component Architecture

### Component Tree

```
index.html
└── main.jsx
    └── <App />                          ← Root component (src/App.jsx)
        ├── Top Notification Bar         ← Inline JSX (early-bird CTA)
        ├── <NavHeader />                ← Desktop navigation (sliding tabs)
        │   ├── <Tab />                  ← Individual nav tab (scroll link)
        │   └── <Cursor />               ← Animated tab indicator (framer-motion)
        ├── Mobile Navigation            ← Inline JSX (hamburger menu)
        ├── Hero Section                 ← Inline JSX
        │   ├── <FloatingPaths />        ← Animated SVG background paths
        │   └── <HoverButton />          ← Primary CTA
        ├── Trusted By (Marquee)         ← Inline JSX (auto-scrolling logos)
        ├── Courses Section              ← Inline JSX (tabbed course catalogue)
        │   └── Course Cards             ← Mapped from courseData
        │       └── <HoverButton />      ← "Talk to Mentor" CTA → WhatsApp
        ├── What We Offer                ← Inline JSX (feature grid)
        ├── Why Choose Us                ← Inline JSX (metrics)
        ├── Outcomes Section             ← Inline JSX (results showcase)
        └── <CinematicFooter />          ← Footer (src/CinematicFooter.jsx)
```

### Component Responsibilities

| Component            | File                    | Responsibility                                                  |
|----------------------|-------------------------|-----------------------------------------------------------------|
| `App`                | `App.jsx`               | Root layout, state management, course data, all page sections   |
| `FloatingPaths`      | `App.jsx`               | Animated SVG background decoration for the hero section         |
| `NavHeader`          | `App.jsx`               | Desktop navigation bar with sliding tab indicator               |
| `Tab`                | `App.jsx`               | Individual navigation tab (measures width for cursor animation) |
| `Cursor`             | `App.jsx`               | Animated highlight that follows the active nav tab              |
| `HoverButton`        | `HoverButton.jsx`       | Reusable CTA button — red default, white+red-border on hover   |
| `CinematicFooter`    | `CinematicFooter.jsx`   | Full-featured footer with GSAP scroll-triggered animations      |

---

## 4. Styling Architecture

### Layer Hierarchy

```
1. Tailwind Base          → index.css @layer base    (resets, scrollbar, font-family)
2. Tailwind Utilities     → index.css @layer utilities (glass effects, glow, grid mesh)
3. Tailwind Config Theme  → tailwind.config.js       (brand colours, custom animations)
4. Component Classes      → Tailwind utility classes in JSX
5. Inline Styles          → React state-driven styles (HoverButton hover transitions)
```

### Design System Tokens (tailwind.config.js)

| Category    | Token                | Value                                  |
|-------------|----------------------|----------------------------------------|
| Colour      | `brand-600`          | `#e11d48` (Corporate Red)              |
| Colour      | `slate-950`          | `#050506` (Deep Black)                 |
| Font        | `sans`               | `Outfit, Inter, system-ui, sans-serif` |
| Animation   | `marquee`            | 25s linear infinite translateX          |
| Animation   | `glow-pulse`         | 3s ease-in-out infinite opacity+blur    |
| Animation   | `pulse-slow`         | 8s cubic-bezier pulse                   |

### Custom Utilities (index.css)

| Utility Class       | Purpose                              |
|----------------------|--------------------------------------|
| `.text-glow`         | Red text-shadow for emphasis         |
| `.glass-dark`        | Dark glassmorphism panel             |
| `.glass-light`       | Light glassmorphism panel            |
| `.bg-radial-glow`    | Radial gradient ambient blob         |
| `.bg-grid-mesh`      | Light grid pattern overlay           |
| `.bg-grid-mesh-dark` | Dark grid pattern overlay            |

### Styling Rules

> [!IMPORTANT]
> - Use **Tailwind classes** for layout, spacing, typography, and static appearance
> - Use **inline styles** (via React state) for interactive state changes (e.g., hover colour transitions)
> - Never inject `<style>` tags for state-driven styling — this causes CSS specificity conflicts with Tailwind
> - Custom utility classes go in `index.css` under `@layer utilities`

---

## 5. Animation Strategy

| Library         | Scope                 | Usage Pattern                                              |
|-----------------|-----------------------|------------------------------------------------------------|
| **Framer Motion** | Hero + Navigation   | Declarative `<motion.X>` components, `animate` prop        |
| **GSAP**          | Footer only         | `gsap.timeline()` with `ScrollTrigger` inside `useEffect`  |
| **CSS/Tailwind**  | Everywhere          | `transition-*`, `animate-*`, `@keyframes` in config        |
| **Inline React**  | HoverButton         | State-driven `style` prop with `transition: all 0.3s ease` |

> [!WARNING]
> Do NOT mix animation libraries on the same element. Each element should use exactly one animation approach.

---

## 6. Data Flow

```
courseData (static object in App.jsx)
    │
    ├── courseData.software[]   → "Software" tab
    ├── courseData.data[]       → "Data" tab
    └── courseData.ai[]         → "AI & Security" tab
           │
           ▼
    Course Card (map)
           │
           ├── title, university, duration, format, price, rating, reviews
           │
           └── <HoverButton as="a" href={WhatsApp deeplink}>
                    │
                    └── Pre-filled WhatsApp message with course.title
```

### State Management

| State Variable      | Scope     | Purpose                              |
|---------------------|-----------|--------------------------------------|
| `isMobileMenuOpen`  | `App`     | Toggle mobile hamburger menu         |
| `activeTab`         | `App`     | Currently selected course category   |
| `position`          | `NavHeader` | Sliding cursor position/width     |
| `hovered`           | `HoverButton` | Red ↔ white hover state toggle  |

> No global state management library is used. All state is component-local via `useState`.

---

## 7. External Communication

| Channel   | Mechanism                     | Endpoint                                 |
|-----------|-------------------------------|------------------------------------------|
| WhatsApp  | `<a href="https://wa.me/...">` | `wa.me/917204398855`                    |
| Fonts     | CSS `@import`                 | `fonts.googleapis.com`                   |

There is **no backend, no API layer, no database, no authentication** in the current version. The application is entirely static.

---

## 8. Key Architectural Decisions

### ADR-001: Inline Styles for Hover Interactions

**Context:** Tailwind's `bg-white` utility sets `background-color`, but the previous `hb-idle` class used `background` (shorthand with gradient). The shorthand includes `background-image`, which `background-color` alone cannot override, causing the hover state to fail silently.

**Decision:** Use React state-driven inline `style` prop for interactive colour transitions in `HoverButton`.

**Consequence:** Hover transitions work reliably across all browsers. Inline styles always win CSS specificity.

### ADR-002: Single-File Section Architecture

**Context:** All page sections (hero, courses, features, outcomes) live in `App.jsx` as inline JSX rather than separate component files.

**Decision:** Keep sections inline for now. Extract to separate components only when a section needs its own state, side effects, or is reused across multiple pages.

**Consequence:** Simpler import graph. `App.jsx` is large (~690 lines) but all sections share access to `courseData` and `activeTab` state without prop drilling.

### ADR-003: Dual Animation Libraries

**Context:** Framer Motion is ergonomic for declarative React animations. GSAP is required for the footer's complex scroll-triggered timeline.

**Decision:** Use Framer Motion as the default. Use GSAP only inside `CinematicFooter` where its timeline API is necessary.

**Consequence:** Two animation runtimes are bundled. This is acceptable given the landing page context where visual polish is the priority.

---

## 9. Future Considerations

- **Component extraction:** When `App.jsx` exceeds ~800 lines, extract sections into a `src/sections/` directory
- **Routing:** If multi-page support is needed, add `react-router-dom`
- **CMS integration:** Course data could move to a headless CMS (Sanity, Strapi) with a build-time fetch
- **Analytics:** Add Google Analytics or Vercel Analytics for conversion tracking
- **Backend:** If form submissions or user accounts are needed, introduce a `src/api/` layer

---

## 10. File Change Log

| Date       | File(s) Changed                  | Change Description                                          |
|------------|----------------------------------|-------------------------------------------------------------|
| 2026-05-25 | `App.jsx`, `CinematicFooter.jsx` | Initial build — full landing page with cinematic footer     |
| 2026-05-26 | `HoverButton.jsx`                | Created reusable CTA button with hover interaction          |
| 2026-05-26 | `App.jsx`                        | Integrated HoverButton, "Talk to Mentor" label, WhatsApp links |
| 2026-05-26 | `HoverButton.jsx`                | Refactored to inline styles (fixed CSS specificity issue)   |
| 2026-05-26 | `App.jsx`                        | Replaced WhatsApp SVG with `MessageSquare` icon             |
| 2026-05-26 | `PROJECT_CONTEXT.md`             | Created project context documentation                       |
| 2026-05-26 | `ARCHITECTURE.md`                | Created architecture documentation (this file)              |
