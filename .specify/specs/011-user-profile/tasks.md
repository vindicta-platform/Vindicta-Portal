# Tasks: User Profile Dashboard

**Input**: specs/011-user-profile/ | **Prerequisites**: spec.md, plan.md

## Phase 1: Setup

- [ ] T001 Create `platform/profile.html` with base layout
- [ ] T002 [P] Create `assets/js/profile.js`

---

## Phase 2: Foundational

- [ ] T003 Define UserProfile Firestore document structure
- [ ] T004 Setup auth guard for profile page
- [ ] T005 Create profile header component (avatar, name)

---

## Phase 3: User Story 1 - View My Profile (P1) 🎯 MVP

- [ ] T006 [US1] Fetch user profile from Firestore
- [ ] T007 [US1] Display username and avatar
- [ ] T008 [US1] Show stats card (games played, win rate)
- [ ] T009 [US1] Display favorite faction badge

---

## Phase 4: User Story 2 - Edit Profile Settings (P2)

- [ ] T010 [US2] Add edit display name form
- [ ] T011 [US2] Implement display name update logic
- [ ] T012 [US2] Add notification preferences toggles
- [ ] T013 [US2] Persist preference changes to Firestore

---

## Phase 5: Polish

- [ ] T014 [P] Add loading states
- [ ] T015 [P] Add success/error toasts for updates
