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

  const replacements: Record<string, string> = {
    LAST_UPDATED: input.lastUpdated,
    INTRO: renderIntro(input.profile),
    CURRENTLY_BUILDING: renderCurrentlyBuilding(input.profile.currentlyBuilding),
    FEATURED_PROJECTS: renderFeaturedProjects(input.projects),
    TECH_STACK: renderInlineTags(input.profile.techStack),
    LEARNING_FOCUS: renderLearningFocus(input.profile.learningFocus),
    PROJECT_CARDS_SVG: renderProjectCardsSvg(input.projectCardsSvgPath),
    RECENT_ACTIVITY: renderRecentActivity(input.recentActivity)
  };

  return Object.entries(replacements).reduce(
    (content, [key, value]) => content.replaceAll(`{{${key}}}`, value),
    template
  );
}

function renderIntro(profile: ProfileConfig): string {
  return [
    `안녕하세요. 저는 **${profile.name}**입니다.`,
    "",
    `- **GitHub:** \`${profile.username}\``,
    `- **현재:** ${profile.role}`,
    `- **관심 분야:** ${profile.interests.map((interest) => `\`${interest}\``).join(" ")}`,
    `- **현재 방향성:** ${profile.direction}`
  ].join("\n");
}

function renderCurrentlyBuilding(projectNames: string[]): string {
  return projectNames.map((projectName) => `- ${projectName}`).join("\n");
}

function renderFeaturedProjects(projects: FeaturedProject[]): string {
  return projects
    .map((project) =>
      [
        `- **[${project.name}](${project.url})**`,
        `  - ${project.description}`,
        `  - **Stack:** ${project.stack.map((item) => `\`${item}\``).join(" ")}`,
        `  - **Status:** ${project.status}`,
        `  - **GitHub:** ${project.url}`
      ].join("\n")
    )
    .join("\n\n");
}

function renderInlineTags(items: string[]): string {
  return items.map((item) => `\`${item}\``).join(" ");
}

function renderLearningFocus(items: string[]): string {
  return items.map((item) => `- ${item}`).join("\n");
}

function renderProjectCardsSvg(projectCardsSvgPath: string): string {
  return `<img src="${projectCardsSvgPath}" alt="Generated featured project cards" width="100%" />`;
}

function renderRecentActivity(activity: RecentActivity): string {
  const sourceLabel =
    activity.source === "github-api"
      ? `GitHub public activity for \`${activity.username}\``
      : "Fallback activity used when GitHub API data is unavailable";

  return [`_${sourceLabel}_`, "", ...activity.items.map((item) => `- ${item}`)].join("\n");
}
