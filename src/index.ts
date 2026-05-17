import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { renderReadme } from "./renderer";
import { featuredProjects, profileConfig } from "./projects";
import { generateProjectCardsSvg } from "./svg/generateProjectCards";

const ROOT_DIR = resolve(__dirname, "..");
const TEMPLATE_PATH = resolve(ROOT_DIR, "README.template.md");
const README_PATH = resolve(ROOT_DIR, "README.md");
const PROJECT_CARDS_SVG_PATH = resolve(ROOT_DIR, "assets/generated/project-cards.svg");
const PROJECT_CARDS_SVG_README_PATH = "assets/generated/project-cards.svg";

async function main(): Promise<void> {
  const lastUpdated = formatKstTimestamp(new Date());

  await generateProjectCardsSvg(featuredProjects, PROJECT_CARDS_SVG_PATH);

  const readme = await renderReadme({
    templatePath: TEMPLATE_PATH,
    lastUpdated,
    profile: profileConfig,
    projects: featuredProjects,
    projectCardsSvgPath: PROJECT_CARDS_SVG_README_PATH
  });

  await writeFile(README_PATH, `${readme.trimEnd()}\n`, "utf8");

  console.log(`Generated ${README_PATH}`);
  console.log(`Generated ${PROJECT_CARDS_SVG_PATH}`);
}

function formatKstTimestamp(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const parts = Object.fromEntries(formatter.formatToParts(date).map((part) => [part.type, part.value]));

  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute} KST`;
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
