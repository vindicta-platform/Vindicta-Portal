# Getting Started

Set up the Vindicta Portal for local development.

## Prerequisites

- Node.js 18+ (for local dev server)
- Git

## Clone and Run

```bash
git clone https://github.com/vindicta-platform/Vindicta-Portal.git
cd Vindicta-Portal
npm run dev
```

Open `http://localhost:3000` in your browser.

## Project Structure

```
Vindicta-Portal/
├── index.html          # Portal landing page
├── club/               # Community section
│   ├── index.html
│   ├── about.html
│   └── team.html
├── platform/           # Application section
│   ├── index.html
│   ├── dashboard.html
│   └── warscribe.html
└── static/             # Shared assets
```

## Deployment

The portal is deployed as a static site. See [Contributing](contributing.md) for deployment workflow.

## Local Testing

To test with API integration locally:

```bash
npm run serve
```

This uses the Firebase emulator for local API proxying.
