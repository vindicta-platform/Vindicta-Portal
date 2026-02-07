# Feature Specification: Army List Library

**Feature Branch**: `012-army-library`  
**Created**: 2026-02-06  
**Status**: Draft  
**Target**: Week 3 | **Repository**: Vindicta-Portal

## User Scenarios & Testing

### User Story 1 - View Saved Lists (Priority: P1)

Users browse their saved army lists in one place.

**Acceptance Scenarios**:
1. **Given** user with saved lists, **When** opens library, **Then** all lists displayed with metadata
2. **Given** list in library, **When** clicked, **Then** full list details shown

---

### User Story 2 - Organize Lists (Priority: P2)

Users organize lists into folders or favorites.

**Acceptance Scenarios**:
1. **Given** library view, **When** user stars a list, **Then** list marked as favorite
2. **Given** multiple lists, **When** user creates folder, **Then** lists can be moved to folder

---

## Requirements

### Functional Requirements
- **FR-001**: System MUST display all user's saved lists
- **FR-002**: System MUST support favorites/starring
- **FR-003**: System MUST show list metadata (faction, points, grade)
- **FR-004**: System MUST support search/filter

### Key Entities
- **ListEntry**: id, name, faction, points, grade, createdAt, isFavorite

## Success Criteria
- **SC-001**: Library loads in under 2 seconds
- **SC-002**: Search returns results in under 500ms
