# Implementation Plan: List Grader MVP

**Branch**: `002-list-grader` | **Date**: 2026-02-05 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `/specs/002-list-grader/spec.md`

---

## Summary

Implement the **List Grader MVP** - the flagship feature enabling users to submit army lists and receive AI-powered grades from the Meta-Oracle backend. This is a static/vanilla JS implementation per Portal Constitution (Rule X: Portal Static Fidelity).

**Technical Approach**:
- Create new `platform/grader.html` page with input form and results display
- Implement vanilla JS module (`assets/js/grader.js`) for form handling and API integration
- Mock API responses initially (Meta-Oracle API contract-first development)
- Add Playwright E2E tests for all user flows

---

## Technical Context

**Language/Version**: JavaScript ES2020+ (Vanilla JS)  
**Primary Dependencies**: Firebase SDK v10 (for auth), Vite 7 (build)  
**Storage**: Firebase Authentication state, LocalStorage for anonymous session grading  
**Testing**: Playwright (E2E), Vitest (unit)  
**Target Platform**: Web browsers (Mobile-first responsive)  
**Project Type**: Web (static HTML/CSS/JS portal)  
**Performance Goals**: Grade response displayed within 15 seconds (p95 API latency)  
**Constraints**: Zero framework dependencies, GCP Free Tier only, offline graceful degradation  
**Scale/Scope**: 100 concurrent users, 10 grading requests/second peak

### Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Rule 19**: Tech Spec approved & TDD tests failing? *(spec.md approved, tests to be written)*
- [x] **Economic Prime Directive**: No standing monthly costs (GCP Free Tier)? *(Firebase free tier only)*
- [x] **Async-First**: All I/O asynchronous? *(fetch API for Meta-Oracle calls)*
- [x] **Static Fidelity**: Vanilla JS/CSS (no bloated frameworks)? *(Pure vanilla JS implementation)*
- [x] **AAA Pattern**: Test structure compliant? *(Playwright tests follow AAA)*

---

## Project Structure

### Documentation (this feature)

```text
specs/002-list-grader/
├── spec.md              # Feature specification
├── plan.md              # This file
├── checklists/
│   └── requirements.md  # Quality validation checklist
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
platform/
├── grader.html          # [NEW] List Grader page
├── css/
│   └── grader.css       # [NEW] Grader-specific styles
└── js/
    └── grader.js        # [NEW] Grader JavaScript module

assets/
└── js/
    ├── grader-service.js   # [NEW] List validation & API client
    └── list-parser.js      # [NEW] BattleScribe/text list parser

tests/
├── list-grader.spec.ts       # [NEW] E2E tests for grader flows
└── unit/
    └── grader-service.spec.ts # [NEW] Unit tests for service logic
```

**Structure Decision**: Single-Page Web Application pattern, following existing `platform/` directory structure established by `dashboard.html` and `warscribe.html`.

---

## Proposed Changes

### UI Layer (platform/)

#### [NEW] `platform/grader.html`
- Full page with List Grader UI
- Text area for army list input
- File upload button for BattleScribe XML (.ros, .rosz)
- "Grade My List" CTA button
- Results panel with letter grade, summary, and detail sections
- Loading states and error handling
- Responsive design matching platform design system

#### [NEW] `platform/css/grader.css`
- Grader-specific component styles
- Grade badge styling (A-F color-coded)
- Matchup cards styling
- Loading spinner and skeleton states

#### [NEW] `platform/js/grader.js`
- ES Module for grader page interactivity
- Form submission handler
- Results rendering
- History persistence for authenticated users

---

### Service Layer (assets/js/)

#### [NEW] `assets/js/grader-service.js`
- `gradeArmyList(listText)` - Main grading function
- `validateListFormat(listText)` - Input validation
- `parseMetaOracleResponse(response)` - Response transformation
- Mock API for development (switches to real API via feature flag)

#### [NEW] `assets/js/list-parser.js`
- `parseBattleScribeXML(xmlString)` - Parse .ros/.rosz XML format
- `parseTextList(textString)` - Parse plain text format
- `detectListFormat(input)` - Auto-detect input format

---

### Testing Layer (tests/)

#### [NEW] `tests/list-grader.spec.ts`
Playwright E2E tests covering:
- Page loads correctly
- Submit valid list, receive grade
- Error handling for invalid input
- Loading state displays during grading
- Detailed analysis view expand/collapse
- Anonymous vs authenticated user flows

#### [NEW] `tests/unit/grader-service.spec.ts`
Vitest unit tests covering:
- List validation logic
- BattleScribe XML parsing
- API response transformation
- Error state handling

---

## Verification Plan

### Automated Tests

#### E2E Tests (Playwright)
```bash
npm run test -- --grep "List Grader"
```
**Coverage**:
- Grader page loads (200 response)
- Valid list submission returns grade
- Invalid input shows error message
- Loading state displays correctly
- Detail panel toggles on click

#### Unit Tests (Vitest)
```bash
npm run test:unit
```
**Coverage**:
- `validateListFormat()` - valid/invalid inputs
- `parseBattleScribeXML()` - sample XML parsing
- `parseTextList()` - plain text parsing
- `gradeArmyList()` - mock API integration

### Manual Verification

1. **Start dev server**: `npm run dev`
2. **Navigate to grader**: Open `http://localhost:5173/platform/grader.html`
3. **Test happy path**:
   - Paste sample army list text
   - Click "Grade My List"
   - Verify grade badge appears (A-F)
   - Click "View Details" to expand analysis
4. **Test error states**:
   - Submit empty input → "Please enter your army list" error
   - Submit malformed text → validation error message
5. **Test responsive**:
   - Resize browser to mobile width (375px)
   - Verify no horizontal scrolling
   - Verify all controls remain usable

---

## Complexity Tracking

> No Constitution violations requiring justification.

---

## Dependencies

| Dependency | Status | Required For |
|------------|--------|--------------|
| Meta-Oracle API | Mock initially | Grading backend |
| Firebase Auth | Available | Authenticated features |
| Design System | Available | UI styling tokens |
| Feature Flags | Available | Mock/live API toggle |

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Meta-Oracle API not ready | Mock API with realistic responses |
| Parser complexity for all formats | Start with text-only, add BattleScribe incrementally |
| Mobile usability | Design mobile-first, test at 375px |
