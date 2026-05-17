import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { FeaturedProject } from "../projects";

const SVG_WIDTH = 960;
const CARD_WIDTH = 426;
const CARD_HEIGHT = 166;
const GAP_X = 28;
const GAP_Y = 22;
const PADDING_X = 40;
const HEADER_HEIGHT = 86;
const SECTION_TITLE_HEIGHT = 38;
const BOTTOM_PADDING = 36;

export async function generateProjectCardsSvg(
  projects: FeaturedProject[],
  outputPath: string
): Promise<void> {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderProjectCardsSvg(projects), "utf8");
}

function renderProjectCardsSvg(projects: FeaturedProject[]): string {
  const inProgressProjects = projects.filter((project) => project.status === "in_progress");
  const completedProjects = projects.filter((project) => project.status === "completed");
  const inProgressRows = Math.ceil(inProgressProjects.length / 2);
  const completedRows = Math.ceil(completedProjects.length / 2);
  const inProgressBlockHeight =
    SECTION_TITLE_HEIGHT + inProgressRows * CARD_HEIGHT + Math.max(0, inProgressRows - 1) * GAP_Y;
  const completedBlockHeight =
    SECTION_TITLE_HEIGHT + completedRows * CARD_HEIGHT + Math.max(0, completedRows - 1) * GAP_Y;
  const completedStartY = HEADER_HEIGHT + inProgressBlockHeight + 36;
  const height = completedStartY + completedBlockHeight + BOTTOM_PADDING;

  const inProgressCards = inProgressProjects
    .map((project, index) => renderCard(project, index, HEADER_HEIGHT + SECTION_TITLE_HEIGHT, "focus"))
    .join("\n");
  const completedCards = completedProjects
    .map((project, index) => renderCard(project, index, completedStartY + SECTION_TITLE_HEIGHT, "result"))
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${SVG_WIDTH}" height="${height}" viewBox="0 0 ${SVG_WIDTH} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">한국어 프로젝트 대시보드 카드</title>
  <desc id="desc">jeongiryang GitHub 프로필 README에 표시되는 진행 중 프로젝트와 완료 프로젝트 카드입니다.</desc>
  <style>
    .panel { fill: #f6f8fa; }
    .title { fill: #0f172a; font: 700 26px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Arial, sans-serif; }
    .subtitle { fill: #475569; font: 400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Arial, sans-serif; }
    .section { fill: #111827; font: 700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Arial, sans-serif; }
    .section-note { fill: #64748b; font: 400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Arial, sans-serif; }
    .card { fill: #ffffff; stroke: #d0d7de; stroke-width: 1; }
    .project { fill: #0f172a; font: 700 17px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Arial, sans-serif; }
    .description { fill: #334155; font: 400 13px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Arial, sans-serif; }
    .label { fill: #64748b; font: 700 11px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Arial, sans-serif; }
    .detail { fill: #475569; font: 400 12px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Arial, sans-serif; }
    .stack { fill: #475569; font: 700 12px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Arial, sans-serif; }
    .pill-text { fill: #ffffff; font: 700 11px -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans KR", Arial, sans-serif; }
    .accent-progress { fill: #0969da; }
    .accent-completed { fill: #1a7f37; }
    .accent-muted { fill: #e2e8f0; }
  </style>
  <rect class="panel" x="0" y="0" width="${SVG_WIDTH}" height="${height}" rx="10"/>
  <text class="title" x="${PADDING_X}" y="42">Project Portfolio Dashboard</text>
  <text class="subtitle" x="${PADDING_X}" y="66">진행 중인 작업과 완료한 프로젝트를 TypeScript 데이터에서 자동 생성합니다.</text>

  <text class="section" x="${PADDING_X}" y="${HEADER_HEIGHT + 25}">Now Building · 진행 중</text>
  <text class="section-note" x="${PADDING_X + 176}" y="${HEADER_HEIGHT + 25}">현재 집중해서 개선하는 프로젝트</text>
${inProgressCards}

  <text class="section" x="${PADDING_X}" y="${completedStartY + 25}">Completed · 완료</text>
  <text class="section-note" x="${PADDING_X + 148}" y="${completedStartY + 25}">구현 결과를 정리한 프로젝트</text>
${completedCards}
</svg>
`;
}

function renderCard(
  project: FeaturedProject,
  index: number,
  startY: number,
  detailType: "focus" | "result"
): string {
  const col = index % 2;
  const row = Math.floor(index / 2);
  const x = PADDING_X + col * (CARD_WIDTH + GAP_X);
  const y = startY + row * (CARD_HEIGHT + GAP_Y);
  const accentClass = project.status === "completed" ? "accent-completed" : "accent-progress";
  const detailLabel = detailType === "focus" ? "현재 집중 작업" : "구현 결과";
  const detail = detailType === "focus" ? project.currentFocus : project.result;
  const descriptionLines = wrapText(project.description, 46, 2);
  const detailLines = wrapText(detail, 34, 2);
  const stackText = project.stack.join(" / ");

  return `  <g transform="translate(${x} ${y})">
    <rect class="card" x="0" y="0" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="8"/>
    <rect class="${accentClass}" x="0" y="0" width="5" height="${CARD_HEIGHT}" rx="2.5"/>
    <rect class="${accentClass}" x="24" y="20" width="${getPillWidth(project.statusLabel)}" height="22" rx="11"/>
    <text class="pill-text" x="36" y="35">${escapeXml(project.statusLabel)}</text>
    <text class="label" x="${48 + getPillWidth(project.statusLabel)}" y="35">${escapeXml(project.categoryLabel)}</text>
    <text class="project" x="24" y="66">${escapeXml(truncateText(project.name, 42))}</text>
    <text class="description" x="24" y="89">
${descriptionLines.map((line, lineIndex) => `      <tspan x="24" dy="${lineIndex === 0 ? 0 : 16}">${escapeXml(line)}</tspan>`).join("\n")}
    </text>
    <text class="label" x="24" y="124">${escapeXml(detailLabel)}</text>
    <text class="detail" x="112" y="124">
${detailLines.map((line, lineIndex) => `      <tspan x="112" dy="${lineIndex === 0 ? 0 : 15}">${escapeXml(line)}</tspan>`).join("\n")}
    </text>
    <text class="stack" x="24" y="151">${escapeXml(truncateText(stackText, 54))}</text>
  </g>`;
}

function getPillWidth(label: string): number {
  return 24 + Math.ceil(measureTextUnits(label) * 8);
}

function wrapText(value: string, maxUnits: number, maxLines: number): string[] {
  const words = splitWords(value);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;

    if (measureTextUnits(next) > maxUnits && current) {
      lines.push(current);
      current = word;
    } else if (measureTextUnits(next) > maxUnits) {
      lines.push(truncateText(next, maxUnits));
      current = "";
    } else {
      current = next;
    }

    if (lines.length === maxLines) {
      break;
    }
  }

  if (current && lines.length < maxLines) {
    lines.push(current);
  }

  if (lines.length === maxLines && measureTextUnits(value) > measureTextUnits(lines.join(" "))) {
    lines[maxLines - 1] = appendEllipsis(lines[maxLines - 1], maxUnits);
  }

  return lines.length > 0 ? lines : [""];
}

function splitWords(value: string): string[] {
  return value
    .split(/\s+/)
    .flatMap((word) => (measureTextUnits(word) > 24 ? chunkLongWord(word, 16) : [word]));
}

function chunkLongWord(value: string, maxChars: number): string[] {
  const chunks: string[] = [];

  for (let index = 0; index < value.length; index += maxChars) {
    chunks.push(value.slice(index, index + maxChars));
  }

  return chunks;
}

function appendEllipsis(value: string, maxUnits: number): string {
  if (value.endsWith("...")) {
    return value;
  }

  const withEllipsis = `${value}...`;
  return measureTextUnits(withEllipsis) <= maxUnits ? withEllipsis : truncateText(value, maxUnits);
}

function truncateText(value: string, maxUnits: number): string {
  if (measureTextUnits(value) <= maxUnits) {
    return value;
  }

  let result = "";

  for (const char of value) {
    if (measureTextUnits(`${result}${char}...`) > maxUnits) {
      return `${result}...`;
    }

    result += char;
  }

  return result;
}

function measureTextUnits(value: string): number {
  return [...value].reduce((total, char) => total + (isWideChar(char) ? 1.7 : 1), 0);
}

function isWideChar(char: string): boolean {
  return /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/.test(char);
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
