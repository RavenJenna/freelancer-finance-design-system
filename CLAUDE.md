# Claude Code Project Rules

## Commit Conventions

- Use conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `docs:`, `chore:`
- Keep subject lines under 72 characters
- After completing each component or each logical unit of work, stage, commit, and push automatically without asking

## Branch Strategy

- Commit to a feature branch, not `main`, for each new component group
- Name branches descriptively: e.g. `feat/color-tokens`, `feat/button-component`

## Reference

- Storybook docs: https://storybook.js.org/llms.txt
- Next.js 16 breaking changes: see `node_modules/next/dist/docs/` before writing any Next.js-specific code
- Tailwind v4 uses CSS-based config via `@theme` in `globals.css` — no `tailwind.config.js`
