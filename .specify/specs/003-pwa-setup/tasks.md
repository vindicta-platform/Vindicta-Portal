# Tasks: PWA Setup

**Input**: specs/003-pwa-setup/ | **Prerequisites**: spec.md, plan.md

## Phase 1: Setup

- [ ] T001 Create `manifest.json` with app metadata
- [ ] T002 [P] Create `sw.js` service worker file
- [ ] T003 [P] Add manifest link and SW registration to index.html

---

## Phase 2: Foundational

- [ ] T004 Configure app icons (192x192, 512x512)
- [ ] T005 Setup Workbox for cache strategies
- [ ] T006 Define cache-first assets list

---

## Phase 3: User Story 1 - Install to Home Screen (P1) 🎯 MVP

- [ ] T007 [US1] Configure manifest for standalone display
- [ ] T008 [US1] Add beforeinstallprompt event handler
- [ ] T009 [US1] Create install prompt UI component
- [ ] T010 [US1] Test install on iOS and Android

---

## Phase 4: User Story 2 - Offline Core Features (P1)

- [ ] T011 [US2] Implement cache-first strategy for static assets
- [ ] T012 [US2] Create offline fallback page
- [ ] T013 [US2] Implement background sync for pending actions
- [ ] T014 [US2] Add network status indicator

---

## Phase 5: User Story 3 - Push Notifications (P3)

- [ ] T015 [US3] Setup Firebase Cloud Messaging
- [ ] T016 [US3] Implement notification permission flow
- [ ] T017 [US3] Create notification subscription endpoint

---

## Phase 6: Polish

- [ ] T018 [P] Run Lighthouse PWA audit
- [ ] T019 [P] Optimize cache size under 5MB
- [ ] T020 Add PWA update notification
