# Contributing

Contribute to the Vindicta Portal.

## Development Setup

```bash
git clone https://github.com/vindicta-platform/Vindicta-Portal.git
cd Vindicta-Portal
npm run dev
```

## Code Style

- **HTML**: Semantic elements, accessible markup
- **CSS**: Tailwind utility classes preferred
- **JS**: Vanilla JavaScript, no frameworks for core pages

## Adding Pages

1. Create HTML file in appropriate directory (`club/` or `platform/`)
2. Include standard header/footer via `portal-ui.js`
3. Follow existing page structure for consistency

## Pull Request Process

1. Fork the repository
2. Create feature branch (`feat/my-feature`)
3. Make changes with descriptive commits
4. Open PR against `main` branch
5. Await review

## Deployment

Deployments are handled through the CI/CD pipeline. Merged PRs to `main` trigger automatic deployment.

## Assets

- Place images in `static/images/`
- Use relative paths from HTML files
- Optimize images before committing

## License

MIT License — See [LICENSE](https://github.com/vindicta-platform/Vindicta-Portal/blob/main/LICENSE)
