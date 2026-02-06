# Tasks: List Grader MVP

**Feature**: List Grader MVP  
**Branch**: `002-list-grader`  
**Spec**: [spec.md](./spec.md)  
**Plan**: [plan.md](./plan.md)  
**Created**: 2026-02-05

---

## Task Summary

| ID | Task | Priority | Est. | Status | Issue |
|----|------|----------|------|--------|-------|
| T001 | Create grader.html page structure | P0 | 1hr | [ ] | [#58](https://github.com/vindicta-platform/Vindicta-Portal/issues/58) |
| T002 | Implement grader.css design system | P0 | 1hr | [ ] | [#59](https://github.com/vindicta-platform/Vindicta-Portal/issues/59) |
| T003 | Create list-parser.js module | P0 | 2hr | [ ] | [#60](https://github.com/vindicta-platform/Vindicta-Portal/issues/60) |
| T004 | Create grader-service.js with mock API | P0 | 2hr | [ ] | [#61](https://github.com/vindicta-platform/Vindicta-Portal/issues/61) |
| T005 | Implement grader.js page controller | P0 | 2hr | [ ] | [#62](https://github.com/vindicta-platform/Vindicta-Portal/issues/62) |
| T006 | Add E2E tests (list-grader.spec.ts) | P0 | 2hr | [ ] | [#63](https://github.com/vindicta-platform/Vindicta-Portal/issues/63) |
| T007 | Add unit tests (grader-service.spec.ts) | P1 | 1hr | [ ] | [#65](https://github.com/vindicta-platform/Vindicta-Portal/issues/65) |
| T008 | Implement detailed analysis view | P1 | 2hr | [ ] | [#67](https://github.com/vindicta-platform/Vindicta-Portal/issues/67) |
| T009 | Add file upload for BattleScribe XML | P2 | 2hr | [ ] | [#70](https://github.com/vindicta-platform/Vindicta-Portal/issues/70) |
| T010 | Add grade history for auth users | P2 | 2hr | [ ] | [#73](https://github.com/vindicta-platform/Vindicta-Portal/issues/73) |
| T011 | Integration with live Meta-Oracle API | P3 | 1hr | [ ] | [#74](https://github.com/vindicta-platform/Vindicta-Portal/issues/74) |

**Total Estimated**: ~18 hours


---

## Detailed Tasks

### T001: Create grader.html page structure
**Priority**: P0 | **Estimate**: 1hr | **Depends On**: None

Create the main HTML page for the List Grader feature following the design patterns from `dashboard.html`.

**Acceptance Criteria**:
- [ ] Page loads at `/platform/grader.html`
- [ ] Includes navbar with link to platform index
- [ ] Contains input area (textarea for army list)
- [ ] Contains "Grade My List" button
- [ ] Contains results panel (initially hidden)
- [ ] Contains loading state skeleton
- [ ] Mobile responsive at 375px width

**Files**:
- `[NEW] platform/grader.html`

---

### T002: Implement grader.css design system
**Priority**: P0 | **Estimate**: 1hr | **Depends On**: T001

Create grader-specific CSS following the existing design system tokens.

**Acceptance Criteria**:
- [ ] Grade badge styles for A-F scale (color-coded)
- [ ] Input area styling with glassmorphism effect
- [ ] Button styling matching platform CTA design
- [ ] Results panel with card layout
- [ ] Loading spinner animation
- [ ] Mobile-first responsive styles

**Files**:
- `[NEW] platform/css/grader.css`

---

### T003: Create list-parser.js module
**Priority**: P0 | **Estimate**: 2hr | **Depends On**: None

Implement the army list text parsing module.

**Acceptance Criteria**:
- [ ] `parseTextList(text)` - Extract faction, points, units from plain text
- [ ] `detectListFormat(input)` - Determine if input is text or XML
- [ ] `validateListStructure(parsed)` - Validate minimum required fields
- [ ] Handle common list formats (BattleScribe text export, Notepad lists)

**Files**:
- `[NEW] assets/js/list-parser.js`

---

### T004: Create grader-service.js with mock API
**Priority**: P0 | **Estimate**: 2hr | **Depends On**: T003

Implement the grading service with mock API responses.

**Acceptance Criteria**:
- [ ] `gradeArmyList(listText)` - Main async grading function
- [ ] Mock response generator with realistic grades and analysis
- [ ] Feature flag check for mock vs live API (`GRADER_USE_MOCK_API`)
- [ ] Error handling for invalid input, network errors
- [ ] Response transformation to UI model

**Files**:
- `[NEW] assets/js/grader-service.js`

---

### T005: Implement grader.js page controller
**Priority**: P0 | **Estimate**: 2hr | **Depends On**: T001, T002, T004

Wire up the grader page interactivity.

**Acceptance Criteria**:
- [ ] Form submission handler (prevent default, call grader service)
- [ ] Loading state toggle during grading
- [ ] Results rendering (grade badge, summary, details link)
- [ ] Error state rendering with user-friendly messages
- [ ] Input validation before submission
- [ ] Firebase Feature Flag integration

**Files**:
- `[NEW] platform/js/grader.js`

---

### T006: Add E2E tests (list-grader.spec.ts)
**Priority**: P0 | **Estimate**: 2hr | **Depends On**: T005

Create Playwright E2E tests for the grader page.

**Acceptance Criteria**:
- [ ] Test: Page loads successfully (200 response)
- [ ] Test: Valid list submission returns grade (A-F badge visible)
- [ ] Test: Empty input shows validation error
- [ ] Test: Loading state displays during grading
- [ ] Test: Results panel shows after grading complete
- [ ] Test: Mobile viewport (375px) has no horizontal scroll

**Run Command**:
```bash
npm run test -- tests/list-grader.spec.ts
```

**Files**:
- `[NEW] tests/list-grader.spec.ts`

---

### T007: Add unit tests (grader-service.spec.ts)
**Priority**: P1 | **Estimate**: 1hr | **Depends On**: T003, T004

Create Vitest unit tests for parsing and service logic.

**Acceptance Criteria**:
- [ ] Test: `parseTextList` handles valid formats
- [ ] Test: `parseTextList` returns error for invalid input
- [ ] Test: `detectListFormat` correctly identifies text vs XML
- [ ] Test: `gradeArmyList` returns mock grade structure
- [ ] Test: Error states are handled gracefully

**Run Command**:
```bash
npm run test:unit -- tests/unit/grader-service.spec.ts
```

**Files**:
- `[NEW] tests/unit/grader-service.spec.ts`

---

### T008: Implement detailed analysis view
**Priority**: P1 | **Estimate**: 2hr | **Depends On**: T005

Add the expandable detailed analysis section.

**Acceptance Criteria**:
- [ ] "View Details" button/link under grade summary
- [ ] Strengths section with bullet points
- [ ] Weaknesses section with bullet points
- [ ] Matchup cards showing 3 favorable, 3 unfavorable
- [ ] Win probability percentages displayed
- [ ] Smooth expand/collapse animation

**Files**:
- `[MODIFY] platform/grader.html`
- `[MODIFY] platform/css/grader.css`
- `[MODIFY] platform/js/grader.js`

---

### T009: Add file upload for BattleScribe XML
**Priority**: P2 | **Estimate**: 2hr | **Depends On**: T003

Add support for .ros/.rosz file uploads.

**Acceptance Criteria**:
- [ ] File input element accepting .ros, .rosz, .xml
- [ ] Parse BattleScribe XML export format
- [ ] Auto-populate text area with parsed list preview
- [ ] Drag-and-drop support (optional enhancement)

**Files**:
- `[MODIFY] platform/grader.html`
- `[MODIFY] assets/js/list-parser.js`

---

### T010: Add grade history for auth users
**Priority**: P2 | **Estimate**: 2hr | **Depends On**: T005

Persist grades for authenticated users.

**Acceptance Criteria**:
- [ ] Check Firebase auth state before saving
- [ ] Store grade in user's history (Firestore or LocalStorage)
- [ ] "My Grades" link visible when authenticated
- [ ] History list view with date, list name, grade

**Files**:
- `[NEW] platform/history.html` (or section in grader.html)
- `[MODIFY] platform/js/grader.js`

---

### T011: Integration with live Meta-Oracle API
**Priority**: P3 | **Estimate**: 1hr | **Depends On**: T004

Switch from mock to live Meta-Oracle API.

**Acceptance Criteria**:
- [ ] Feature flag `GRADER_USE_MOCK_API` = false
- [ ] Configure Vindicta-API endpoint URL
- [ ] Handle rate limiting responses (429)
- [ ] Verify end-to-end integration in staging

**Files**:
- `[MODIFY] assets/js/grader-service.js`

---

## Dependency Graph

```
T001 (HTML) ──┬──> T005 (Controller)
T002 (CSS)  ──┤
T003 (Parser) ┴──> T004 (Service) ──> T005
                             │
                             ├──> T006 (E2E Tests)
                             ├──> T007 (Unit Tests)
                             ├──> T008 (Details View)
                             ├──> T009 (File Upload)
                             ├──> T010 (History)
                             └──> T011 (Live API)
```
