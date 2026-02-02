<!--
- Version change: 2.0.0 -> 3.0.0 (Major overhaul: Prime Directive, Open Source, BDD-First)
- List of modified principles:
    - I: Portal Scope -> I: The Prime Directive (Economic Constraint)
    - II: BDD-First Development -> II: Evidence-First Development (BDD → TDD)
    - III: Playwright Testing Standard -> III: Quality Gates
    - IV: Zero-Cost Baseline -> Merged into Prime Directive
- Added sections:
    - IV: Open Source Values
    - V: Portal-Specific Guidelines
    - VI: Agentic Guidance
- Removed sections: None
- Templates requiring updates:
    - .specify/templates/spec-template.md: ⚠ pending (if exists)
- Follow-up TODOs: None
-->
# Vindicta Portal Constitution

**Version**: 3.0.0 | **Ratified**: 2026-02-01 | **Last Amended**: 2026-02-01

## Preamble

This constitution governs agentic and human development within the **Vindicta-Portal** repository. The Portal is the public-facing gateway for Team Vindicta—a Warhammer 40,000 competitive club based in Long Island, NY—and the Vindicta Platform tools. This constitution is subordinate to the main `platform-core` constitution.

---

## Core Principles

### I. The Prime Directive (Economic Constraint)

The Vindicta Portal MUST operate at **zero standing monthly cost**. All infrastructure, hosting, and third-party integrations MUST remain within free tier limits:

- **Firebase Hosting**: Spark Plan (10GB/month bandwidth, 360MB storage)
- **GCP Project**: `vindicta-warhammer` ONLY. No other billing accounts permitted.
- **Third-Party Services**: Free tiers only (Appzi, Sleekplan, etc.)

> Any deviation from the zero-cost baseline requires explicit approval from the Supreme Architect (User).

### II. Evidence-First Development (BDD → TDD)

All development MUST follow the Evidence-First methodology:

1. **Behavioral expectations (BDD) MUST be defined and confirmed failing FIRST**
2. Unit tests (TDD) are written AFTER behavioral tests exist
3. Implementation code is written ONLY after tests exist
4. A "Green" test suite is the only passport for code to enter the codebase

**Order of Operations**: Specification → BDD Tests → TDD Tests → Implementation → Verification

No code shall be merged without corresponding Playwright tests that verify the expected behavior.

### III. Quality Gates

All portal features MUST pass these gates before deployment:

- **Page Health**: All pages return 200 status, no console errors
- **Content Visibility**: Key content is visible and accessible
- **Navigation**: All internal links work correctly
- **Accessibility**: Images have alt text, interactive elements are keyboard-accessible
- **Performance**: Pages load in under 5 seconds

### IV. Open Source Values

The Vindicta Platform is built on open source principles:

- **Transparency**: All code is public and decisions are documented
- **Community**: Contributions are welcome and credited
- **Simplicity**: Prefer simple, readable solutions over clever ones
- **Documentation**: Code should be self-documenting; complex logic requires comments

> "Explicit is better than implicit. Simple is better than complex."

### V. Portal-Specific Guidelines

The Portal consists of two distinct sections with different purposes:

| Section | Purpose | Aesthetic |
|---------|---------|-----------|
| **Club** (`/club/`) | Community showcase for Team Vindicta | Warm, community-focused, hobbyist feel |
| **Platform** (`/platform/`) | Tools and features for competitive play | Technical, strategic, tool-focused |

- **Club Section**: SHOULD feel like a gaming club website, NOT a tech app
- **Platform Section**: MAY use technical/app-like design patterns
- **Shared Header/Footer**: Unified branding across both sections

### VI. Agentic Guidance

Agents working in this repository:

- MUST write behavioral tests BEFORE implementation
- MUST NOT deploy without passing test suite
- MUST validate all links before committing
- MUST follow the HTML5UP template conventions for Club section
- MUST use Tailwind CSS for Platform section styling
- SHOULD ask clarifying questions before major visual changes

---

## Governance

### Amendment Procedure

This constitution may be amended by the Supreme Architect (User) at any time. All amendments MUST:

1. Be documented in the Sync Impact Report (HTML comment at top of file)
2. Increment the version according to semantic versioning
3. Update the "Last Amended" date

### Compliance Review

- Constitution compliance SHOULD be reviewed before each deployment
- Violations MUST be documented and corrected before merge

### Hierarchy

This constitution is **subordinate** to the main `platform-core` constitution. In case of conflict, `platform-core` takes precedence.
