# Setup

## Local Requirements

- Node.js 20 or newer
- npm

## Install

```bash
npm install
```

## Commands

Build the TypeScript project:

```bash
npm run build
```

Generate `README.md` and `assets/generated/project-cards.svg`:

```bash
npm run generate
```

Run both build and generation:

```bash
npm run check
```

## Editing Profile Data

Most profile content is in `src/projects.ts`.

- Update `profileConfig.techStack` to change the tech stack.
- Update `profileConfig.learningFocus` to change learning topics.
- Update `featuredProjects` to change project names, descriptions, stacks,
  statuses, and repository links.

After editing, run:

```bash
npm run check
```

## Environment Variables

- `GITHUB_USERNAME`: optional. Defaults to `jeongiryang`.
- `GITHUB_TOKEN`: optional locally. In GitHub Actions, use the default
  `${{ github.token }}` or a repository secret if stricter rate limits are
  needed.

The generator never writes tokens or secrets to generated files.

## GitHub Actions

The workflow lives at `.github/workflows/update-profile.yml`.

It runs:

- manually through `workflow_dispatch`
- once per day through `schedule`

The workflow installs dependencies, runs `npm run check`, and commits generated
README/dashboard changes only when files changed.

## Troubleshooting

- If GitHub activity is missing, the generator uses fallback activity text.
- If `npm run build` fails, verify that dependencies were installed with
  `npm install`.
- If generated output looks stale, run `npm run generate` and check
  `git status -sb`.
- If GitHub Actions cannot push changes, confirm repository workflow permissions
  allow read and write access for `GITHUB_TOKEN`.
