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
      "프로필 대시보드 generator를 로컬 실행과 GitHub Actions 실행 모두 가능하도록 유지하고 있습니다.",
      "Backend, Database, Software Engineering 중심의 실용 프로젝트를 진행하고 있습니다.",
      "GitHub API를 사용할 수 없는 환경에서는 fallback 활동 데이터를 사용해 README를 생성합니다."
    ]
  };
}

function formatEvent(event: GitHubEvent): string | undefined {
  const repo = event.repo?.name ?? "a repository";

  switch (event.type) {
    case "PushEvent": {
      const commitCount = event.payload?.size ?? 0;
      return `${repo}에 ${commitCount || "새"}개 커밋을 push했습니다.`;
    }
    case "CreateEvent": {
      const refType = event.payload?.ref_type ?? "ref";
      const ref = event.payload?.ref ? ` ${event.payload.ref}` : "";
      return `${repo}에서 ${refType}${ref}를 생성했습니다.`;
    }
    case "PullRequestEvent": {
      const action = event.payload?.action ?? "updated";
      const number = event.payload?.pull_request?.number ?? event.payload?.number;
      return `${repo}의 pull request${number ? ` #${number}` : ""}를 ${formatAction(action)}`;
    }
    case "IssuesEvent": {
      const action = event.payload?.action ?? "updated";
      const number = event.payload?.issue?.number;
      return `${repo}의 issue${number ? ` #${number}` : ""}를 ${formatAction(action)}`;
    }
    case "WatchEvent":
      return `${repo} 저장소에 star를 남겼습니다.`;
    case "ForkEvent":
      return `${repo} 저장소를 fork했습니다.`;
    default:
      return `${repo}에서 ${event.type.replace(/Event$/, "")} 활동이 기록되었습니다.`;
  }
}

function formatAction(action: string): string {
  const labels: Record<string, string> = {
    opened: "열었습니다.",
    closed: "닫았습니다.",
    reopened: "다시 열었습니다.",
    synchronize: "동기화했습니다.",
    edited: "수정했습니다.",
    updated: "업데이트했습니다."
  };

  return labels[action] ?? `${action} 상태로 업데이트했습니다.`;
}
