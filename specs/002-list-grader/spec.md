# Feature Specification: List Grader MVP

**Feature Branch**: `002-list-grader`  
**Created**: 2026-02-05  
**Status**: Draft  
**Input**: User description: "Highest-value feature on platform - implement List Grader using Meta-Oracle to grade army lists"  
**Compliance**: Rule 19 (Spec-First) Mandatory

---

## Overview

The **List Grader** is the flagship feature of the Vindicta Platform that enables competitive Warhammer players to receive AI-powered assessments of their army lists. By integrating with the Meta-Oracle backend, users can submit their army lists and receive:

- An overall grade (A-F scale)
- Strengths and weaknesses analysis
- Meta-matchup predictions
- Improvement suggestions

This feature delivers the core value proposition of the platform: *"Provably fair competitive gaming, powered by cryptographically auditable mechanics and AI-driven strategic insights."*

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Submit Army List for Grading (Priority: P1)

As a competitive Warhammer player, I want to **upload my army list** and receive an instant grade so I can understand how my list performs in the current meta before attending a tournament.

**Why this priority**: This is the core value proposition - users cannot derive value from the platform without the ability to submit lists and receive grades. This drives initial adoption and engagement.

**Independent Test**: Can be fully tested by uploading a valid army list (BattleScribe XML or plain text) and receiving a grade response. Delivers immediate, tangible value to users.

**Acceptance Scenarios**:

1. **Given** a logged-in user with a valid army list, **When** they paste/upload their list and click "Grade My List", **Then** they receive a letter grade (A-F) with a brief summary within 10 seconds.

2. **Given** a user submits an incomplete or malformed list, **When** the system validates the input, **Then** they receive a clear error message indicating what is wrong and how to fix it.

3. **Given** a user submits a list for an unsupported faction/edition, **When** the system processes the request, **Then** they receive a message stating which factions/editions are currently supported.

---

### User Story 2 - View Detailed Analysis (Priority: P2)

As a competitive player, I want to **see detailed analysis** of my grade, including strengths, weaknesses, and meta-matchup predictions so I can make informed decisions about list adjustments.

**Why this priority**: Extends the core grading feature with actionable insights. Users can still derive value from P1 alone, but P2 greatly enhances the depth of feedback.

**Independent Test**: After receiving a grade, user can expand to view detailed analysis sections. Each section (Strengths, Weaknesses, Matchups) renders correctly with relevant data.

**Acceptance Scenarios**:

1. **Given** a graded list, **When** the user clicks "View Details", **Then** they see a breakdown including: Strengths (what the list does well), Weaknesses (vulnerabilities), and Meta Matchups (favorable/unfavorable matchups).

2. **Given** a detailed analysis is displayed, **When** the user views the matchup section, **Then** they see at least 3 favorable and 3 unfavorable faction matchups with win probability percentages.

---

### User Story 3 - Save Grades to History (Priority: P3)

As a returning user, I want to **save my graded lists** to my account history so I can track my list evolution and compare grades over time.

**Why this priority**: Adds retention value but requires authentication. Users can still get full grading functionality without this feature.

**Independent Test**: After grading a list, the grade appears in the user's history. History persists across sessions.

**Acceptance Scenarios**:

1. **Given** a logged-in user who has just graded a list, **When** the grading is complete, **Then** the grade is automatically saved to their history.

2. **Given** a user with saved history, **When** they navigate to "My Grades", **Then** they see a chronological list of their past grades with dates, list names, and letter grades.

3. **Given** a user viewing their history, **When** they click on a past grade, **Then** they can view the full analysis and original list details.

---

### User Story 4 - Anonymous Grading (Priority: P3)

As a new visitor, I want to **try the grader without creating an account** so I can evaluate the platform before committing.

**Why this priority**: Reduces friction for new users but provides limited functionality. Grade is not saved.

**Independent Test**: Non-authenticated user can submit a list and receive a grade without signing in. Grade is not persisted after session ends.

**Acceptance Scenarios**:

1. **Given** an anonymous user on the grader page, **When** they submit a valid army list, **Then** they receive a grade and basic analysis.

2. **Given** an anonymous user receives a grade, **When** they attempt to save or view history, **Then** they are prompted to create an account or sign in.

---

### Edge Cases

- **Empty Input**: What happens when a user submits an empty list?
  - System displays "Please enter your army list to receive a grade"
  
- **Very Long Lists**: What happens with extremely large inputs (>50,000 characters)?
  - System enforces a maximum input size with clear feedback
  
- **Rate Limiting**: What happens when a user submits too many requests?
  - Rate limited users see "You've reached your grading limit. Upgrade to Premium or wait X minutes."
  
- **API Unavailable**: What happens when Meta-Oracle is down?
  - Graceful degradation with "Grading service temporarily unavailable. Please try again later."

- **Unsupported Game Edition**: What happens when a list uses rules from an unsupported edition?
  - System identifies edition mismatch and suggests supported editions

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST accept army list input via text paste or file upload (BattleScribe XML, .ros, .rosz, plain text)
- **FR-002**: System MUST validate submitted army list for basic structural integrity before sending to Meta-Oracle
- **FR-003**: System MUST display an overall letter grade (A, B, C, D, F) for each submitted list
- **FR-004**: System MUST display a brief summary explanation (2-3 sentences) accompanying the grade
- **FR-005**: System MUST provide detailed analysis including Strengths, Weaknesses, and Meta Matchups
- **FR-006**: System MUST show win probability percentages against at least 6 faction matchups (3 favorable, 3 unfavorable)
- **FR-007**: System MUST persist graded lists to authenticated user's history
- **FR-008**: System MUST allow anonymous users to receive grades without account creation (grade not saved)
- **FR-009**: System MUST enforce rate limiting (10 free grades per day for anonymous, 60 for authenticated free tier)
- **FR-010**: System MUST provide clear loading states and progress indicators during grading
- **FR-011**: System MUST handle Meta-Oracle API failures gracefully with user-friendly error messages
- **FR-012**: System MUST support Warhammer 40,000 10th Edition army lists at launch

### Key Entities

- **ArmyList**: Represents a submitted army list with faction, points total, units, and metadata
- **Grade**: The assessment result containing letter grade, score, summary, and detailed analysis
- **GradeHistory**: Collection of a user's past grades linked to their account
- **MetaMatchup**: Predicted win probabilities against opposing factions

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can submit an army list and receive a grade within 15 seconds (95th percentile)
- **SC-002**: Grading accuracy achieves 70%+ correlation with actual tournament performance data
- **SC-003**: 80% of users who submit a list view the detailed analysis section
- **SC-004**: 50% of anonymous users who receive a grade create an account within the same session
- **SC-005**: Average session duration on the grader page exceeds 3 minutes
- **SC-006**: Zero-cost baseline maintained for free tier users (no unexpected API charges)
- **SC-007**: System handles 100 concurrent grading requests without degradation
- **SC-008**: Mobile users can complete the full grading flow without horizontal scrolling

---

## Assumptions

- Meta-Oracle API is available and documented with grade endpoint (`POST /meta/grade`)
- Firebase Authentication is operational for tracking authenticated users
- BattleScribe XML format is the primary import format (most common)
- Only Warhammer 40K 10th Edition is supported at launch
- Free tier rate limits align with Agent-Auditor-SDK quota management

---

## Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| Meta-Oracle `/meta/grade` API | Required | Core grading backend |
| Firebase Authentication | Required | For authenticated user features |
| Vindicta-API Gateway | Required | API routing and rate limiting |
| Agent-Auditor-SDK | Required | Quota and cost tracking |

---

## Clarification Notes *(added by Spec-Bot)*

### Cycle 1: Ambiguity Search

| Ambiguity | Resolution |
|-----------|------------|
| API endpoint name (`/meta/grade` vs `/meta/predict`) | **Use `/api/v1/meta/predict`** per verified API specification |
| BattleScribe support at MVP | **Defer** - MVP accepts plain text only |
| Firebase Auth requirement | **Optional** for MVP - anonymous grading enabled |
| Grade scale (A-F vs S-F) | **Use A-F** for familiarity |

### Cycle 2: Component Impact

| Component | Impact |
|-----------|--------|
| `platform/index.html` | Add List Grader navigation link |
| `platform/grader.html` | **NEW** - Main grader page |
| `platform/js/grader.js` | **NEW** - Grading logic and API integration |
| `assets/js/remote-config.defaults.js` | Add `feat_list_grader_enabled: false` |
| `tests/grader.spec.ts` | **NEW** - Playwright tests for grader |

### Cycle 3: Edge Cases & Failure Analysis

| Scenario | Handling |
|----------|----------|
| Empty input | Inline validation before submit |
| API timeout (>15s) | Show timeout error with retry button |
| Network offline | Graceful degradation message |
| Rate limiting | Client-side 10s cooldown between requests |
| Very long lists (>4000 chars) | Truncate with warning |

---

## Out of Scope (v1)

- List builder/editor functionality (users must bring pre-built lists)
- Faction-specific recommendations (unit swaps, upgrades)
- Social features (sharing lists, comments)
- Tournament bracket integration
- Real-time matchmaking based on grades
