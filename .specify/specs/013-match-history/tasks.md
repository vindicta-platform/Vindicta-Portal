# Tasks: Match History Timeline

**Input**: specs/013-match-history/ | **Prerequisites**: spec.md, plan.md

## Phase 1: Setup

- [ ] T001 Create `platform/match-history.html` with base layout
- [ ] T002 [P] Create `assets/js/match-history.js`
- [ ] T003 [P] Create `assets/js/match-card.js`

---

## Phase 2: Foundational

- [ ] T004 Define MatchSummary Firestore document structure
- [ ] T005 Create match card UI component

---

## Phase 3: User Story 1 - Browse Past Matches (P1) 🎯 MVP

- [ ] T006 [US1] Fetch matches from Firestore (most recent first)
- [ ] T007 [US1] Display match cards with opponent, result, date
- [ ] T008 [US1] Expand card on click to show details
- [ ] T009 [US1] Implement pagination (load more)

---

## Phase 4: Polish

- [ ] T010 [P] Add loading states
- [ ] T011 [P] Add empty state for no matches
