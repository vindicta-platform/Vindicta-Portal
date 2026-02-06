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

## 🔗 Pre-Commit Hooks (Required)

All developers **must** install and run pre-commit hooks before committing. This ensures:
- All markdown links are validated
- Code quality standards are enforced

### Setup

1. Install pre-commit:
   ```bash
   pip install pre-commit
   # or with uv:
   uv pip install pre-commit
   ```

2. Install hooks in your local repo:
   ```bash
   pre-commit install
   ```

3. Hooks run automatically on `git commit`. To run manually:
   ```bash
   pre-commit run --all-files
   ```

> [!IMPORTANT]
> PRs with failing pre-commit checks will be blocked. The CI pipeline enforces these checks as a safety net.

## License

MIT License — See [LICENSE](https://github.com/vindicta-platform/Vindicta-Portal/blob/main/LICENSE)
