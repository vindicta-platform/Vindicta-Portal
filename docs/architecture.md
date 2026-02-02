# Architecture

High-level design of the Vindicta Portal.

## Overview

```
┌─────────────────────────────────────────────────────┐
│                 Vindicta Portal                      │
│  ┌──────────────────┐    ┌──────────────────────┐   │
│  │   /club/         │    │   /platform/         │   │
│  │   Community      │    │   Application        │   │
│  │   Pages          │    │   Pages              │   │
│  └──────────────────┘    └──────────────────────┘   │
│                                │                     │
│                                ▼                     │
│                         /api/* proxy                 │
│                                │                     │
└────────────────────────────────┼─────────────────────┘
                                 ▼
                     ┌───────────────────────┐
                     │   Backend API         │
                     │   (platform-core)     │
                     └───────────────────────┘
```

## Components

### Landing Page (`/`)
Split-pane gateway directing users to Club or Platform sections.

### Club Section (`/club/`)
Static HTML pages for community content:
- Team information
- Code of conduct
- Event announcements

### Platform Section (`/platform/`)
Application interface pages:
- Dashboard for central control
- WARScribe notation entry
- Feature status indicators

### API Proxy (`/api/*`)
Requests to `/api/*` are proxied to the backend service, enabling:
- Dice rolling endpoints
- Match data operations
- User authentication (planned)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | Tailwind CSS (CDN) |
| Fonts | Google Fonts (Outfit, Bebas Neue) |
| Hosting | Static file server |
| API | REST proxy to backend |

## Design Principles

1. **Static First** — No client-side framework for core pages
2. **Progressive Enhancement** — JS adds interactions, not content
3. **Mobile Responsive** — Flexbox layouts, responsive breakpoints
4. **Dark Mode Default** — Premium aesthetic for gaming audience
