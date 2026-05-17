import { readFile } from "node:fs/promises";
import type { FeaturedProject, ProfileConfig } from "./projects";

export interface ReadmeRenderInput {
  templatePath: string;
  lastUpdated: string;
  profile: ProfileConfig;
  projects: FeaturedProject[];
}

export async function renderReadme(input: ReadmeRenderInput): Promise<string> {
  const template = await readFile(input.templatePath, "utf8");
  const inProgressProjects = sortedProjects(input.projects, "in_progress");
  const completedProjects = sortedProjects(input.projects, "completed");

  const replacements: Record<string, string> = {
    GENERATED_COMMENT: renderHiddenGeneratedComment(input.lastUpdated),
    HERO: renderHero(input.profile),
    ABOUT_ME: renderAboutMe(input.profile),
    IN_PROGRESS_PROJECTS: renderInProgressProjectsTable(inProgressProjects),
    COMPLETED_PROJECTS: renderCompletedProjectsTable(completedProjects),
    FOOTER: renderFooter()
  };

  return Object.entries(replacements).reduce(
    (content, [key, value]) => content.replaceAll(`{{${key}}}`, value),
    template
  );
}

function renderHiddenGeneratedComment(lastUpdated: string): string {
  return [
    "<!--",
    "이 README는 npm run generate로 자동 생성됩니다.",
    "README.template.md와 src/projects.ts를 수정한 뒤 README.md를 다시 생성합니다.",
    `마지막 갱신: ${lastUpdated}`,
    "-->"
  ].join("\n");
}

function renderHero(profile: ProfileConfig): string {
  return [
    '<div align="center">',
    "",
    `# ${profile.name}`,
    "",
    `**${profile.role}**`,
    "",
    "Codex와 GitHub 기반 워크플로우로<br />",
    "작게 만들고, 검증하고, 반복 개선하는 프로젝트를 진행하고 있습니다.",
    "",
    "</div>"
  ].join("\n");
}

function renderAboutMe(profile: ProfileConfig): string {
  return [
    "## About Me",
    "",
    "> [!NOTE]",
    `> ${profile.aboutNote}`,
    "",
    ...profile.aboutBullets.slice(0, 3).map((item) => `- ${item}`)
  ].join("\n");
}

function renderInProgressProjectsTable(projects: FeaturedProject[]): string {
  if (projects.length === 0) {
    return "표시할 프로젝트가 없습니다.";
  }

  return [
    "| 제목 | 요약 | 기술 |",
    "|---|---|---|",
    ...projects.map((project) =>
      [
        renderProjectName(project),
        project.description,
        renderPlainStack(project.stack)
      ]
        .map(escapeMarkdownTableCell)
        .join(" | ")
    ).map((row) => `| ${row} |`)
  ].join("\n");
}

function renderCompletedProjectsTable(projects: FeaturedProject[]): string {
  if (projects.length === 0) {
    return "표시할 프로젝트가 없습니다.";
  }

  return [
    "| 제목 | 요약 | 결과 |",
    "|---|---|---|",
    ...projects.map((project) =>
      [
        renderProjectName(project),
        project.description,
        project.result
      ]
        .map(escapeMarkdownTableCell)
        .join(" | ")
    ).map((row) => `| ${row} |`)
  ].join("\n");
}

function renderFooter(): string {
  return [
    '<div align="center">',
    "",
    "**방문해주셔서 감사합니다.**",
    "",
    "</div>"
  ].join("\n");
}

function sortedProjects(projects: FeaturedProject[], status: FeaturedProject["status"]): FeaturedProject[] {
  return projects.filter((project) => project.status === status).sort((a, b) => a.priority - b.priority);
}

function renderProjectName(project: FeaturedProject): string {
  if (project.isPublic && project.displayUrl) {
    return `[${project.name}](${project.url})`;
  }

  return project.name;
}

function renderPlainStack(stack: string[]): string {
  return stack.join(", ");
}

function escapeMarkdownTableCell(value: string): string {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}
