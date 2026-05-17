import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { FeaturedProject } from "../projects";

const SVG_WIDTH = 960;
const CARD_WIDTH = 428;
const CARD_HEIGHT = 136;
const GAP = 28;
const PADDING_X = 38;
const PADDING_Y = 82;

export async function generateProjectCardsSvg(
  projects: FeaturedProject[],
  outputPath: string
): Promise<void> {
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, renderProjectCardsSvg(projects), "utf8");
}

function renderProjectCardsSvg(projects: FeaturedProject[]): string {
  const rows = Math.ceil(projects.length / 2);
  const height = PADDING_Y + rows * CARD_HEIGHT + Math.max(0, rows - 1) * GAP + 36;
  const cards = projects.map(renderCard).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${SVG_WIDTH}" height="${height}" viewBox="0 0 ${SVG_WIDTH} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="title desc">
  <title id="title">Featured Project Dashboard</title>
  <desc id="desc">Generated summary cards for jeongiryang's featured GitHub profile projects.</desc>
  <style>
    .panel { fill: #f6f8fa; }
    .title { fill: #111827; font: 700 26px Arial, sans-serif; }
    .subtitle { fill: #4b5563; font: 400 14px Arial, sans-serif; }
    .card { fill: #ffffff; stroke: #d0d7de; stroke-width: 1; }
    .project { fill: #0f172a; font: 700 17px Arial, sans-serif; }
    .status { fill: #0969da; font: 700 12px Arial, sans-serif; }
    .description { fill: #374151; font: 400 13px Arial, sans-serif; }
    .stack { fill: #57606a; font: 700 12px Arial, sans-serif; }
    .accent-blue { fill: #0969da; }
    .accent-green { fill: #1a7f37; }
    .accent-amber { fill: #9a6700; }
    .accent-red { fill: #cf222e; }
  </style>
  <rect class="panel" x="0" y="0" width="${SVG_WIDTH}" height="${height}" rx="8"/>
  <circle class="accent-blue" cx="42" cy="40" r="7"/>
  <circle class="accent-green" cx="64" cy="40" r="7"/>
  <circle class="accent-amber" cx="86" cy="40" r="7"/>
  <text class="title" x="112" y="48">Featured Project Dashboard</text>
  <text class="subtitle" x="112" y="69">Generated from local TypeScript project metadata</text>
${cards}
</svg>
`;
}

function renderCard(project: FeaturedProject, index: number): string {
  const col = index % 2;
  const row = Math.floor(index / 2);
  const x = PADDING_X + col * (CARD_WIDTH + GAP);
  const y = PADDING_Y + row * (CARD_HEIGHT + GAP);
  const accentClass = ["accent-blue", "accent-green", "accent-amber", "accent-red"][index % 4];
  const descriptionLines = wrapText(project.description, 58, 2);
  const stackText = project.stack.join(" / ");

  return `  <g transform="translate(${x} ${y})">
    <rect class="card" x="0" y="0" width="${CARD_WIDTH}" height="${CARD_HEIGHT}" rx="8"/>
    <rect class="${accentClass}" x="0" y="0" width="5" height="${CARD_HEIGHT}" rx="2.5"/>
    <text class="project" x="22" y="31">${escapeXml(project.name)}</text>
    <text class="status" x="22" y="54">${escapeXml(project.status)}</text>
    <text class="description" x="22" y="78">
${descriptionLines.map((line, lineIndex) => `      <tspan x="22" dy="${lineIndex === 0 ? 0 : 17}">${escapeXml(line)}</tspan>`).join("\n")}
    </text>
    <text class="stack" x="22" y="119">${escapeXml(truncate(stackText, 56))}</text>
  </g>`;
}

function wrapText(value: string, maxLength: number, maxLines: number): string[] {
  const words = value.split(/\s+/);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
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

  if (lines.length === maxLines && words.join(" ").length > lines.join(" ").length) {
    lines[maxLines - 1] = appendEllipsis(lines[maxLines - 1], maxLength);
  }

  return lines;
}

function appendEllipsis(value: string, maxLength: number): string {
  if (value.endsWith("...")) {
    return value;
  }

  if (value.length <= maxLength - 3) {
    return `${value}...`;
  }

  return truncate(value, maxLength);
}

function truncate(value: string, maxLength: number): string {
  return value.length <= maxLength ? value : `${value.slice(0, Math.max(0, maxLength - 3))}...`;
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
