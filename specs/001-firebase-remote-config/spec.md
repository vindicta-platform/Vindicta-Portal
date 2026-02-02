# Feature Specification: Firebase Remote Config Feature Management

**Feature Branch**: `001-firebase-remote-config`  
**Created**: 2026-02-01  
**Status**: Draft  
**Input**: User description: "Technical Specification for integrating Firebase Remote Config into the Portal site for feature management, including feature flags, configuration values, and percentage-based rollouts."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Feature Flag Toggle (Priority: P1)

As a **Product Manager**, I want to enable or disable features in the Portal without requiring a code deployment, so that I can control feature availability in real-time.

**Why this priority**: This is the core value proposition—decoupling feature deployment from code deployment enables rapid iteration and risk mitigation.

**Independent Test**: Can be fully tested by creating a feature flag in Firebase Console, toggling it, and verifying the Portal UI reflects the change without redeployment.

**Acceptance Scenarios**:

1. **Given** a feature flag `feat_new_dashboard_enabled` is set to `false` in Firebase Console, **When** a user loads the Portal, **Then** the new dashboard feature is hidden from the UI.
2. **Given** the flag is changed to `true` in Firebase Console, **When** a user refreshes the Portal (or cache expires), **Then** the new dashboard feature becomes visible.
3. **Given** the network is unavailable, **When** the Portal loads, **Then** it falls back to hardcoded default values and the app functions normally.

---

### User Story 2 - Gradual Rollout (Priority: P2)

As a **Tech Lead**, I want to roll out a new feature to a percentage of users, so that I can validate stability and performance before full release.

**Why this priority**: Percentage-based rollouts significantly reduce risk for major feature launches by limiting blast radius.

**Independent Test**: Can be tested by configuring a 10% rollout in Firebase Console and verifying that approximately 10% of test sessions see the feature enabled.

**Acceptance Scenarios**:

1. **Given** a feature flag is configured for 10% rollout, **When** 100 different users access the Portal, **Then** approximately 10 users see the feature enabled.
2. **Given** a percentile rollout is increased from 10% to 50%, **When** users refresh, **Then** the proportion of users seeing the feature increases accordingly.
3. **Given** a critical bug is discovered, **When** the flag is set to 0%, **Then** the feature is immediately disabled for all users (kill-switch).

---

### User Story 3 - User-Specific Targeting (Priority: P2)

As a **QA Engineer**, I want to enable alpha features only for specific test users, so that I can validate new functionality without exposing it to production users.

**Why this priority**: Developer/QA access to unreleased features is essential for testing and validation workflows.

**Independent Test**: Can be tested by setting a user ID condition in Firebase Console and verifying only that specific user sees the alpha feature.

**Acceptance Scenarios**:

1. **Given** a feature flag targets user ID `qa-tester-001`, **When** that user logs in, **Then** they see the alpha feature enabled.
2. **Given** the same flag exists, **When** a different user logs in, **Then** they do not see the alpha feature.
3. **Given** a user property `subscription_tier=premium` is set, **When** a flag targets that property, **Then** only premium users see the feature.

---

### User Story 4 - Configuration Values (Priority: P3)

As a **Developer**, I want to change configuration values (limits, thresholds) without redeploying, so that I can tune system behavior dynamically.

**Why this priority**: Configuration management reduces deployment overhead for non-code changes.

**Independent Test**: Can be tested by changing a config value (e.g., `conf_upload_limit_mb`) in Firebase Console and verifying the Portal respects the new value.

**Acceptance Scenarios**:

1. **Given** `conf_upload_limit_mb` is set to `50`, **When** a user attempts to upload a 60MB file, **Then** the upload is rejected with an appropriate error.
2. **Given** the value is changed to `100`, **When** the user refreshes, **Then** they can upload files up to 100MB.

---

### User Story 5 - A/B Testing Variants (Priority: P3)

As a **Designer**, I want to test different UI variants on subsets of users, so that I can measure which version performs better.

**Why this priority**: A/B testing enables data-driven design decisions but is less critical than core feature management.

**Independent Test**: Can be tested by configuring a string variant flag (e.g., `ui_cta_button_variant`) and verifying different users see different variants.

**Acceptance Scenarios**:

1. **Given** `ui_cta_button_variant` is configured with values "blue" and "red" at 50/50 split, **When** users access the page, **Then** approximately half see each variant.
2. **Given** the variant is changed to 100% "blue", **When** users refresh, **Then** all users see the blue variant.

---

### Edge Cases

- What happens when the Firebase service is unreachable? → App uses cached or hardcoded default values.
- What happens when a flag key doesn't exist? → App falls back to the in-app default value defined in code.
- What happens if a developer accidentally fetches too frequently? → SDK respects `minimumFetchIntervalMillis` to prevent throttling.
- What happens if cache expires mid-session? → App continues with current values until next fetch cycle.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST initialize Firebase Remote Config SDK on application load.
- **FR-002**: System MUST fetch remote configuration values with appropriate cache intervals:
  - Development: 0-5 minutes cache
  - Production: 1-12 hours cache
- **FR-003**: System MUST fall back to hardcoded in-app default values when network is unavailable or fetch is throttled.
- **FR-004**: System MUST support boolean feature flags using naming convention `feat_<feature_name>_enabled`.
- **FR-005**: System MUST support numeric configuration values using naming convention `conf_<feature_name>_limit`.
- **FR-006**: System MUST support string variants for A/B testing using naming convention `ui_<component>_variant`.
- **FR-007**: System MUST allow targeting based on User ID for developer/QA access.
- **FR-008**: System MUST allow targeting based on percentile for gradual rollouts.
- **FR-009**: System MUST allow targeting based on custom user properties (e.g., `subscription_tier`, `role`).
- **FR-010**: System MUST provide an abstraction wrapper around the Firebase SDK for testability and future vendor replacement.
- **FR-011**: System MUST define all default values in a centralized configuration map within the codebase.
- **FR-012**: Public API keys MUST be restricted to the Portal's specific domain.
- **FR-013**: Only users with Firebase Remote Config Admin IAM role may modify production flags.

### Key Entities

- **Feature Flag**: Boolean on/off toggle for a specific feature. Has a key name, default value, targeting rules, and active status.
- **Configuration Value**: Numeric or string parameter that influences system behavior. Has a key name, default value, and optional targeting rules.
- **User Property**: Custom attribute associated with a user session (e.g., role, subscription tier) used for targeting decisions.
- **Targeting Rule**: Condition that determines which users receive which flag/config values (User ID, Percentile, User Property).

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Product Managers can toggle features on/off within 60 seconds without Engineering involvement.
- **SC-002**: Feature rollouts can be reduced to 0% (kill-switch) within 60 seconds of identifying a critical issue.
- **SC-003**: Mean Time to Resolution (MTTR) for bad deployments reduces by 50% due to instant kill-switch capability.
- **SC-004**: 100% of feature flags respect their configured targeting rules (User ID, Percentile, User Property).
- **SC-005**: Portal loads successfully even when Firebase Remote Config service is unreachable (graceful degradation).
- **SC-006**: No sensitive data (API keys, passwords, secrets) is ever stored in Remote Config.
- **SC-007**: Configuration changes propagate to users within the configured cache interval (max 12 hours production, 5 minutes development).

## Assumptions

- The Portal is already connected to a Firebase project (`vindicta-warhammer`).
- The Portal is a client-side web application (static HTML/JS) that can use the Firebase JavaScript SDK.
- User authentication exists or will exist to enable User ID-based targeting.
- The Portal team has appropriate GCP IAM permissions to configure Firebase Remote Config.
- The existing Firebase Hosting deployment workflow can be extended to include SDK initialization.

## Out of Scope

- Server-side (backend) flag evaluation via Admin SDK (Portal is client-only).
- Real-time config updates via `onConfigUpdated` listener (standard fetch/cache model is sufficient).
- Secret management (this is explicitly NOT for secrets).
- Custom admin UI for managing flags (Firebase Console is the control plane).
