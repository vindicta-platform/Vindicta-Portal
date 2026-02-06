# Feature Specification: Dark Mode Toggle

**Feature Branch**: `015-dark-mode`  
**Created**: 2026-02-06  
**Status**: Draft  
**Target**: Week 4 | **Repository**: Vindicta-Portal

## User Scenarios & Testing

### User Story 1 - Toggle Dark Mode (Priority: P2)

Users switch between light and dark themes.

**Acceptance Scenarios**:
1. **Given** header toggle, **When** user clicks, **Then** theme switches immediately
2. **Given** dark mode active, **When** page refreshes, **Then** dark mode persisted

---

## Requirements

### Functional Requirements
- **FR-001**: System MUST toggle between light and dark themes
- **FR-002**: System MUST persist preference to localStorage
- **FR-003**: System MUST respect system preference on first visit

### Key Entities
- **ThemePreference**: mode (light|dark|system)

## Success Criteria
- **SC-001**: Theme switch in under 50ms
- **SC-002**: No flash of wrong theme on load
