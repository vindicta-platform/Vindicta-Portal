# Vindicta Portal

**Static web portal for the Vindicta Platform — deployed on GCP/Firebase Hosting (free tier).**

## Overview

The Vindicta Portal is the entry point for the Vindicta ecosystem, providing:

- **Landing Page** — Split-pane gateway to Club and Platform sections
- **Club Section** — Community pages, team rosters, code of conduct
- **Platform Section** — App dashboard, WARScribe interface, feature pages

## Tech Stack

- Static HTML + Tailwind CSS (CDN)
- Firebase Hosting (Spark plan — free tier)
- API proxied to Cloud Run backend

## Local Development

```bash
npm install
npm run dev
```

Opens local server at `http://localhost:3000`

## Deployment

```bash
firebase deploy --only hosting
```

## Structure

```
├── index.html          # Portal landing (split pane)
├── club/               # Community pages (HTML5UP template)
│   ├── index.html
│   ├── about.html
│   ├── team.html
│   └── assets/
├── platform/           # App pages
│   ├── index.html
│   ├── dashboard.html
│   ├── warscribe.html
│   └── js/
└── static/             # Shared assets
    └── images/
```

## Related Repositories

| Repository | Relationship |
|------------|--------------| 
| [platform-core](https://github.com/vindicta-platform/platform-core) | Backend API (Cloud Run) |
| [Logi-Slate-UI](https://github.com/vindicta-platform/Logi-Slate-UI) | React/TypeScript app (separate) |

## Platform Documentation

> **📌 Important:** All cross-cutting decisions, feature proposals, and platform-wide architecture documentation live in [**Platform-Docs**](https://github.com/vindicta-platform/Platform-Docs).
>
> Any decision affecting multiple repos **must** be recorded there before implementation.

- 📋 [Feature Proposals](https://github.com/vindicta-platform/Platform-Docs/tree/main/docs/proposals)
- 🏗️ [Architecture Decisions](https://github.com/vindicta-platform/Platform-Docs/tree/main/docs)
- 📖 [Contributing Guide](https://github.com/vindicta-platform/Platform-Docs/blob/main/CONTRIBUTING.md)

## License

MIT License - See [LICENSE](./LICENSE) for details.
