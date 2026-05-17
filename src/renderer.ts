import { readFile } from "node:fs/promises";
import type { FeaturedProject, ProfileConfig } from "./projects";
import type { RecentActivity } from "./github";

export interface ReadmeRenderInput {
  templatePath: string;
  lastUpdated: string;
  profile: ProfileConfig;
  projects: FeaturedProject[];
  recentActivity: RecentActivity;
  projectCardsSvgPath: string;
}

export async function renderReadme(input: ReadmeRenderInput): Promise<string> {
  const template = await readFile(input.templatePath, "utf8");
  const inProgressProjects = input.projects.filter((project) => project.status === "in_progress");
  const completedProjects = input.projects.filter((project) => project.status === "completed");

  const replacements: Record<string, string> = {
    HERO: renderHero(input.profile),
    INTRO: renderIntro(input.profile),
    IN_PROGRESS_PROJECTS: renderProjectDetails(inProgressProjects, "currentFocus"),
    COMPLETED_PROJECTS: renderProjectDetails(completedProjects, "result"),
    FEATURED_PROJECTS: renderFeaturedProjects(input.projects),
    TECH_STACK: renderTechStack(input.profile),
    LEARNING_FOCUS: renderLearningFocus(input.profile),
    WORKFLOW: renderWorkflow(input.profile),
    PROJECT_CARDS_SVG: renderProjectCardsSvg(input.projectCardsSvgPath),
    RECENT_ACTIVITY: renderRecentActivity(input.recentActivity),
    LAST_UPDATED: input.lastUpdated
  };

  return Object.entries(replacements).reduce(
    (content, [key, value]) => content.replaceAll(`{{${key}}}`, value),
    template
  );
}

function renderHero(profile: ProfileConfig): string {
  return [
    '<div align="center">',
    "",
    `# ${profile.name} | GitHub Profile Developer Dashboard`,
    "",
    `**${profile.role}**<br />`,
    `${profile.interests.join(" · ")}에 관심을 두고<br />`,
    profile.direction,
    "",
    `<sub>GitHub: <code>${profile.username}</code> · 프로젝트 기반으로 배우고, 만들고, 기록합니다.</sub>`,
    "",
    "</div>"
  ].join("\n");
}

function renderIntro(profile: ProfileConfig): string {
  return [
    "## 소개",
    "",
    ...profile.introduction.map((line) => `- ${line}`),
    `- 관심 분야는 ${profile.interests.map((interest) => `\`${interest}\``).join(" ")}입니다.`
  ].join("\n");
}

function renderProjectDetails(
  projects: FeaturedProject[],
  detailType: "currentFocus" | "result"
): string {
  if (projects.length === 0) {
    return "현재 표시할 프로젝트가 없습니다.";
  }

  const detailLabel = detailType === "currentFocus" ? "현재 집중 작업" : "구현 결과";

  return projects
    .map((project) =>
      [
        `### [${project.name}](${project.url})`,
        "",
        project.description,
        "",
        `- **기술 스택:** ${renderStack(project.stack)}`,
        `- **${detailLabel}:** ${project[detailType] || "정리 중"}`,
        `- **상태:** ${project.statusLabel}`,
        `- **저장소:** [${project.url}](${project.url})`
      ].join("\n")
    )
    .join("\n\n");
}

function renderFeaturedProjects(projects: FeaturedProject[]): string {
  return [...projects]
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 5)
    .map((project) => {
      const highlight = project.currentFocus || project.result;

      return [
        `### ${project.name}`,
        "",
        `| 항목 | 내용 |`,
        `|---|---|`,
        `| 분류 | ${project.categoryLabel} |`,
        `| 상태 | ${project.statusLabel} |`,
        `| 핵심 설명 | ${project.description} |`,
        `| 주요 기술 스택 | ${renderStack(project.stack)} |`,
        `| 현재 집중 작업 / 구현 결과 | ${highlight} |`,
        `| 저장소 | [GitHub](${project.url}) |`
      ].join("\n");
    })
    .join("\n\n");
}

function renderTechStack(profile: ProfileConfig): string {
  return [
    "| 구분 | 기술 |",
    "|---|---|",
    ...profile.techStackGroups.map(
      (group) => `| ${group.category} | ${group.items.map((item) => `\`${item}\``).join(", ")} |`
    )
  ].join("\n");
}

function renderLearningFocus(profile: ProfileConfig): string {
  return profile.learningFocus
    .map((item) => `- **${item.topic}:** ${item.description}`)
    .join("\n");
}

function renderWorkflow(profile: ProfileConfig): string {
  return profile.workflow.map((item) => `- ${item}`).join("\n");
}

function renderProjectCardsSvg(projectCardsSvgPath: string): string {
  return `<img src="${projectCardsSvgPath}" alt="한국어로 생성된 대표 프로젝트 카드" width="100%" />`;
}

function renderRecentActivity(activity: RecentActivity): string {
  const sourceLabel =
    activity.source === "github-api"
      ? `\`${activity.username}\`의 GitHub 공개 활동을 기준으로 생성했습니다.`
      : "GitHub API 데이터를 가져오지 못한 경우 fallback 활동 요약을 사용합니다.";

  return [sourceLabel, "", ...activity.items.map((item) => `- ${item}`)].join("\n");
}

function renderStack(stack: string[]): string {
  return stack.map((item) => `\`${item}\``).join(" ");
}
