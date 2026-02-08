# Specification: Component Library (v0.1.0)

**Feature ID:** 005-component-library
**Milestone:** v0.1.0 — Foundation
**Priority:** P0
**Status:** Specified
**Target Date:** Feb 10, 2026

---

## 1. Problem Statement

The Vindicta-Portal requires a reusable, modular component library built on
vanilla JS + CSS that implements the design system (Amber-500 accent, dark
mode, Outfit font, animated gradients). Without a centralized component
library, UI development will be inconsistent and slow.

---

## 2. Vision

Build a design-system-driven component library providing the foundational
UI elements (cards, buttons, modals, navigation, stat blocks) needed by
all Portal features.

---

## 3. User Stories

### US-01: Design Tokens

> As a **frontend developer**,
> I want **CSS custom properties** defining the design system,
> So that **all components use consistent colors, spacing, and typography**.

**Acceptance Criteria:**

- [ ] CSS variables for: colors (amber-500, dark backgrounds), spacing scale,
      typography (Outfit font family, weight, sizes), border radius, shadows
- [ ] Dark mode as default, light mode toggle support
- [ ] Animated gradient background available as utility class

### US-02: Navigation Component

> As a **Portal user**,
> I want a **responsive navigation bar**,
> So that **I can navigate between Portal sections on any device**.

**Acceptance Criteria:**

- [ ] Desktop: horizontal nav with links
- [ ] Mobile: hamburger menu with slide-out drawer
- [ ] Active page indicator
- [ ] Glass-morphism styling

### US-03: Card Component

> As a **Portal user**,
> I want to **view content in styled cards**,
> So that **information is organized and visually appealing**.

**Acceptance Criteria:**

- [ ] `v-card` class with dark background, amber border accent
- [ ] Header, body, footer sections
- [ ] Hover animation (subtle scale + glow)
- [ ] Responsive sizing

### US-04: Button Component

> As a **Portal user**,
> I want **styled buttons** for actions,
> So that **interactive elements are clear and engaging**.

**Acceptance Criteria:**

- [ ] Variants: primary (amber), secondary (outline), danger (red)
- [ ] States: hover, active, disabled, loading
- [ ] Sizes: sm, md, lg
- [ ] Micro-animation on click

### US-05: Stat Block Component

> As a **wargamer**,
> I want to **view unit stats in a formatted stat block**,
> So that **stats are readable and match the familiar tabletop format**.

**Acceptance Criteria:**

- [ ] Renders Vindicta-Core `StatsBlock` data
- [ ] Grid layout: M|T|Sv|W|Ld|OC
- [ ] Invulnerable save highlighted differently
- [ ] Responsive: stacks on narrow screens

### US-06: Modal Component

> As a **Portal user**,
> I want **modal dialogs** for confirmations and forms,
> So that **focused actions don't require page navigation**.

**Acceptance Criteria:**

- [ ] Backdrop overlay with blur
- [ ] Focus trap (accessibility)
- [ ] Close on Escape, click outside
- [ ] Animated entrance/exit

---

## 4. Functional Requirements

### 4.1 Design Tokens (CSS)

```css
:root {
  /* Colors */
  --v-amber-500: #f59e0b;
  --v-bg-primary: #0a0a0a;
  --v-bg-secondary: #1a1a2e;
  --v-bg-card: rgba(26, 26, 46, 0.8);
  --v-text-primary: #f5f5f5;
  --v-text-secondary: #a0a0b0;

  /* Typography */
  --v-font-family: 'Outfit', sans-serif;
  --v-font-size-sm: 0.875rem;
  --v-font-size-md: 1rem;
  --v-font-size-lg: 1.25rem;
  --v-font-size-xl: 1.5rem;

  /* Spacing */
  --v-space-1: 0.25rem;
  --v-space-2: 0.5rem;
  --v-space-3: 0.75rem;
  --v-space-4: 1rem;
  --v-space-6: 1.5rem;
  --v-space-8: 2rem;

  /* Effects */
  --v-border-radius: 0.5rem;
  --v-shadow: 0 4px 6px rgba(0,0,0,0.3);
  --v-glass: rgba(26, 26, 46, 0.6);
  --v-glass-blur: 12px;
}
```

### 4.2 Component API

Each component is a JS class with:
- `constructor(container, options)` — Initialize in container
- `render()` — Render to DOM
- `destroy()` — Cleanup event listeners
- CSS class prefix: `v-` (e.g., `v-card`, `v-btn`, `v-nav`)

---

## 5. Non-Functional Requirements

| Category          | Requirement                          |
| ----------------- | ------------------------------------ |
| **Performance**   | Lighthouse 95+                       |
| **Accessibility** | WCAG 2.1 AA (focus management, ARIA) |
| **Responsive**    | 375px+ (mobile-first)                |
| **Dependencies**  | None (vanilla JS + CSS only)         |
| **Build**         | Vite for bundling                    |

---

## 6. Out of Scope

- Auth UI (v0.2.0)
- List grader component (v0.2.0)
- Game tracker UI (v0.3.0)

---

## 7. Success Criteria

| Metric        | Target             |
| ------------- | ------------------ |
| Lighthouse    | 95+ performance    |
| Components    | 6 core components  |
| Responsive    | Works on 375px+    |
| Design system | All tokens defined |
