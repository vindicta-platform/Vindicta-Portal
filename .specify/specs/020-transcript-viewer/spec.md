# Feature Specification: Debate Transcript Viewer

**Feature Branch**: `020-transcript-viewer`  
**Created**: 2026-02-06  
**Status**: Draft  
**Target**: Week 4 | **Repository**: Vindicta-Portal

## User Scenarios & Testing

### User Story 1 - View Debate Transcript (Priority: P1)

Users read full debate between AI agents for their list.

**Acceptance Scenarios**:
1. **Given** graded list, **When** user clicks "View Debate", **Then** transcript displayed
2. **Given** transcript view, **When** user scrolls, **Then** agent turns clearly distinguished

---

## Requirements

### Functional Requirements
- **FR-001**: System MUST display full agent debate transcript
- **FR-002**: System MUST distinguish between agents visually
- **FR-003**: System MUST highlight key arguments

### Key Entities
- **Transcript**: turns[], grade, createdAt
- **Turn**: agent, message, timestamp

## Success Criteria
- **SC-001**: Transcript loads in under 2 seconds
- **SC-002**: User can identify agent roles within 3 seconds
