# Profile Dashboard Architecture

This repository is the special GitHub profile repository for `jeongiryang`.
The profile README is generated from local TypeScript data and a Markdown
template, so the visible profile can stay polished while the source remains
easy to maintain.

## Structure

- `README.template.md` contains the profile layout and placeholder slots.
- `README.md` is generated output shown on the GitHub profile.
- `src/projects.ts` stores editable profile settings, tech stack, learning
  focus, and featured project metadata.
- `src/github.ts` reads `GITHUB_TOKEN` and `GITHUB_USERNAME`, fetches public
  GitHub activity when available, and falls back to stable local activity text.
- `src/renderer.ts` converts profile data into Markdown sections and replaces
  template placeholders.
- `src/svg/generateProjectCards.ts` generates a pure SVG project dashboard card
  without relying on external badge or image services.
- `src/index.ts` coordinates the full generation flow.
- `assets/generated/project-cards.svg` is generated output referenced by the
  README.
- `.github/workflows/update-profile.yml` runs the generator on demand and once
  per day.

## Generation Flow

1. `src/index.ts` loads local project and profile configuration from
   `src/projects.ts`.
2. It calls `fetchRecentActivity()` from `src/github.ts`.
3. GitHub activity is fetched from the public events API when possible.
4. If the API call fails, fallback activity data is used so generation still
   succeeds locally and in CI.
5. `generateProjectCardsSvg()` writes `assets/generated/project-cards.svg`.
6. `renderReadme()` reads `README.template.md` and replaces every placeholder.
7. The final Markdown is written to `README.md`.

## Placeholder Contract

`README.template.md` currently uses these placeholders:

- `{{LAST_UPDATED}}`
- `{{INTRO}}`
- `{{CURRENTLY_BUILDING}}`
- `{{FEATURED_PROJECTS}}`
- `{{TECH_STACK}}`
- `{{LEARNING_FOCUS}}`
- `{{PROJECT_CARDS_SVG}}`
- `{{RECENT_ACTIVITY}}`

The renderer owns the Markdown formatting for each placeholder. The project data
owns the content.

## GitHub Actions Automation

The workflow runs with `contents: write` permission and uses the default
`GITHUB_TOKEN`. It installs dependencies, runs `npm run check`, and commits only
`README.md` plus generated assets when those files changed. The workflow is
triggered by `workflow_dispatch` and a daily schedule, so generated commits do
not recursively trigger the same workflow.
