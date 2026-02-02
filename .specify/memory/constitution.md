<!--
SYNC IMPACT REPORT
==================
Version change: 0.0.0 → 1.0.0
Bump rationale: Initial constitution creation (MAJOR - first stable version)
Added principles: I. Test-First Visual Development, II. Visual Fidelity, III. Simplicity, IV. Graceful Degradation
Added sections: Core Principles, Development Workflow, Governance
Removed sections: All placeholder content
Templates requiring updates: ✅ Updated plan.md Constitution Check section
Deferred items: None
-->

# Vindicta Portal Constitution

## Core Principles

### I. Test-First Visual Development (NON-NEGOTIABLE)

All visual changes—HTML structure, CSS styling, animations—MUST have corresponding Playwright tests written and approved BEFORE implementation begins.

**Rules**:
- Red-Green-Refactor cycle strictly enforced for UI changes
- Tests verify structural elements, visual styling, and user interactions
- NO visual change may be deployed without passing test coverage

**Rationale**: Prevents regression, ensures design intent is preserved, enables confident refactoring.

**Known Violation**: 2026-02-01 visual overhaul implemented before tests. See [retrospective](file:///c:/Users/bfoxt/Vindicta-Platform/Vindicta-Portal/docs/retrospectives/2026-02-01-visual-overhaul-violation.md).

### II. Visual Fidelity

The Portal MUST maintain premium, cohesive visual design across all pages and viewports.

**Rules**:
- Design system tokens (colors, typography, spacing) defined in `assets/css/design-system.css`
- All pages MUST be responsive (mobile, tablet, desktop breakpoints)
- Club section: warm, community-focused aesthetic
- Platform section: technical, strategic, tool-focused aesthetic
- Landing page: dramatic, immersive gateway

**Rationale**: First impressions matter. The Portal is the face of the Vindicta brand.

### III. Simplicity (YAGNI)

Start with the simplest solution that works. Add complexity only when proven necessary.

**Rules**:
- Static HTML preferred over frameworks where sufficient
- Use existing Firebase infrastructure before adding new services
- Avoid premature abstraction—extract patterns after duplication observed
- Every dependency MUST justify its inclusion

**Rationale**: Reduces maintenance burden, speeds development, keeps hosting costs minimal.

### IV. Graceful Degradation

The Portal MUST remain functional when external services are unavailable.

**Rules**:
- Pages MUST load and display content without JavaScript where feasible
- Remote configuration MUST fall back to hardcoded defaults
- Error states MUST be user-friendly, never expose technical details
- Offline-first mindset for static content

**Rationale**: User experience preserved regardless of network conditions or service outages.

## Development Workflow

### Testing Requirements

| Change Type | Test Requirement |
|-------------|------------------|
| New page | Structural tests + visual regression baseline |
| Styling change | CSS property verification tests |
| Animation | Timing/behavior tests |
| Responsive fix | Viewport-specific tests |

### Deployment Process

1. All tests pass locally (`npx playwright test`)
2. Visual verification on localhost
3. Deploy to Firebase Hosting (`firebase deploy --only hosting`)
4. Verify production site

## Governance

- Constitution supersedes all other documentation
- Amendments require: documentation, justification, version increment
- All PRs MUST verify compliance with these principles
- Violations MUST be documented in retrospectives

**Version**: 1.0.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01
