# Feature Specification: PWA Setup

**Feature Branch**: `003-pwa-setup`  
**Created**: 2026-02-06  
**Status**: Draft  
**Target**: Week 5 (Mar 6-7)

## User Scenarios & Testing

### User Story 1 - Install to Home Screen (Priority: P1)

Mobile users install the app to their home screen for native-like access.

**Why this priority**: Core mobile-first experience.

**Independent Test**: Visit site on mobile, see install prompt, app appears on home screen.

**Acceptance Scenarios**:
1. **Given** user on mobile browser, **When** visits portal, **Then** install prompt appears
2. **Given** user accepts install, **When** opens from home screen, **Then** app launches fullscreen

---

### User Story 2 - Offline Core Features (Priority: P1)

Users access key features without internet connection.

**Why this priority**: Tournament venues often have poor connectivity.

**Independent Test**: Enable airplane mode, app still loads cached content.

**Acceptance Scenarios**:
1. **Given** user previously visited, **When** goes offline, **Then** cached pages still accessible
2. **Given** offline user, **When** connection restored, **Then** pending actions sync automatically

---

### User Story 3 - Push Notifications (Priority: P3)

Users receive notifications for game updates and meta changes.

**Why this priority**: Engagement feature, post-MVP.

**Independent Test**: Subscribe to notifications, receive test push.

**Acceptance Scenarios**:
1. **Given** user opts in, **When** meta snapshot updates, **Then** push notification sent

---

### Edge Cases
- What if user declines install prompt?
- How to handle cache invalidation?
- What data is cached vs. fetched?

## Requirements

### Functional Requirements
- **FR-001**: System MUST provide valid manifest.json
- **FR-002**: System MUST register service worker
- **FR-003**: System MUST cache critical assets for offline use
- **FR-004**: System MUST support "Add to Home Screen"
- **FR-005**: System MUST sync offline changes when online

### Key Entities
- **Manifest**: name, icons, start_url, display, theme_color
- **ServiceWorker**: cache strategies, sync handlers
- **Cache**: static assets, API responses, offline pages

## Success Criteria

### Measurable Outcomes
- **SC-001**: Lighthouse PWA score of 90+
- **SC-002**: App installable on iOS and Android
- **SC-003**: Core pages load offline within 500ms
- **SC-004**: Cache size under 5MB
