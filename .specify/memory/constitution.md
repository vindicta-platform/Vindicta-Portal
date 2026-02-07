<!--
Sync Impact Report: 2026-02-05
Version change: [TEMPLATE] → v2.7.0-portal.1
List of modified principles:
- I. The Economic Prime Directive (Added)
- II. Spec-Driven Methodology (Specification Driven Development) (Added)
- III. Generative Dice & Mechanical Fidelity (Added)
- IV. Cognitive Deep Think Protocol (Added)
- V. The No-Nag Policy & Debug Pivot (Added)
- VI. Async-First Mandate (Added)
- VII. Strict Test Performance & Isolation (Added)
- VIII. Identity, Attribution & State Hygiene (Added)
- IX. Repository Isolation & Tooling (Added)
- X. Portal Static Fidelity (Added)
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
- ✅ .specify/templates/checklist-template.md
- ✅ .specify/templates/agent-file-template.md
Follow-up TODOs:
- None
-->

# Vindicta Portal Constitution

## Core Principles

### I. The Economic Prime Directive
Operations MUST run on GCP Free Tier within the `vindicta-warhammer` project only. No standing monthly costs for the base system. AI costs MUST be isolated via a "Gas Tank" model using Gemini models.

### II. Spec-Driven Methodology (Specification Driven Development)
No code without a Specification. Behavioral (BDD) and Technical (TDD) tests MUST fail before implementation begins. Red - Green - Refactor.

### III. Generative Dice & Mechanical Fidelity
All game mechanics (dice/cards) MUST use CSPRNG with traceable `EntropyProof`. Agents MUST NOT simulate probabilistic outcomes; outcomes must be injected by the Dice Engine. Rules MUST adhere 1:1 to competitive standards (10th Ed).

### IV. Cognitive Deep Think Protocol
Agents must simulate "System 2" thinking:
1. **Context Reconstruction**: Scan project state.
2. **Adversarial Simulation**: Generate counter-arguments.
3. **Recursive Decomposition**: Atomic task breakdown.

### V. The No-Nag Policy & Debug Pivot
Agents must try **3 distinct strategies** before reporting an error. If debugging fails to produce artifacts within 3 turns, the agent MUST run standard diagnostics.

### VI. Async-First Mandate
All I/O MUST be asynchronous (`async`/`await`). Blocking calls in production or async paths are strictly PROHIBITED.

### VII. Strict Test Performance & Isolation
- **60-Second Rule**: Unit test suite MUST NOT exceed 60 seconds.
- **Strict Isolation**: No side effects in unit tests.
- **AAA Pattern**: Arrange-Act-Assert for all tests.
- **Mocking**: Zero-trust environment; config must be injected, not read from `.env`.

### VIII. Identity, Attribution & State Hygiene
- **Attribution**: Model/Agent instance must sign-off on commits.
- **State Hygiene**: Return to `main`, verify clean state before new features. No abandoned WIP.

### IX. Repository Isolation & Tooling
- **Tooling**: Prohibited from reinventing project-defined CLI tools. Strictly Windows (PowerShell/Batch).
- **Automation Testing**: Reusable logic MUST be encapsulated in PowerShell modules (`.psm1`) to enable unit and mock testing via Pester.

### X. Portal Static Fidelity
The Vindicta Portal MUST remain a static asset deployment. Frameworks (React/Vue/etc.) are prohibited unless explicitly specified in the Feature Spec. Use Vanilla JS and CSS tokens for thematic consistency.

## Development Workflow

### Spec-Kit Lifecycle
All features MUST progress through the 9 core SDD workflows: Constitution → Spec → Clarify → Plan → Tasks → Implement → Analyze → Checklist → Tasks-to-Issues.

### Quality Gates
1. **Unit Tests**: 100% pass, >80% coverage.
2. **Behavior Tests**: 100% acceptance scenarios.
3. **Linting**: Standards compliant (`npm run lint`).
4. **Security**: No secrets in code/logs.

## Governance
This constitution supersedes all other practices. Amendments require a version bump and notification to the platform lead. All PRs must verify compliance with Specification Driven Development and the Async-First Mandate.

**Version**: v2.7.0-portal.1 | **Ratified**: 2026-02-05 | **Last Amended**: 2026-02-05
