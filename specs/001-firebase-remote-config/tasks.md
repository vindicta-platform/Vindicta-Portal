# Tasks: Firebase Remote Config Feature Management

**Input**: Design documents from `/specs/001-firebase-remote-config/`
**Prerequisites**: plan.md ✅, spec.md ✅, research.md ✅, data-model.md ✅, quickstart.md ✅

**Tests**: Optional - only where explicitly requested. Playwright tests are specified in quickstart.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and Firebase SDK integration

- [ ] T001 Install Firebase SDK dependency (`npm install firebase`)
- [ ] T002 [P] Create directory structure: `assets/js/` for Firebase modules
- [ ] T003 [P] Create `assets/js/firebase-config.js` with Firebase app initialization

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core Remote Config infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T004 Create `assets/js/remote-config.defaults.js` with default values map per data-model.md
- [ ] T005 Create `assets/js/remote-config.js` with `FeatureFlagService` class structure (constructor, `initialize()`)
- [ ] T006 Implement `getBoolean(key)`, `getNumber(key)`, `getString(key)` methods in `assets/js/remote-config.js`
- [ ] T007 Implement `isFeatureEnabled(featureName)` helper method in `assets/js/remote-config.js`
- [ ] T008 [P] Configure environment detection for cache intervals (12h prod, 0 dev) in `assets/js/firebase-config.js`

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Feature Flag Toggle (Priority: P1) 🎯 MVP

**Goal**: Enable Product Managers to toggle features on/off without code deployment

**Independent Test**: Create flag `feat_new_dashboard_enabled` in Firebase Console, toggle it, verify Portal UI reflects change.

### Implementation for User Story 1

- [ ] T009 [US1] Add Firebase SDK script module to `index.html` (add before `</body>`)
- [ ] T010 [P] [US1] Add Firebase SDK script module to `club/index.html`
- [ ] T011 [P] [US1] Add Firebase SDK script module to `platform/index.html`
- [ ] T012 [US1] Implement DOMContentLoaded initialization pattern in `index.html`
- [ ] T013 [US1] Add example feature toggle for `feat_new_dashboard_enabled` in `platform/index.html`
- [ ] T014 [US1] Verify graceful degradation when network unavailable (uses defaults per FR-003)

**Checkpoint**: User Story 1 complete - Feature flags can be toggled via Firebase Console

---

## Phase 4: User Story 2 - Gradual Rollout (Priority: P2)

**Goal**: Enable percentage-based rollouts for new features

**Independent Test**: Configure 10% rollout in Firebase Console, verify approximately 10% of sessions see feature

### Implementation for User Story 2

- [ ] T015 [US2] Configure Firebase Remote Config conditions for percentile targeting in Firebase Console
- [ ] T016 [US2] Verify percentage rollout works by testing with multiple browser sessions
- [ ] T017 [US2] Test kill-switch (0% rollout) functionality

**Checkpoint**: User Story 2 complete - Percentage-based rollouts operational

---

## Phase 5: User Story 3 - User-Specific Targeting (Priority: P2)

**Goal**: Enable QA/dev access to alpha features by user ID

**Independent Test**: Set user ID condition in Firebase Console, verify only that user sees alpha feature

### Implementation for User Story 3

- [ ] T018 [P] [US3] Add Firebase Analytics SDK import to `assets/js/firebase-config.js`
- [ ] T019 [US3] Implement `setUserProperties(properties)` method in `FeatureFlagService` in `assets/js/remote-config.js`
- [ ] T020 [US3] Implement `setUserId(userId)` method in `FeatureFlagService` in `assets/js/remote-config.js`
- [ ] T021 [US3] Configure user ID targeting condition in Firebase Console
- [ ] T022 [US3] Verify user-specific flag targeting works

**Checkpoint**: User Story 3 complete - User-based targeting operational

---

## Phase 6: User Story 4 - Configuration Values (Priority: P3)

**Goal**: Enable dynamic configuration values (limits, thresholds) without redeployment

**Independent Test**: Change `conf_upload_limit_mb` in Firebase Console, verify Portal respects new value

### Implementation for User Story 4

- [ ] T023 [US4] Add configuration value defaults to `assets/js/remote-config.defaults.js` (e.g., `conf_upload_limit_mb`)
- [ ] T024 [US4] Create example usage of `getNumber()` for upload limit validation

**Checkpoint**: User Story 4 complete - Configuration values can be changed dynamically

---

## Phase 7: User Story 5 - A/B Testing Variants (Priority: P3)

**Goal**: Enable A/B testing of UI variants

**Independent Test**: Configure `ui_cta_button_variant` with 50/50 split, verify different users see different variants

### Implementation for User Story 5

- [ ] T025 [US5] Add UI variant defaults to `assets/js/remote-config.defaults.js` (e.g., `ui_cta_button_variant`)
- [ ] T026 [US5] Create example usage of `getString()` for variant selection

**Checkpoint**: User Story 5 complete - A/B testing variants operational

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T027 [P] Create Playwright test for feature flag toggle in `tests/feature-flags.spec.ts`
- [ ] T028 [P] Create mock `FeatureFlagService` for testing in `tests/mocks/feature-flags.mock.js`
- [ ] T029 [P] Add remaining HTML pages to Firebase SDK initialization (`club/about.html`, `club/team.html`, etc.)
- [ ] T030 Documentation: Update `quickstart.md` with actual API key values (placeholder → real)
- [ ] T031 Security: Verify API key domain restrictions in GCP Console per FR-012
- [ ] T032 Run `quickstart.md` validation scenarios end-to-end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - US1 (P1): Must complete first as MVP
  - US2 (P2) and US3 (P2): Can proceed in parallel after US1
  - US4 (P3) and US5 (P3): Can proceed in parallel after US2/US3
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### Parallel Opportunities

- T002 and T003 can run in parallel (Setup)
- T010 and T011 can run in parallel (adding SDK to HTML pages)
- T018 can run in parallel with earlier US3 tasks
- T027, T028, T029 can all run in parallel (Polish)

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Toggle flag in Firebase Console, verify UI reflects change
5. Deploy/demo if ready

### Incremental Delivery

1. Setup + Foundational → Foundation ready
2. Add User Story 1 → Test → Deploy (MVP!)
3. Add User Story 2/3 → Test targeting → Deploy
4. Add User Story 4/5 → Test config values/variants → Deploy

---

## Summary

| Metric | Count |
|--------|-------|
| Total Tasks | 32 |
| Phase 1 (Setup) | 3 |
| Phase 2 (Foundational) | 5 |
| Phase 3 (US1 - P1 MVP) | 6 |
| Phase 4 (US2 - P2) | 3 |
| Phase 5 (US3 - P2) | 5 |
| Phase 6 (US4 - P3) | 2 |
| Phase 7 (US5 - P3) | 2 |
| Phase 8 (Polish) | 6 |
| Parallel Opportunities | 12 |

**MVP Scope**: Phases 1-3 (User Story 1 only) = 14 tasks
