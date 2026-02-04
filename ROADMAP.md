# Vindicta-Portal Roadmap

> **Vision**: The unified frontend for the Vindicta Platform  
> **Status**: MVP Target  
> **Last Updated**: 2026-02-04

---

## 📅 6-Week Schedule (Feb 4 - Mar 17, 2026)

> **GitHub Project**: https://github.com/orgs/vindicta-platform/projects/4  
> **Master Roadmap**: https://github.com/vindicta-platform/.github/blob/master/ROADMAP.md

### Week 1: Feb 4-10 — Foundation Sprint
| Day | Task | Priority |
|-----|------|----------|
| Mon 4 | Initialize Firebase Remote Config | P0 |
| Tue 5 | Implement feature flag system | P0 |
| Wed 6 | Complete design system tokens | P0 |
| Thu 7 | Mobile-first layout (part 1) | P0 |
| Fri 8 | Mobile-first layout (part 2) | P0 |
| **Sun 10** | **v0.1.0 Foundation Release** | ⭐ |

### Week 2: Feb 11-17 — Auth & List Grader
| Day | Task | Priority |
|-----|------|----------|
| Mon 11 | Firebase Auth integration (part 1) | P0 |
| Tue 12 | Firebase Auth integration (part 2) | P0 |
| Wed 13 | List Grader MVP (part 1) | P0 |
| Thu 14 | List Grader MVP (part 2) | P0 |
| Fri 15 | Meta Snapshot feature | P0 |

### Week 3: Feb 18-24 — Meta Features
| Day | Task | Priority |
|-----|------|----------|
| Mon 18 | Meta Snapshot polish | P0 |
| Tue 19 | Upset Detector (part 1) | P0 |
| Wed 20 | Upset Detector (part 2) | P0 |
| Thu 21 | Integration testing | P0 |
| Fri 22 | Integration polish | P0 |
| **Sun 24** | **v0.2.0 Core Features Release** | ⭐ |

### Week 4: Feb 25 - Mar 3 — Game Tracker Prep
*Focus shifts to supporting products; continue polishing existing features*

### Week 5: Mar 4-10 — Game Tracker & PWA
| Day | Task | Priority |
|-----|------|----------|
| Mon 4 | Game Tracker MVP (part 1) | P0 |
| Tue 5 | Game Tracker MVP (part 2) | P0 |
| Wed 6 | PWA setup (part 1) | P0 |
| Thu 7 | PWA setup (part 2) | P0 |

### Week 6: Mar 11-17 — v1.0 Production Release ⭐
| Day | Task | Priority |
|-----|------|----------|
| Mon 11 | Primordia overlay integration | P0 |
| Tue 12 | PWA install testing | P0 |
| Wed 13 | Final testing | P0 |
| Thu 14 | Bug fixes | P0 |
| **Fri 15** | **v1.0.0 PRODUCTION RELEASE** | ⭐⭐⭐ |

---

## v1.0 Target: March 2026

### Mission Statement

Deliver the flagship web portal that unifies all Vindicta products — Army Grading, Meta Analysis, Tournament Predictions, and Game Recording — into a cohesive, delightful user experience.

---

## Milestone Timeline

```
┌─────────────────────────────────────────────────────────────────┐
│  Feb 2026          Mar 2026          Apr 2026                   │
│  ─────────────────────────────────────────────────────────────  │
│  [v0.1.0]          [v0.2.0]          [v1.0.0]                   │
│  Foundation        Core Features     Production                 │
│                                                                  │
│  Week 1-2          Week 3-4          Week 5-6                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## v0.1.0 — Foundation (Target: Feb 10, 2026)

### Deliverables
- [ ] Vanilla JS + CSS foundation (no framework)
- [ ] Firebase Remote Config integration
- [ ] Design system (Amber-500, dark mode, Outfit font)
- [ ] Component library (modular, reusable)
- [ ] Responsive layout (mobile-first)
- [ ] Firebase Hosting deployment

### Key Measurable Results
| Metric | Target | Measurement |
|--------|--------|-------------|
| **Lighthouse Score** | 95+ performance | Lighthouse audit |
| **Mobile Usability** | Works on 375px+ | Device testing |
| **Page Load** | <2 seconds | Performance test |

### Exit Criteria
- [ ] Deployed to Firebase Hosting
- [ ] Dark mode with glassmorphism effects
- [ ] Responsive on all devices

---

## v0.2.0 — Core Features (Target: Feb 24, 2026)

### Deliverables
- [ ] Meta-Oracle integration (List Grader)
- [ ] Meta Snapshot display
- [ ] Tier list visualization
- [ ] Upset Detector display
- [ ] Tournament prediction tracker
- [ ] Authentication (Firebase Auth)

### Key Measurable Results
| Metric | Target | Measurement |
|--------|--------|-------------|
| **API Integration** | 3+ endpoints connected | Integration test |
| **Auth Flow** | Complete sign-up/sign-in | E2E test |
| **Feature Coverage** | List grading functional | User testing |

### Exit Criteria
- [ ] Grade a list through the UI
- [ ] View current meta snapshot
- [ ] User authentication working

---

## v1.0.0 — Production Release (Target: Mar 15, 2026)

### Deliverables
- [ ] Logi-Slate-UI integration (Game Tracker)
- [ ] Primordia AI evaluation overlay
- [ ] Opening Book recommendations
- [ ] Community features (list sharing)
- [ ] Performance optimization
- [ ] SEO and accessibility

### Key Measurable Results
| Metric | Target | Measurement |
|--------|--------|-------------|
| **Lighthouse Score** | 95+ all categories | Lighthouse audit |
| **Accessibility** | WCAG 2.1 AA | Axe audit |
| **User Adoption** | 100+ registered users | Analytics |
| **Engagement** | 10+ lists graded/day | Analytics |

### Exit Criteria
- [ ] No critical bugs for 2 weeks
- [ ] All core features functional
- [ ] Public launch ready

---

## Design System

| Token | Value |
|-------|-------|
| **Primary Color** | Amber-500 (#F59E0B) |
| **Background** | Dark mode (#0F0F0F) |
| **Font Family** | Outfit |
| **Border Radius** | 8px |
| **Spacing Scale** | 4px base |

### Effects
- Glassmorphism for cards
- Subtle micro-animations
- Smooth transitions (200ms ease)
- Vibrant gradients

---

## Core Features

| Feature | Description | API |
|---------|-------------|-----|
| **List Grader** | Get Meta-Oracle grade for your army | `/api/meta/grade` |
| **Meta Snapshot** | Current tier rankings | `/api/meta/snapshot` |
| **Upset Detector** | Find giant-killer lists | `/api/meta/upsets` |
| **Tournament Tracker** | Prediction accuracy | `/api/meta/predictions` |
| **Game Recorder** | Record games (via Logi-Slate) | WARScribe-Core |
| **Opening Book** | Deployment recommendations | Primordia API |

---

## Technology Stack

- **Frontend**: Vanilla JavaScript ES2020+
- **Styling**: Vanilla CSS (no Tailwind)
- **Hosting**: Firebase Hosting
- **API**: Vindicta-API (Cloud Run)
- **Auth**: Firebase Authentication
- **Config**: Firebase Remote Config

---

## Dependencies

| Dependency | Status | Notes |
|------------|--------|-------|
| Meta-Oracle | 🔄 Parallel | Grading API |
| Vindicta-API | 🔄 Parallel | Backend gateway |
| Firebase | ✅ Available | Hosting, Auth |
| Logi-Slate-UI | 🔄 Parallel | Game tracker component |

---

## Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| API latency | Medium | Medium | Loading states, optimistic UI |
| Mobile performance | Medium | High | Optimize early, lazy loading |
| Feature creep | High | Medium | Strict MVP scope |
| User confusion | Medium | Medium | Onboarding flow |

---

## Success Criteria for v1

1. **Adoption**: 100+ registered users in first month
2. **Engagement**: 10+ lists graded daily
3. **Performance**: 95+ Lighthouse score
4. **Stability**: <1% error rate on core features

---

## Analytics Goals

| Metric | v1 Target |
|--------|-----------|
| Monthly Active Users | 500+ |
| Lists Graded/Day | 50+ |
| Games Recorded/Week | 20+ |
| Session Duration | >5 minutes |
| Return Rate (7-day) | >30% |

---

*Maintained by: Vindicta Platform Team*
