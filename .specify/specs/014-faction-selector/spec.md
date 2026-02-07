# Feature Specification: Faction Selector Component

**Feature Branch**: `014-faction-selector`  
**Created**: 2026-02-06  
**Status**: Draft  
**Target**: Week 2 | **Repository**: Vindicta-Portal

## User Scenarios & Testing

### User Story 1 - Select Faction from Dropdown (Priority: P1)

Users select their faction from a searchable dropdown.

**Acceptance Scenarios**:
1. **Given** faction selector, **When** user clicks, **Then** dropdown opens with all factions
2. **Given** dropdown open, **When** user types, **Then** factions filtered by search

---

## Requirements

### Functional Requirements
- **FR-001**: System MUST display all available factions
- **FR-002**: System MUST support type-to-search filtering
- **FR-003**: System MUST emit selection event

### Key Entities
- **Faction**: id, name, iconUrl, subfactions[]

## Success Criteria
- **SC-001**: Dropdown opens in under 100ms
- **SC-002**: Search filters in under 50ms
