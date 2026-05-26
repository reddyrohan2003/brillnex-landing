# PROJECT_CONTEXT.md — Brillnex Technologies Landing Page

> **Last Updated:** 2026-05-26  
> **Version:** 1.0.0  
> **Status:** Active Development

---

## 1. Project Overview

**Brillnex Technologies** is an upskilling platform offering courses in software engineering, data science, AI, and cybersecurity. This repository contains the **customer-facing landing page** — a single-page React application designed for high conversion, premium aesthetics, and mobile responsiveness.

### Business Goals

- Drive course enrolments via WhatsApp-based mentor consultations
- Establish brand trust through polished, premium UI
- Showcase the full course catalogue with clear pricing and ratings
- Highlight placement success metrics and company credibility

---

## 2. Tech Stack

| Layer           | Technology                        | Version   |
|-----------------|-----------------------------------|-----------|
| **Runtime**     | React                             | 19.2.6    |
| **Build Tool**  | Vite                              | 8.0.12    |
| **Styling**     | Tailwind CSS (v4 PostCSS plugin)  | 4.3.0     |
| **Animation**   | Framer Motion                     | 12.40.0   |
| **Animation**   | GSAP (GreenSock)                  | 3.15.0    |
| **Icons**       | Lucide React                      | 1.16.0    |
| **Linting**     | ESLint                            | 10.3.0    |
| **Deployment**  | Vercel                            | —         |

### Typography

- **Primary:** Outfit (Google Fonts)
- **Secondary:** Inter (Google Fonts)
- **Fallback:** system-ui → sans-serif

### Brand Colours

| Token          | Hex       | Usage                           |
|----------------|-----------|----------------------------------|
| `brand-600`    | `#e11d48` | Corporate red (primary CTA)      |
| `red-600`      | `#dc2626` | Button fills, accents            |
| `slate-950`    | `#050506` | Dark backgrounds (header/footer) |
| `gray-50`      | `#f9fafb` | Page background                  |

---

## 3. Dependencies

### Production

| Package          | Purpose                                    |
|------------------|--------------------------------------------|
| `react`          | UI component library                       |
| `react-dom`      | DOM renderer                               |
| `framer-motion`  | Declarative animations (hero paths, fades) |
| `gsap`           | Timeline-based animations (footer)         |
| `lucide-react`   | SVG icon system                            |

### Dev

| Package                       | Purpose                   |
|-------------------------------|---------------------------|
| `vite`                        | Dev server + bundler      |
| `@vitejs/plugin-react`        | React Fast Refresh        |
| `tailwindcss`                 | Utility-first CSS         |
| `@tailwindcss/postcss`        | Tailwind v4 PostCSS       |
| `postcss` / `autoprefixer`    | CSS processing pipeline   |
| `eslint` + plugins            | Code quality              |

---

## 4. Environment & Scripts

```bash
# Development
npm run dev          # Starts Vite dev server (default: localhost:5173)

# Production
npm run build        # Outputs to /dist
npm run preview      # Previews production build locally

# Lint
npm run lint         # Runs ESLint
```

---

## 5. Deployment

- **Platform:** Vercel (`.vercel/` directory present)
- **Build command:** `npm run build`
- **Output directory:** `dist/`
- **Framework preset:** Vite

---

## 6. External Integrations

| Integration | Details                                                      |
|-------------|--------------------------------------------------------------|
| WhatsApp    | Deep links to `wa.me/917204398855` with pre-filled messages  |
| Google Fonts| Outfit + Inter loaded via `@import` in `index.css`           |

---

## 7. Development Guidelines

1. **No folder restructuring** without explicit approval
2. **Reuse** existing components (`HoverButton`, `CinematicFooter`, etc.)
3. **Follow naming conventions:** PascalCase for components, camelCase for variables/functions
4. **Inline styles** for state-driven visual changes (avoids CSS specificity conflicts with Tailwind)
5. **Tailwind classes** for layout, spacing, and static styling
6. **Framer Motion** for declarative/entrance animations
7. **GSAP** only inside `CinematicFooter` (scoped timeline animations)
8. **Update this file** and `ARCHITECTURE.md` after any major change
