# Feature Specification: User Feedback & Analytics System

**Feature Branch**: `001-user-feedback-analytics`  
**Created**: 2026-02-01  
**Status**: Draft  
**Input**: User description: "A way to collect user feedback on the portal, but also a way to provide analytics and accept bug reports. It must conform to the constitution on cost (Zero-Cost Baseline - GCP Free Tier only)."

## Constitutional Alignment

> **Economic Prime Directive**: The Vindicta Platform MUST run its core operations on the Google Cloud Platform (GCP) Free Tier. No architectural decision, resource provision, or code deployment shall be permitted if it incurs a standing monthly cost for the base system.

This feature MUST use free-tier SaaS integrations only. No backend infrastructure or database storage for feedback is permitted unless it falls within GCP Free Tier limits.

---

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Submit General Feedback (Priority: P1)

A portal visitor wants to share feedback about their experience, suggest improvements, or report issues they encountered while browsing the portal.

**Why this priority**: Feedback collection is the core value proposition. Without it, the feature delivers no value. This is the MVP.

**Independent Test**: Can be fully tested by rendering a feedback widget and submitting sample feedback. Delivers immediate value by capturing user sentiment.

**Acceptance Scenarios**:

1. **Given** a user is on any portal page, **When** they click a visible feedback button/widget, **Then** a feedback form appears allowing text input
2. **Given** a user has entered feedback text, **When** they submit the form, **Then** the feedback is sent to the external service dashboard
3. **Given** feedback submission completes, **When** the response is received, **Then** the user sees a confirmation message

---

### User Story 2 - Report a Bug (Priority: P1)

A portal visitor encounters a bug (broken link, UI issue, functionality problem) and wants to report it with context about what went wrong.

**Why this priority**: Bug reports are critical for maintaining portal quality. Equally important as general feedback.

**Independent Test**: Can be tested by triggering bug report flow and verifying data reaches external dashboard with category tagging.

**Acceptance Scenarios**:

1. **Given** a user encounters an issue, **When** they initiate a bug report, **Then** they can categorize the issue type (UI, Link Broken, Feature Not Working, Other)
2. **Given** a user is completing a bug report, **When** they describe the issue, **Then** they can include steps to reproduce (optional)
3. **Given** a bug report is submitted, **When** processing completes, **Then** the user receives confirmation and optional reference ID

---

### User Story 3 - View Anonymized Usage Analytics (Priority: P2)

The portal maintainer wants to understand how users navigate the portal to make informed improvements.

**Why this priority**: Analytics inform decisions but are not user-facing. Lower priority than feedback capture.

**Independent Test**: Can be tested by verifying analytics script loads and page views are recorded in external dashboard.

**Acceptance Scenarios**:

1. **Given** a user visits any portal page, **When** the page loads, **Then** the visit is recorded in the analytics dashboard (privacy-respecting, no PII)
2. **Given** multiple users visit different sections, **When** the maintainer views the analytics dashboard, **Then** they see page views, top pages, and session data
3. **Given** analytics are collected, **When** viewing data, **Then** no personally identifiable information (PII) is stored

---

### User Story 4 - Feature Request Board (Priority: P3)

A portal visitor wants to suggest new features or see what features other users have requested, and optionally vote on priorities.

**Why this priority**: Nice-to-have for community engagement. Can be deferred if simpler feedback suffices.

**Independent Test**: Can be tested by accessing a feature request board and creating a new request.

**Acceptance Scenarios**:

1. **Given** a user wants to request a feature, **When** they access the feature request area, **Then** they can submit a titled request with description
2. **Given** multiple feature requests exist, **When** the maintainer reviews requests, **Then** they see all submissions organized by popularity/date

---

### Edge Cases

- What happens when the external feedback service is unavailable? → Widget should display graceful error: "Feedback unavailable, please try again later"
- What happens when a user submits empty feedback? → Form validation prevents submission of empty content
- What happens on extremely slow connections? → Widget should not block page load (async loading)
- How does the system handle users who disable JavaScript? → Core portal remains functional; feedback widget is enhancement only

---

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST integrate a feedback widget that loads asynchronously without blocking page render
- **FR-002**: System MUST provide a visible, persistent feedback trigger on all portal pages (button/tab)
- **FR-003**: System MUST allow users to submit general feedback with free-text input
- **FR-004**: System MUST allow users to categorize bug reports by type (UI, Link, Functionality, Other)
- **FR-005**: System MUST display a confirmation message upon successful feedback/bug submission
- **FR-006**: System MUST load an analytics script that tracks page views without storing PII
- **FR-007**: System MUST NOT incur any monthly costs (free-tier services only)
- **FR-008**: System MUST NOT require user authentication to submit feedback
- **FR-009**: System MUST send all collected data to an external SaaS dashboard (no local storage)
- **FR-010**: Widget MUST gracefully degrade if JavaScript is disabled (portal remains usable)

### Key Entities

- **FeedbackSubmission**: Type (General/Bug/Feature), content, category (for bugs), timestamp, page URL
- **PageVisit**: Page URL, timestamp, session ID (anonymized), referrer (optional)

---

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Feedback widget is accessible from 100% of portal pages within 2 clicks
- **SC-002**: 95% of feedback submissions are successfully captured in the external dashboard
- **SC-003**: Page load time increases by no more than 200ms with widget/analytics scripts loaded
- **SC-004**: Zero monthly costs incurred for feedback/analytics integration (verified via GCP billing)
- **SC-005**: Maintainer can view all feedback submissions in a single external dashboard
- **SC-006**: Bug reports include page URL context automatically (no user action required)

---

## Assumptions

- **Appzi** or similar free-tier SaaS will be used for feedback widget (per BACKLOG.md research)
- Analytics can be provided by Hotjar Basic, Google Analytics 4 (free), or similar free-tier service
- Feature request board (P3) may use Sleekplan free tier if implemented
- All services must offer embeddable `<script>` tag integration for static HTML sites
- No backend API development is required; integration is client-side only
