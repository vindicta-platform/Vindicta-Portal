# Implementation Plan: Component Library (v0.1.0)

**Spec Reference:** [spec.md](./spec.md)

---

## Proposed Changes

```
assets/
├── css/
│   ├── tokens.css          # Design tokens (CSS custom properties)
│   ├── base.css            # Reset + global styles
│   ├── components/
│   │   ├── nav.css
│   │   ├── card.css
│   │   ├── button.css
│   │   ├── stat-block.css
│   │   └── modal.css
│   └── utilities.css       # Glass, gradient, animation utilities
├── js/
│   ├── components/
│   │   ├── VNav.js
│   │   ├── VCard.js
│   │   ├── VButton.js
│   │   ├── VStatBlock.js
│   │   └── VModal.js
│   └── index.js            # Component registry
```

### Tests (Playwright)

```
tests/
├── components/
│   ├── nav.spec.js
│   ├── card.spec.js
│   ├── button.spec.js
│   ├── stat-block.spec.js
│   └── modal.spec.js
└── visual/
    └── lighthouse.spec.js
```

---

## Verification

```powershell
npm run dev     # Visual check
npm test        # Playwright tests
npx lighthouse http://localhost:5173 --only-categories=performance
```
