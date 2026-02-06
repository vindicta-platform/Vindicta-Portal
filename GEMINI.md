# Vindicta-Portal Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-02-01

## Active Technologies

- JavaScript ES2020+ (vanilla JS, no framework)
- Vite 7+ (Build system & Dev server)
- Firebase SDK v10+ (App, Remote-Config, Analytics)
- GitHub Actions (CI/CD Pipeline)

## Project Structure

```text
.github/workflows/ # CI/CD Pipeline
assets/            # CSS, JS, Images
club/              # Club sub-page
dist/              # Production build output
platform/          # Platform sub-page
index.html         # Main landing page
```

## Commands

- `npm run dev`: Start local development server (Vite)
- `npm run build`: Build for production
- `npm run deploy`: Build and deploy to Firebase Hosting
- `npm test`: Run Playwright tests

## Recent Changes

- 001-firebase-remote-config: Integrated Firebase Remote Config + Analytics
- 002-build-system-migration: Migrated to Vite for .env support and optimized building
- 003-ci-cd-pipeline: Setup GitHub Actions for automated testing and Firebase deployment
- 004-ui-redesign: Applied animated gradient background and improved transparency

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
