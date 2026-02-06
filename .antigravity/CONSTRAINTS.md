# Vindicta-Portal Constraints

> Critical rules agents MUST follow when modifying this repository.

## ⛔ Hard Constraints

1. **No Tailwind CDN** - Use vanilla CSS with design tokens only
2. **No Framework Dependencies** - Vanilla JS only (no React/Vue/Angular)
3. **Firebase SDK v10+** - Do not downgrade SDK versions
4. **MPA Architecture** - Each page is a separate HTML file, not SPA routing

## ⚠️ Schema Compatibility

### Data-Slate Schema
All data structures must conform to the platform's Data-Slate schema:
- Army lists: `{ id, name, faction, units[], points }`
- Match records: `{ id, players[], result, turns[], timestamp }`

### WARScribe Notation
When displaying or accepting game input:
- Must parse via WARScribe-Core
- Never implement custom notation parsers
- Reference `warscribe-core/GRAMMAR.md` for syntax

## 🔒 Security Rules

- All Firebase operations require authentication
- No hardcoded API keys (use environment variables)
- Remote Config values must have defaults

## 📐 UI Standards

- All colors from `--color-*` tokens
- Minimum touch target: 44x44px
- Responsive breakpoints: 480px, 768px, 1024px
- Animation duration: 200-300ms max

## 🧪 Testing Requirements

Before merging:
- [ ] `npm run lint` passes
- [ ] `npm run test` passes (Vitest + Playwright)
- [ ] Manual verification on mobile viewport
