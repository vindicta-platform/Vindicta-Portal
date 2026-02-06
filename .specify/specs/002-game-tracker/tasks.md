# Tasks: Game Tracker MVP

**Input**: specs/002-game-tracker/ | **Prerequisites**: spec.md, plan.md

## Phase 1: Setup

- [ ] T001 Create `platform/tracker.html` with base layout
- [ ] T002 [P] Create `platform/history.html` with base layout
- [ ] T003 [P] Create `assets/js/models/` directory

---

## Phase 2: Foundational

- [ ] T004 [P] Implement `game.js` model
- [ ] T005 [P] Implement `turn.js` model
- [ ] T006 [P] Implement `action.js` model
- [ ] T007 Configure Firestore collection schemas

---

## Phase 3: User Story 1 - Create Game Session (P1) 🎯 MVP

- [ ] T008 [US1] Create "New Game" modal UI
- [ ] T009 [US1] Implement `createGame()` in tracker.js
- [ ] T010 [US1] Generate unique game ID and persist to Firestore
- [ ] T011 [US1] Display empty tracker view after creation

---

## Phase 4: User Story 2 - Record Turn Actions (P1)

- [ ] T012 [US2] Build action recording UI component
- [ ] T013 [US2] Implement `recordAction()` in tracker.js
- [ ] T014 [US2] Implement "End Turn" and `endTurn()`
- [ ] T015 [US2] Auto-save actions to Firestore

---

## Phase 5: User Story 3 - View Game History (P2)

- [ ] T016 [US3] Implement `loadGameHistory()` in history.js
- [ ] T017 [US3] Build game list UI with chronological sorting
- [ ] T018 [US3] Implement game detail view with turn replay

---

## Phase 6: Polish

- [ ] T019 [P] Implement offline draft mode
- [ ] T020 [P] Add sync indicator
- [ ] T021 Handle connection loss mid-game
