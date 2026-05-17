export type ProjectStatus = "in_progress" | "completed";

export interface FeaturedProject {
  name: string;
  repo: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  priority: number;
  url: string;
  result: string;
  isPublic: boolean;
  displayUrl: boolean;
}

export interface ProfileConfig {
  name: string;
  username: string;
  role: string;
  aboutNote: string;
  aboutBullets: string[];
}

export const profileConfig: ProfileConfig = {
  name: "정이량",
  username: "jeongiryang",
  role: "컴퓨터공학과 3학년 1학기 재학 중",
  aboutNote:
    "AI를 단순 코드 생성 도구가 아니라 요구사항 정리, 구현, 검증, 문서화를 빠르게 반복하는 개발 파트너로 활용하는 방식을 연습하고 있습니다.",
  aboutBullets: [
    "프로젝트를 작은 기능 단위로 나누어 구현합니다.",
    "GitHub Issue, branch, PR 흐름으로 작업을 관리합니다.",
    "README, setup 문서, AI 작업 로그로 과정을 기록합니다."
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
    result: "",
    isPublic: true,
    displayUrl: true
  },
  {
    name: "3AM Computer Science: Mystery Room",
    repo: "3am-computer-science-mystery-room",
    description: "컴퓨터공학 개념을 퍼즐로 녹인 Godot 게임",
    stack: ["Godot", "GDScript"],
    status: "in_progress",
    priority: 2,
    url: "https://github.com/jeongiryang/3am-computer-science-mystery-room",
    result: "",
    isPublic: false,
    displayUrl: false
  },
  {
    name: "GitHub Profile Dashboard",
    repo: "jeongiryang",
    description: "프로필 README 자동 생성 프로젝트",
    stack: ["TypeScript", "GitHub Actions"],
    status: "in_progress",
    priority: 3,
    url: "https://github.com/jeongiryang/jeongiryang",
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
    result: "회원가입, 로그인, 게시글, 댓글, 좋아요, 페이징",
    isPublic: false,
    displayUrl: false
  },
  {
    name: "Smart Edu Platform",
    repo: "smart-edu-platform",
    description: "개인화 학습 관리 앱 팀 프로젝트",
    stack: ["React Native", "Expo"],
    status: "completed",
    priority: 5,
    url: "https://github.com/jeongiryang/smart-edu-platform",
    result: "요구사항 분석, 설계, 구현 구조, 문서화",
    isPublic: false,
    displayUrl: false
  }
];
