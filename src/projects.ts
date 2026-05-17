export type ProjectSection = "completed" | "in_progress" | "coursework";

export interface ProfileProject {
  name: string;
  displayName: string;
  description: string;
  result: string;
  tech: string[];
  section: ProjectSection;
  priority: number;
  isPublic: boolean;
  url: string;
  previewImage: string;
  previewAlt: string;
  isPrivate: boolean;
  isArchived: boolean;
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

export const profileProjects: ProfileProject[] = [
  {
    name: "DatabaseLanguage_NodeJS_CWNU-Community",
    displayName: "DatabaseLanguage_NodeJS_CWNU-Community",
    description: "Node.js와 PostgreSQL 기반 CWNU Community 게시판",
    result: "회원가입, 로그인, 게시글, 댓글, 좋아요, 페이징",
    tech: ["Node.js", "PostgreSQL", "Express"],
    section: "completed",
    priority: 1,
    isPublic: true,
    url: "https://github.com/jeongiryang/DatabaseLanguage_NodeJS_CWNU-Community",
    previewImage: "assets/previews/database-language-cwnu-community.png",
    previewAlt: "CWNU Community 게시판 미리보기",
    isPrivate: false,
    isArchived: false
  },
  {
    name: "todo-app-mini-project-20222017",
    displayName: "todo-app-mini-project-20222017",
    description: "AI-assisted workflow로 제작한 Todo 리스트 미니 프로젝트",
    result: "Todo CRUD, 배포, 문서화",
    tech: ["JavaScript", "Todo App"],
    section: "completed",
    priority: 2,
    isPublic: true,
    url: "https://github.com/jeongiryang/todo-app-mini-project-20222017",
    previewImage: "",
    previewAlt: "",
    isPrivate: false,
    isArchived: true
  },
  {
    name: "cwnu-campus-hub",
    displayName: "cwnu-campus-hub",
    description: "창원대학교 생활 편의 기능을 모은 캠퍼스 허브",
    result: "링크 레지스트리, 홈 대시보드, 즐겨찾기",
    tech: ["TypeScript", "React", "Node.js"],
    section: "in_progress",
    priority: 1,
    isPublic: true,
    url: "https://github.com/jeongiryang/cwnu-campus-hub",
    previewImage: "assets/previews/cwnu-campus-hub.png",
    previewAlt: "CWNU Campus Hub 미리보기",
    isPrivate: false,
    isArchived: false
  },
  {
    name: "3am-computer-science-mystery-room",
    displayName: "3am-computer-science-mystery-room",
    description: "Codex-assisted workflow로 제작 중인 Godot 기반 2D 인터랙티브 게임",
    result: "룸 구성, 상호작용, 비주얼 개선",
    tech: ["Godot", "GDScript"],
    section: "in_progress",
    priority: 2,
    isPublic: true,
    url: "https://github.com/jeongiryang/3am-computer-science-mystery-room",
    previewImage: "",
    previewAlt: "",
    isPrivate: false,
    isArchived: false
  },
  {
    name: "SoftwareEngineering_team15_project_-Smart-Edu-Platform",
    displayName: "SoftwareEngineering_team15_project_-Smart-Edu-Platform",
    description: "개인화 학습 관리 앱 팀 프로젝트",
    result: "요구사항 분석, 설계, 구현 구조 정리",
    tech: ["React Native", "Expo"],
    section: "in_progress",
    priority: 3,
    isPublic: false,
    url: "",
    previewImage: "",
    previewAlt: "",
    isPrivate: true,
    isArchived: false
  },
  {
    name: "2026-barrier-free-tour-data-app",
    displayName: "2026-barrier-free-tour-data-app",
    description: "사회적 약자를 위한 경상남도 맞춤형 관광 경로 안내 서비스",
    result: "관광 데이터 활용, 경로 안내, 우회로 설계",
    tech: ["Data", "Route Planning"],
    section: "in_progress",
    priority: 4,
    isPublic: true,
    url: "https://github.com/jeongiryang/2026-barrier-free-tour-data-app",
    previewImage: "",
    previewAlt: "",
    isPrivate: false,
    isArchived: false
  },
  {
    name: "DatabaseLanguage_SQL_Assignment",
    displayName: "DatabaseLanguage_SQL_Assignment",
    description: "MariaDB 환경에서 요구사항에 맞는 SQL 쿼리 작성",
    result: "",
    tech: ["SQL", "MariaDB"],
    section: "coursework",
    priority: 1,
    isPublic: true,
    url: "https://github.com/jeongiryang/DatabaseLanguage_SQL_Assignment",
    previewImage: "",
    previewAlt: "",
    isPrivate: false,
    isArchived: false
  },
  {
    name: "Algorithm_animal-animation_tool",
    displayName: "Algorithm_animal-animation_tool",
    description: "애니멀 알고리즘 도구 사용 및 분석",
    result: "",
    tech: ["Python"],
    section: "coursework",
    priority: 2,
    isPublic: true,
    url: "https://github.com/jeongiryang/Algorithm_animal-animation_tool",
    previewImage: "",
    previewAlt: "",
    isPrivate: false,
    isArchived: false
  },
  {
    name: "Network-Programming_TCP_and_UDP-Analysis",
    displayName: "Network-Programming_TCP_and_UDP-Analysis",
    description: "TCP와 UDP 프로토콜 차이 실험 및 분석",
    result: "",
    tech: ["C", "Network"],
    section: "coursework",
    priority: 3,
    isPublic: true,
    url: "https://github.com/jeongiryang/Network-Programming_TCP_and_UDP-Analysis",
    previewImage: "",
    previewAlt: "",
    isPrivate: false,
    isArchived: false
  },
  {
    name: "OpenSource_1_team-project",
    displayName: "OpenSource_1_team-project",
    description: "Python 기반 간단한 텍스트 게임 구현",
    result: "",
    tech: ["Python"],
    section: "coursework",
    priority: 4,
    isPublic: true,
    url: "https://github.com/jeongiryang/OpenSource_1_team-project",
    previewImage: "",
    previewAlt: "",
    isPrivate: false,
    isArchived: true
  },
  {
    name: "Advanced_Data_Structures_Team6",
    displayName: "Advanced_Data_Structures_Team6",
    description: "너구리 게임 코드 분석, 오류 수정, 완성",
    result: "",
    tech: ["C"],
    section: "coursework",
    priority: 5,
    isPublic: true,
    url: "https://github.com/jeongiryang/Advanced_Data_Structures_Team6",
    previewImage: "",
    previewAlt: "",
    isPrivate: false,
    isArchived: true
  },
  {
    name: "WebProgramming_team-project",
    displayName: "WebProgramming_team-project",
    description: "To-Do List와 중고나라 마켓 기능 구현",
    result: "",
    tech: ["JavaScript"],
    section: "coursework",
    priority: 6,
    isPublic: true,
    url: "https://github.com/jeongiryang/WebProgramming_team-project",
    previewImage: "",
    previewAlt: "",
    isPrivate: false,
    isArchived: true
  },
  {
    name: "Computer-Graphics_project_Team1",
    displayName: "Computer-Graphics_project_Team1",
    description: "OpenGL을 사용해 3D 집 외부 구현",
    result: "",
    tech: ["C++", "OpenGL"],
    section: "coursework",
    priority: 7,
    isPublic: true,
    url: "https://github.com/jeongiryang/Computer-Graphics_project_Team1",
    previewImage: "",
    previewAlt: "",
    isPrivate: false,
    isArchived: true
  }
];
