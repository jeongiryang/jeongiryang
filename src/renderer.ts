import { readFile } from "node:fs/promises";
import type { ProfileConfig, ProfileProject, ProjectSection } from "./projects";

export interface ReadmeRenderInput {
  templatePath: string;
  lastUpdated: string;
  profile: ProfileConfig;
  projects: ProfileProject[];
}

const PREVIEW_WIDTH = 420;

export async function renderReadme(input: ReadmeRenderInput): Promise<string> {
  const template = await readFile(input.templatePath, "utf8");
  const completedProjects = sortedProjects(input.projects, "completed");
  const inProgressProjects = sortedProjects(input.projects, "in_progress");
  const assignmentProjects = sortedProjects(input.projects, "assignment");

  const replacements: Record<string, string> = {
    GENERATED_COMMENT: renderHiddenGeneratedComment(input.lastUpdated),
    HERO: renderHero(input.profile),
    ABOUT_ME: renderAboutMe(input.profile),
    COMPLETED_PROJECTS: renderCompletedProjectsTable(completedProjects),
    IN_PROGRESS_PROJECTS: renderInProgressProjectsTable(inProgressProjects),
    COMPLETED_ASSIGNMENTS: renderCompletedAssignmentsTable(assignmentProjects)
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
    "> [!IMPORTANT]",
    `> ${profile.importantNote}`,
    "",
    "> [!NOTE]",
    `> ${profile.aboutNote}`,
    "",
    ...profile.aboutBullets.slice(0, 3).map((item) => `- ${item}`)
  ].join("\n");
}

function renderCompletedProjectsTable(projects: ProfileProject[]): string {
  if (projects.length === 0) {
    return "표시할 프로젝트가 없습니다.";
  }

  return [
    "| 프로젝트 | 요약 | 기술 | 미리보기 |",
    "|---|---|---|---|",
    ...projects.map((project) =>
      renderRow([
        renderProjectName(project),
        project.description,
        renderTech(project),
        renderPreviewImage(project)
      ])
    )
  ].join("\n");
}

function renderInProgressProjectsTable(projects: ProfileProject[]): string {
  if (projects.length === 0) {
    return "표시할 프로젝트가 없습니다.";
  }

  return [
    "| 프로젝트 | 요약 | 기술 |",
    "|---|---|---|",
    ...projects.map((project) =>
      renderRow([
        renderProjectName(project),
        project.description,
        renderTech(project)
      ])
    )
  ].join("\n");
}

function renderCompletedAssignmentsTable(projects: ProfileProject[]): string {
  if (projects.length === 0) {
    return "표시할 과제가 없습니다.";
  }

  return [
    "| 과제 | 요약 | 기술 |",
    "|---|---|---|",
    ...projects.map((project) =>
      renderRow([
        renderProjectName(project),
        project.description,
        renderTech(project)
      ])
    )
  ].join("\n");
}

function renderTech(project: ProfileProject): string {
  return project.tech.join(", ");
}

function renderPreviewImage(project: ProfileProject): string {
  if (!project.previewImage) {
    return "-";
  }

  const alt = project.previewAlt || `${project.displayName} 미리보기`;
  return `<img src="${project.previewImage}" width="${PREVIEW_WIDTH}" alt="${alt}" />`;
}

function sortedProjects(projects: ProfileProject[], section: ProjectSection): ProfileProject[] {
  return projects.filter((project) => project.section === section).sort((a, b) => a.priority - b.priority);
}

function renderProjectName(project: ProfileProject): string {
  if (project.isPublic && !project.isPrivate && project.url) {
    return `[${project.displayName}](${project.url})`;
  }

  return project.displayName;
}

function renderRow(values: string[]): string {
  return `| ${values.map(escapeMarkdownTableCell).join(" | ")} |`;
}

function escapeMarkdownTableCell(value: string): string {
  return value.replaceAll("|", "\\|").replaceAll("\n", " ");
}
