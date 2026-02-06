# Verification Checklist: List Grader MVP

**Purpose**: Quality gate checklist for List Grader MVP implementation  
**Created**: 2026-02-05  
**Feature**: [spec.md](./spec.md) | [plan.md](./plan.md) | [tasks.md](./tasks.md)

---

## Pre-Implementation Gates

- [ ] **Spec Approved**: All [NEEDS CLARIFICATION] markers resolved
- [ ] **Plan Reviewed**: Constitution check passed (0 violations)
- [ ] **Tasks Assigned**: GitHub issues created and linked
- [ ] **Branch Ready**: Working on `002-list-grader` branch

---

## Functional Requirements Verification

### FR-001: Army list input via text paste or file upload
- [ ] Text area accepts paste input
- [ ] File upload accepts .ros, .rosz, .xml
- [ ] Plain text format works

### FR-002: Validate list before sending to API
- [ ] Empty input rejected with message
- [ ] Malformed input rejected with message
- [ ] Minimum viable list structure required

### FR-003: Display overall letter grade (A-F)
- [ ] Grade badge renders with correct letter
- [ ] Color coding applied (A=green, F=red)
- [ ] Badge is visible on desktop and mobile

### FR-004: Display summary explanation
- [ ] 2-3 sentence summary appears
- [ ] Summary is readable on mobile

### FR-005: Detailed analysis (Strengths, Weaknesses, Matchups)
- [ ] Strengths section renders bullet points
- [ ] Weaknesses section renders bullet points
- [ ] Matchups show 6+ faction cards

### FR-006: Win probability percentages
- [ ] Percentages displayed for each matchup
- [ ] Visual indication (progress bar or number)

### FR-007: Persist grades for authenticated users
- [ ] Auth state checked before saving
- [ ] Grade appears in history after save
- [ ] History persists across sessions

### FR-008: Anonymous grading (no account)
- [ ] Anonymous users can submit lists
- [ ] Anonymous users receive grades
- [ ] Prompt to sign up after grading

### FR-009: Rate limiting enforced
- [ ] Rate limit message displays when exceeded
- [ ] Different limits for anon vs auth

### FR-010: Loading states
- [ ] Loading spinner during API call
- [ ] Button disabled during loading
- [ ] Skeleton or placeholder visible

### FR-011: Graceful error handling
- [ ] Network error shows friendly message
- [ ] API timeout shows retry option
- [ ] No stack traces in production

### FR-012: Warhammer 40K 10th Edition support
- [ ] 10th Ed lists parse correctly
- [ ] Unsupported editions rejected with message

---

## Success Criteria Verification

### SC-001: Grade displayed within 15 seconds
- [ ] Measure time from submit to grade visible
- [ ] 95th percentile under 15 seconds

### SC-002: 70%+ correlation with tournament data
- [ ] (Post-launch metric - tracked in analytics)

### SC-003: 80% of users view detailed analysis
- [ ] Analytics event fires on detail expand
- [ ] Track in Firebase Analytics

### SC-004: 50% anonymous → account conversion
- [ ] Analytics event fires on signup after grade
- [ ] Track in Firebase Analytics

### SC-005: Average session >3 minutes on grader
- [ ] Firebase Analytics session tracking

### SC-006: Zero-cost baseline for free tier
- [ ] No API charges incurred in testing
- [ ] Rate limiting prevents cost overruns

### SC-007: 100 concurrent grading requests
- [ ] Load test shows no degradation

### SC-008: Mobile users complete flow without h-scroll
- [ ] Test at 375px width
- [ ] No horizontal scrollbar visible
- [ ] All controls tappable

---

## Testing Verification

### Automated Tests
- [ ] E2E tests pass: `npm run test -- tests/list-grader.spec.ts`
- [ ] Unit tests pass: `npm run test:unit`
- [ ] No new Playwright failures in CI

### Manual Tests
- [ ] Happy path tested on Chrome desktop
- [ ] Happy path tested on Chrome mobile (DevTools)
- [ ] Error states verified (empty input, network error)
- [ ] Loading state visible for at least 500ms

---

## Deployment Checklist

- [ ] Feature flag `GRADER_ENABLED` set to true
- [ ] Firebase Hosting preview deployed
- [ ] Lighthouse score 90+ for grader page
- [ ] No console errors in production build
- [ ] PR reviewed and approved
- [ ] Merged to main branch

---

## Post-Launch Verification

- [ ] Analytics receiving events
- [ ] Error rate <1% in first 24 hours
- [ ] User feedback captured (if feedback system active)
