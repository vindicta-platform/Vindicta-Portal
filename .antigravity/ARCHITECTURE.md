# Vindicta-Portal Architecture

> Agent context artifact for understanding the portal's component structure.

## Technology Stack

- **Build**: Vite 7+
- **Language**: JavaScript ES2020+ (vanilla JS, no framework)
- **Styling**: Vanilla CSS with design tokens in `design-system.css`
- **Backend**: Firebase (Remote Config, Analytics, Hosting)
- **Testing**: Playwright (E2E), Vitest (Unit)

## Directory Structure

```
├── assets/           # Static assets (CSS, JS, images)
│   ├── css/          # Stylesheets including design-system.css
│   └── js/           # JavaScript modules
├── club/             # Club sub-page (community features)
├── platform/         # Platform sub-page (tactical tools)
├── dist/             # Production build output
└── index.html        # Main landing page
```

## Component Graph

```mermaid
graph TD
    A[index.html] --> B[Firebase SDK]
    A --> C[design-system.css]
    A --> D[main.js]
    
    D --> E[Remote Config]
    D --> F[Analytics]
    
    G[/club] --> H[Community Features]
    I[/platform] --> J[Tactical Tools]
    
    J --> K[List Grader UI]
    J --> L[Army Builder]
    J --> M[Match History]
```

## Key Integration Points

| Component     | Integration     | Notes                |
| ------------- | --------------- | -------------------- |
| List Grader   | Meta-Oracle API | POST to `/api/grade` |
| Army Builder  | WARScribe-Core  | Uses notation parser |
| Match History | Vindicta-API    | REST endpoints       |
| Analytics     | Firebase        | Auto-instrumented    |

## Design System Tokens

All UI components must use tokens from `design-system.css`:
- `--color-*` for palette
- `--font-*` for typography
- `--space-*` for spacing
- `--radius-*` for borders
