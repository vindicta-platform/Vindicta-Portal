# Tasks: Quota Dashboard

**Input**: specs/007-quota-dashboard/ | **Prerequisites**: spec.md, plan.md

## Phase 1: Setup

- [ ] T001 Create `platform/quota.html` with base layout
- [ ] T002 [P] Create `assets/js/quota.js`
- [ ] T003 [P] Create `assets/js/quota-history.js`

---

## Phase 2: Foundational

- [ ] T004 Integrate Agent-Auditor-SDK client
- [ ] T005 Create quota meter UI component
- [ ] T006 Define low-quota threshold (20%)

---

## Phase 3: User Story 1 - View Current Quota Usage (P1) 🎯 MVP

- [ ] T007 [US1] Fetch current quota from SDK
- [ ] T008 [US1] Display quota meter with remaining/total
- [ ] T009 [US1] Show quota refresh date
- [ ] T010 [US1] Display warning indicator at threshold

---

## Phase 4: User Story 2 - View Usage History (P2)

- [ ] T011 [US2] Fetch usage history from SDK
- [ ] T012 [US2] Build daily usage breakdown chart
- [ ] T013 [US2] Show itemized usage by action type

---

## Phase 5: Polish

- [ ] T014 [P] Add loading states
- [ ] T015 [P] Add error handling for API failures
