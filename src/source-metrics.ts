import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, mkdtemp, readFile, readdir, rename, stat, writeFile } from "node:fs/promises";
import { extname, isAbsolute, join, relative, resolve } from "node:path";
import { profileConfig, publicProjects, type ProfileProject } from "./projects";

const CLOC_VERSION = "2.10";
const MAX_SOURCE_BYTES = 2 * 1024 * 1024;
const SOURCE_EXTENSIONS = [
  "js", "jsx", "ts", "tsx", "py", "c", "cpp", "h", "hpp", "html", "css", "scss", "sql", "prisma", "gd", "vert", "frag", "glsl"
] as const;
const EXCLUDED_DIRECTORIES = new Set([
  ".git", "node_modules", "vendor", "vendors", "dist", "build", "out", "coverage",
  "generated", "__generated__", "thirdparty", "third-party", "third_party", "third party",
  "external", "externals", "dependencies", "deps", "glad", "stb", "glm", "glew", "glfw", "imgui"
]);

export interface SourceLanguageMetrics {
  name: string;
  code: number;
  comment: number;
  blank: number;
  files: number;
}

export interface SourceProjectMetrics {
  repo: string;
  name: string;
  head: string;
  code: number;
  comment: number;
  blank: number;
  files: number;
  languages: SourceLanguageMetrics[];
}

export interface SourceMetricsSnapshot {
  schemaVersion: 1;
  clocVersion: "2.10";
  projects: SourceProjectMetrics[];
  measuredAt: string;
}

interface PublicRepository {
  full_name: string;
  private: boolean;
  fork: boolean;
  owner: { login: string };
  default_branch: string;
}

interface RepositoryHead {
  project: ProfileProject;
  repo: string;
  defaultBranch: string;
  head: string;
}

interface ClocCounts {
  code: number;
  comment: number;
  blank: number;
  nFiles: number;
}

/** Measure only the explicitly selected public, owned, original repositories. */
export async function collectSourceMetrics(rootDir: string): Promise<void> {
  const root = resolve(rootDir);
  const clocScript = process.env.CLOC_SCRIPT;
  if (!clocScript || !isAbsolute(clocScript) || extname(clocScript).toLowerCase() !== ".pl") {
    throw new Error("CLOC_SCRIPT must be an absolute path to the trusted cloc-2.10.pl file.");
  }
  if (!(await stat(clocScript)).isFile()) {
    throw new Error("CLOC_SCRIPT must point to a regular file.");
  }
  const perl = process.env.CLOC_PERL?.trim() || "perl";
  const version = (await run(perl, [clocScript, "--version"], { timeout: 30_000 })).trim();
  if (version !== CLOC_VERSION) {
    throw new Error(`Expected cloc ${CLOC_VERSION}; received ${version || "no version"}.`);
  }

  const selected = measuredProjects();
  const previous = await readSnapshot(root, false);
  // Permission and visibility are rechecked even when the previous HEAD is cached.
  const heads = await Promise.all(selected.map(fetchPublicHead));
  const cacheRoot = resolve(process.env.PROFILE_SOURCE_CACHE || resolve(root, "../profile-source-cache"));
  await mkdir(cacheRoot, { recursive: true });
  const measured: SourceProjectMetrics[] = [];

  for (const target of heads) {
    const old = previous?.projects.find((project) => project.repo === target.repo && project.head === target.head);
    if (old) {
      measured.push({ ...old, name: shortName(target.project) });
      continue;
    }

    // Each attempt gets a new directory; existing cache checkouts are never reset or removed.
    const attempt = await mkdtemp(join(cacheRoot, `${target.project.name}-`));
    const checkout = join(attempt, "checkout");
    const emptyHooks = join(attempt, "empty-hooks");
    await mkdir(emptyHooks);
    const gitConfig = [
      "-c", `core.hooksPath=${emptyHooks}`,
      "-c", "filter.lfs.smudge=",
      "-c", "filter.lfs.process=",
      "-c", "filter.lfs.required=false"
    ];
    await run("git", [
      ...gitConfig, "clone", "--depth", "1", "--filter=blob:none", "--no-checkout", "--single-branch",
      "--branch", target.defaultBranch,
      `https://github.com/${target.repo}.git`, checkout
    ], { timeout: 180_000 });
    await run("git", [...gitConfig, "sparse-checkout", "init", "--no-cone"], { cwd: checkout });
    const patterns = [
      ...SOURCE_EXTENSIONS.map((extension) => `*.${extension}`),
      ...[...EXCLUDED_DIRECTORIES].map((directory) => `!**/${directory}/**`),
      "!*.min.*", "!*-min.js", "!*.bundle.*", "!*.generated.*", "!*_generated.*",
      "!glad.c", "!glad.h", "!stb*.h", "!glfw3*.h", "!glew.h"
    ];
    await run("git", [...gitConfig, "sparse-checkout", "set", "--no-cone", "--stdin"], {
      cwd: checkout,
      input: `${patterns.join("\n")}\n`
    });
    await run("git", [...gitConfig, "checkout", "--force"], { cwd: checkout, timeout: 180_000 });
    const actualHead = (await run("git", [...gitConfig, "rev-parse", "HEAD"], { cwd: checkout })).trim();
    if (!/^[a-f0-9]{40}$/i.test(actualHead)) {
      throw new Error(`Invalid checked-out commit for ${target.repo}.`);
    }
    if (actualHead !== target.head) {
      throw new Error(`The default branch moved while measuring ${target.repo}; retry to measure one verified HEAD.`);
    }

    const sourceFiles = await listSourceFiles(checkout);
    if (sourceFiles.length === 0) {
      throw new Error(`No eligible source files found for ${target.repo}; refusing to publish a placeholder count.`);
    }
    const listFile = join(attempt, "source-files.txt");
    await writeFile(listFile, `${sourceFiles.join("\n")}\n`, "utf8");
    const output = await run(perl, [
      clocScript, "--json", "--quiet", `--list-file=${listFile}`
    ], { cwd: checkout, timeout: 180_000 });
    const parsed = JSON.parse(output) as Record<string, unknown>;
    const sum = validClocCounts(parsed.SUM, `${target.repo} SUM`);
    const languages = Object.entries(parsed)
      .filter(([key]) => key !== "header" && key !== "SUM")
      .map(([name, counts]) => {
        const value = validClocCounts(counts, `${target.repo} ${name}`);
        return { name, code: value.code, comment: value.comment, blank: value.blank, files: value.nFiles };
      })
      .sort((a, b) => a.name.localeCompare(b.name, "en"));
    if (sum.nFiles === 0 || languages.length === 0) {
      throw new Error(`cloc returned no measured source for ${target.repo}.`);
    }
    measured.push({
      repo: target.repo,
      name: shortName(target.project),
      head: actualHead,
      code: sum.code,
      comment: sum.comment,
      blank: sum.blank,
      files: sum.nFiles,
      languages
    });
  }

  const unchanged = previous && measurementSignature(previous.projects) === measurementSignature(measured);
  const snapshot: SourceMetricsSnapshot = {
    schemaVersion: 1,
    clocVersion: CLOC_VERSION,
    projects: measured,
    measuredAt: unchanged ? previous.measuredAt : new Date().toISOString()
  };
  const destination = join(root, "assets/generated/source-metrics.json");
  const serialized = `${JSON.stringify(snapshot, null, 2)}\n`;
  // Write only after every repository succeeded; rename keeps an existing snapshot intact on measurement errors.
  if (previous && JSON.stringify(previous) === JSON.stringify(snapshot)) return;
  await atomicWrite(destination, serialized);
}

/** Draw the existing measured snapshot; never invent values or fetch sources here. */
export async function generateSourceScaleSvgs(rootDir: string): Promise<void> {
  const root = resolve(rootDir);
  const snapshot = await readSnapshot(root, true);
  if (!snapshot) throw new Error("A measured source-metrics.json snapshot is required.");
  const expected = measuredProjects().map((project) => `${profileConfig.username}/${project.name}`);
  if (snapshot.projects.length !== expected.length || snapshot.projects.some((project, index) => project.repo !== expected[index])) {
    throw new Error("The source metrics snapshot does not match the selected public projects.");
  }
  await Promise.all((['light', 'dark'] as const).map((theme) =>
    atomicWrite(join(root, `assets/generated/source-scale-${theme}.svg`), renderSourceScale(snapshot, theme))
  ));
}

function measuredProjects(): ProfileProject[] {
  const selected = publicProjects().filter((project) => project.measureSource === true);
  if (selected.length === 0) throw new Error("No public projects are selected for source measurement.");
  for (const project of selected) {
    if (!/^[A-Za-z0-9_.-]+$/.test(project.name) || project.name === "." || project.name === "..") {
      throw new Error("Invalid repository name in the source measurement configuration.");
    }
  }
  return selected;
}

function shortName(project: ProfileProject): string {
  return project.shortName || project.displayName;
}

async function fetchPublicHead(project: ProfileProject): Promise<RepositoryHead> {
  const expectedOwner = profileConfig.username;
  if (expectedOwner !== "jeongiryang") throw new Error("Source measurement is restricted to jeongiryang repositories.");
  const repo = `${expectedOwner}/${project.name}`;
  const metadata = await githubJson<PublicRepository>(`repos/${repo}`);
  if (metadata.private !== false || metadata.fork !== false || metadata.owner?.login !== expectedOwner || metadata.full_name !== repo || !metadata.default_branch) {
    throw new Error(`Refusing to measure a private, forked, or non-owned repository: ${repo}.`);
  }
  const commit = await githubJson<{ sha: string }>(`repos/${repo}/commits/${encodeURIComponent(metadata.default_branch)}`);
  if (!/^[a-f0-9]{40}$/i.test(commit.sha)) throw new Error(`GitHub returned an invalid HEAD for ${repo}.`);
  return { project, repo, defaultBranch: metadata.default_branch, head: commit.sha };
}

async function githubJson<T>(apiPath: string): Promise<T> {
  const token = process.env.GITHUB_TOKEN?.trim();
  const response = await fetch(`https://api.github.com/${apiPath}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "jeongiryang-profile-source-metrics",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    signal: AbortSignal.timeout(30_000)
  });
  if (!response.ok) throw new Error(`Public GitHub lookup failed (${response.status}) for ${apiPath}.`);
  return await response.json() as T;
}

async function listSourceFiles(checkout: string): Promise<string[]> {
  const files: string[] = [];
  async function walk(directory: string): Promise<void> {
    const entries = await readdir(directory, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue;
      const fullPath = join(directory, entry.name);
      if (entry.isDirectory()) {
        if (!EXCLUDED_DIRECTORIES.has(entry.name.toLowerCase())) await walk(fullPath);
        continue;
      }
      if (!entry.isFile() || !eligibleSourcePath(relative(checkout, fullPath))) continue;
      const details = await stat(fullPath);
      if (details.size <= MAX_SOURCE_BYTES) files.push(fullPath);
    }
  }
  await walk(checkout);
  return files.sort((a, b) => a.localeCompare(b, "en"));
}

function eligibleSourcePath(filePath: string): boolean {
  const normalized = filePath.replaceAll("\\", "/");
  const segments = normalized.split("/");
  if (segments.some((segment) => EXCLUDED_DIRECTORIES.has(segment.toLowerCase()))) return false;
  const fileName = segments.at(-1) || "";
  if (/\.min\.|-min\.js$|\.bundle\.|\.generated\.|_generated\./i.test(fileName)) return false;
  if (/^(?:glad\.[ch]|stb.*\.h|glfw3.*\.h|glew\.h)$/i.test(fileName)) return false;
  const extension = extname(fileName).slice(1).toLowerCase();
  return (SOURCE_EXTENSIONS as readonly string[]).includes(extension);
}

function validClocCounts(value: unknown, label: string): ClocCounts {
  const counts = value as Partial<ClocCounts> | undefined;
  if (!counts || ![counts.code, counts.comment, counts.blank, counts.nFiles].every(validCount)) {
    throw new Error(`Invalid cloc counts for ${label}.`);
  }
  return counts as ClocCounts;
}

function validCount(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

async function readSnapshot(rootDir: string, required: boolean): Promise<SourceMetricsSnapshot | undefined> {
  let source: string;
  try {
    source = await readFile(join(rootDir, "assets/generated/source-metrics.json"), "utf8");
  } catch (error) {
    if (!required && (error as NodeJS.ErrnoException).code === "ENOENT") return undefined;
    throw error;
  }
  const parsed = JSON.parse(source) as SourceMetricsSnapshot;
  if (parsed.schemaVersion !== 1 || parsed.clocVersion !== CLOC_VERSION || !Array.isArray(parsed.projects) || !Number.isFinite(Date.parse(parsed.measuredAt))) {
    throw new Error("Invalid source metrics snapshot schema or measurement date.");
  }
  for (const project of parsed.projects) {
    if (!/^jeongiryang\/[A-Za-z0-9_.-]+$/.test(project.repo) || !project.name || !/^[a-f0-9]{40}$/i.test(project.head) || ![project.code, project.comment, project.blank, project.files].every(validCount) || !Array.isArray(project.languages)) {
      throw new Error("Invalid project in the source metrics snapshot.");
    }
    for (const language of project.languages) {
      if (!language.name || ![language.code, language.comment, language.blank, language.files].every(validCount)) {
        throw new Error("Invalid language in the source metrics snapshot.");
      }
    }
  }
  return parsed;
}

function measurementSignature(projects: SourceProjectMetrics[]): string {
  return JSON.stringify(projects.map(({ repo, head, code, comment, blank, files, languages }) => ({ repo, head, code, comment, blank, files, languages })));
}

async function atomicWrite(destination: string, content: string): Promise<void> {
  await mkdir(resolve(destination, ".."), { recursive: true });
  const temporary = `${destination}.${randomUUID()}.tmp`;
  await writeFile(temporary, content, "utf8");
  await rename(temporary, destination);
}

async function run(command: string, args: string[], options: { cwd?: string; input?: string; timeout?: number } = {}): Promise<string> {
  return await new Promise<string>((resolvePromise, reject) => {
    const child = spawn(command, args, {
      cwd: options.cwd,
      shell: false,
      windowsHide: true,
      env: { ...process.env, GIT_TERMINAL_PROMPT: "0", GIT_LFS_SKIP_SMUDGE: "1" },
      stdio: ["pipe", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    let settled = false;
    const finishError = (error: Error): void => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      child.kill();
      reject(error);
    };
    const timer = setTimeout(() => finishError(new Error(`${command} timed out during source measurement.`)), options.timeout || 60_000);
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk: string) => {
      stdout += chunk;
      if (stdout.length > 16 * 1024 * 1024) finishError(new Error(`${command} exceeded the measurement output limit.`));
    });
    child.stderr.on("data", (chunk: string) => { stderr = (stderr + chunk).slice(-4_000); });
    child.on("error", finishError);
    child.on("close", (code) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (code === 0) resolvePromise(stdout);
      else reject(new Error(`${command} failed (${code ?? "no exit status"}): ${stderr.trim()}`));
    });
    child.stdin.on("error", (error: NodeJS.ErrnoException) => {
      if (error.code !== "EPIPE") finishError(error);
    });
    child.stdin.end(options.input || "");
  });
}

function renderSourceScale(snapshot: SourceMetricsSnapshot, theme: "light" | "dark"): string {
  const palette = theme === "light"
    ? { background: "#f2f7f3", ink: "#142d26", muted: "#557066", track: "#dce9df", bar: "#237451", rule: "#ccddd0" }
    : { background: "#0e201b", ink: "#ecf5ee", muted: "#a8c2b2", track: "#213f2e", bar: "#91dfb2", rule: "#2a493b" };
  const height = 310 + Math.max(0, snapshot.projects.length - 6) * 30;
  const maximum = Math.max(1, ...snapshot.projects.map((project) => project.code));
  const rows = snapshot.projects.map((project, index) => {
    const y = 75 + index * 30;
    const width = Math.round((project.code / maximum) * 342 * 10) / 10;
    return `  <text x="24" y="${y}" fill="${palette.ink}" font-size="12">${escapeXml(project.name)}</text>
  <rect x="160" y="${y - 9}" width="342" height="9" rx="4.5" fill="${palette.track}"/>
  <rect x="160" y="${y - 9}" width="${width}" height="9" rx="4.5" fill="${palette.bar}"/>
  <text x="576" y="${y}" text-anchor="end" fill="${palette.ink}" font-size="12">${project.code.toLocaleString("en-US")}</text>`;
  }).join("\n");
  const footer = height - 50;
  const description = snapshot.projects.map((project) => `${project.name}: ${project.code} code lines at ${project.head.slice(0, 7)}`).join("; ");
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="${height}" viewBox="0 0 600 ${height}" role="img" aria-labelledby="source-title source-description">
  <title id="source-title">Public repository HEAD source code size</title>
  <desc id="source-description">${escapeXml(description)}. Code size is not personally authored lines. Source extensions only; vendored, generated, minified and build output files, and files over 2 MiB are excluded.</desc>
  <rect width="600" height="${height}" rx="12" fill="${palette.background}"/>
  <g font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif">
  <text x="24" y="26" fill="${palette.ink}" font-size="15" font-weight="600" letter-spacing="1">PUBLIC HEAD CODE SIZE</text>
  <text x="24" y="45" fill="${palette.muted}" font-size="11">Code lines at current HEAD · not personally authored lines</text>
${rows}
  <rect x="24" y="${footer - 16}" width="552" height="1" fill="${palette.rule}"/>
  <text x="24" y="${footer}" fill="${palette.muted}" font-size="11">Measured ${snapshot.measuredAt.slice(0, 10)} · cloc ${CLOC_VERSION}</text>
  <text x="24" y="${footer + 18}" fill="${palette.muted}" font-size="11">Excludes vendor, generated, minified files and build outputs.</text>
  <text x="24" y="${footer + 35}" fill="${palette.muted}" font-size="11">Selected source extensions only · files up to 2 MiB.</text>
  </g>
</svg>
`;
}

function escapeXml(value: string): string {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");
}
