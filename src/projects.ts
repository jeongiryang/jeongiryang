export type ProjectStatus = "in_progress" | "completed";

export interface FeaturedProject {
  name: string;
  repo: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  priority: number;
  url: string;
  currentFocus: string;
  result: string;
  isPublic: boolean;
  displayUrl: boolean;
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface ProfileConfig {
  name: string;
  username: string;
  role: string;
  interests: string[];
  workflow: string[];
  techStackGroups: TechStackGroup[];
}

export const profileConfig: ProfileConfig = {
  name: "정이량",
  username: "jeongiryang",
  role: "컴퓨터공학과 3학년 1학기 재학 중",
  interests: ["AI", "Big Data", "Backend", "Systems", "Software Engineering"],
  workflow: [
    "요구사항을 먼저 정리하고 작업 단위를 작게 나눕니다.",
    "Codex를 활용해 구현, 리팩터링, 테스트, 문서화를 빠르게 반복합니다.",
    "각 작업은 Issue, branch, PR, merge 흐름으로 관리합니다.",
    "결과물은 README, setup 문서, AI 작업 로그로 남깁니다.",
    "AI를 단순 코드 생성기가 아니라 개발 속도와 검증 루프를 높이는 도구로 활용하는 연습을 하고 있습니다."
  ],
  techStackGroups: [
    {
      category: "Languages",
      items: ["C", "Python", "JavaScript", "TypeScript", "SQL"]
    },
    {
      category: "Web/App",
      items: ["Node.js", "React", "React Native", "Expo"]
    },
    {
      category: "Game/Tools",
      items: ["Godot", "GDScript", "Git", "GitHub", "GitHub Actions"]
    },
    {
      category: "Workflow",
      items: ["Codex-assisted development", "PR-based workflow", "Markdown documentation"]
    }
  ]
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "cwnu-campus-hub",
    repo: "cwnu-campus-hub",
    description: "창원대학교 생활 편의 기능을 모은 캠퍼스 허브",
    stack: ["TypeScript", "React", "Node.js"],
    status: "in_progress",
    priority: 1,
    url: "https://github.com/jeongiryang/cwnu-campus-hub",
    currentFocus: "링크 레지스트리, 홈 대시보드, 즐겨찾기",
    result: "",
    isPublic: true,
    displayUrl: true
  },
  {
    name: "3AM Computer Science: Mystery Room",
    repo: "3am-computer-science-mystery-room",
    description: "컴퓨터공학 개념을 퍼즐로 녹인 Godot 게임",
    stack: ["Godot", "GDScript", "Game Design"],
    status: "in_progress",
    priority: 2,
    url: "https://github.com/jeongiryang/3am-computer-science-mystery-room",
    currentFocus: "룸 구성, 상호작용, 비주얼 개선",
    result: "",
    isPublic: false,
    displayUrl: false
  },
  {
    name: "GitHub Profile Dashboard",
    repo: "jeongiryang",
    description: "프로필 README 자동 생성 대시보드",
    stack: ["TypeScript", "Node.js", "GitHub Actions"],
    status: "in_progress",
    priority: 3,
    url: "https://github.com/jeongiryang/jeongiryang",
    currentFocus: "프로젝트 상태 표시, 자동 갱신",
    result: "",
    isPublic: true,
    displayUrl: true
  },
  {
    name: "DBMS Web Board Project",
    repo: "dbms-web-board-project",
    description: "Node.js와 SQL 기반 웹 게시판",
    stack: ["Node.js", "Express", "SQL"],
    status: "completed",
    priority: 4,
    url: "https://github.com/jeongiryang/dbms-web-board-project",
    currentFocus: "",
    result: "회원가입, 로그인, 게시글, 댓글, 좋아요, 페이징",
    isPublic: false,
    displayUrl: false
  },
  {
    name: "Smart Edu Platform",
    repo: "smart-edu-platform",
    description: "개인화 학습 관리 앱 팀 프로젝트",
    stack: ["React Native", "Expo", "Software Engineering"],
    status: "completed",
    priority: 5,
    url: "https://github.com/jeongiryang/smart-edu-platform",
    currentFocus: "",
    result: "요구사항 분석, 설계, 구현 구조, 문서화",
    isPublic: false,
    displayUrl: false
  }
];
