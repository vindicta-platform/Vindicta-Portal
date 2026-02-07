# Tasks: Army List Library

**Input**: specs/012-army-library/ | **Prerequisites**: spec.md, plan.md

## Phase 1: Setup

- [ ] T001 Create `platform/library.html` with base layout
- [ ] T002 [P] Create `assets/js/library.js`
- [ ] T003 [P] Create `assets/js/list-card.js`

---

## Phase 2: Foundational

- [ ] T004 Define ListEntry Firestore document structure
- [ ] T005 Setup auth guard for library page
- [ ] T006 Create list card UI component

---

## Phase 3: User Story 1 - View Saved Lists (P1) 🎯 MVP

- [ ] T007 [US1] Fetch user's lists from Firestore
- [ ] T008 [US1] Display list cards with metadata
- [ ] T009 [US1] Show faction, points, grade on card
- [ ] T010 [US1] Navigate to list detail on click

---

## Phase 4: User Story 2 - Organize Lists (P2)

- [ ] T011 [US2] Add star/favorite toggle to cards
- [ ] T012 [US2] Persist favorite status to Firestore
- [ ] T013 [US2] Add search/filter input
- [ ] T014 [US2] Implement client-side filtering

---

## Phase 5: Polish

- [ ] T015 [P] Add loading skeleton states
- [ ] T016 [P] Add empty state for no lists
