export interface RecentActivity {
  source: "github-api" | "fallback";
  username: string;
  items: string[];
}

interface GitHubEvent {
  type: string;
  repo?: {
    name: string;
  };
  payload?: {
    size?: number;
    ref_type?: string;
    ref?: string;
    action?: string;
    number?: number;
    pull_request?: {
      number: number;
      title?: string;
    };
    issue?: {
      number: number;
      title?: string;
    };
  };
}

const DEFAULT_USERNAME = "jeongiryang";

export async function fetchRecentActivity(): Promise<RecentActivity> {
  const username = process.env.GITHUB_USERNAME?.trim() || DEFAULT_USERNAME;
  const token = process.env.GITHUB_TOKEN?.trim();
  const fallback = createFallbackActivity(username);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8_000);

    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=10`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "jeongiryang-profile-dashboard",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        signal: controller.signal
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      return fallback;
    }

    const events = (await response.json()) as GitHubEvent[];
    const items = events.map(formatEvent).filter(Boolean).slice(0, 5) as string[];

    if (items.length === 0) {
      return fallback;
    }

    return {
      source: "github-api",
      username,
      items
    };
  } catch {
    return fallback;
  }
}

function createFallbackActivity(username: string): RecentActivity {
  return {
    source: "fallback",
    username,
    items: [
      "Keeping the profile dashboard generator ready for local and GitHub Actions runs.",
      "Building practical portfolio projects across backend, databases, and software engineering.",
      "Using fallback activity data because the GitHub API was unavailable during generation."
    ]
  };
}

function formatEvent(event: GitHubEvent): string | undefined {
  const repo = event.repo?.name ?? "a repository";

  switch (event.type) {
    case "PushEvent": {
      const commitCount = event.payload?.size ?? 0;
      return `Pushed ${commitCount || "new"} commit${commitCount === 1 ? "" : "s"} to ${repo}.`;
    }
    case "CreateEvent": {
      const refType = event.payload?.ref_type ?? "ref";
      const ref = event.payload?.ref ? ` ${event.payload.ref}` : "";
      return `Created ${refType}${ref} in ${repo}.`;
    }
    case "PullRequestEvent": {
      const action = event.payload?.action ?? "updated";
      const number = event.payload?.pull_request?.number ?? event.payload?.number;
      return `${capitalize(action)} pull request${number ? ` #${number}` : ""} in ${repo}.`;
    }
    case "IssuesEvent": {
      const action = event.payload?.action ?? "updated";
      const number = event.payload?.issue?.number;
      return `${capitalize(action)} issue${number ? ` #${number}` : ""} in ${repo}.`;
    }
    case "WatchEvent":
      return `Starred ${repo}.`;
    case "ForkEvent":
      return `Forked ${repo}.`;
    default:
      return `Recorded ${event.type.replace(/Event$/, "")} activity in ${repo}.`;
  }
}

function capitalize(value: string): string {
  return value.length === 0 ? value : `${value[0].toUpperCase()}${value.slice(1)}`;
}
