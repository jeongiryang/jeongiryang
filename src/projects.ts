export type ProjectStatus = "in_progress" | "completed";

export interface FeaturedProject {
  name: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  statusLabel: string;
  categoryLabel: string;
  currentFocus: string;
  result: string;
  url: string;
  priority: number;
}

export interface TechStackGroup {
  category: string;
  items: string[];
}

export interface LearningFocusItem {
  topic: string;
  description: string;
}

export interface ProfileConfig {
  name: string;
  username: string;
  role: string;
  interests: string[];
  direction: string;
  introduction: string[];
  techStackGroups: TechStackGroup[];
  learningFocus: LearningFocusItem[];
  workflow: string[];
}

export const profileConfig: ProfileConfig = {
  name: "정이량",
  username: "jeongiryang",
  role: "컴퓨터공학과 3학년 1학기 재학 중",
  interests: ["AI", "Big Data", "Backend", "Systems", "Software Engineering"],
  direction: "실용적인 프로젝트를 만들며 GitHub 포트폴리오를 쌓고 있습니다.",
  introduction: [
    "컴퓨터공학 기본기를 바탕으로 실제로 동작하는 서비스를 만들고 기록하는 데 집중하고 있습니다.",
    "수업 프로젝트, 개인 프로젝트, 자동화 도구를 GitHub 기반 워크플로우로 관리하며 개발자로서의 작업 방식을 다듬고 있습니다."
  ],
  techStackGroups: [
    {
      category: "Languages",
      items: ["C", "Python", "JavaScript", "TypeScript", "SQL"]
    },
    {
      category: "Frameworks & Runtime",
      items: ["Node.js", "React", "React Native", "Expo", "Godot"]
    },
    {
      category: "Tools & Workflow",
      items: [
        "Git",
        "GitHub",
        "GitHub Actions",
        "Codex-assisted development",
        "Markdown documentation"
      ]
    }
  ],
  learningFocus: [
    {
      topic: "AI / Big Data",
      description: "데이터 기반 문제 해결과 인공지능 활용 역량 강화"
    },
    {
      topic: "Database",
      description: "SQL, 모델링, 정규화, 웹 서비스 연동 학습"
    },
    {
      topic: "Computer Networks",
      description: "HTTP, DNS, TCP/UDP 등 네트워크 핵심 개념 학습"
    },
    {
      topic: "Software Engineering",
      description: "요구사항 분석, 설계, 구현, 검증, 문서화 흐름 정리"
    },
    {
      topic: "Computer Architecture",
      description: "시스템 동작 원리와 하드웨어/소프트웨어 경계 이해"
    },
    {
      topic: "GitHub Workflow Automation",
      description: "Issue, PR, Actions 기반 자동화와 협업 흐름 개선"
    },
    {
      topic: "Practical project-based learning",
      description: "작게 완성하고 반복 개선하는 프로젝트 중심 학습"
    }
  ],
  workflow: [
    "요구사항을 먼저 정리하고 구현 범위를 작게 나눕니다.",
    "작업 단위별로 Issue와 브랜치를 만들고 변경 이유를 기록합니다.",
    "Codex를 활용해 구현, 리팩터링, 검증 과정을 빠르게 반복합니다.",
    "README, setup 문서, AI 작업 로그를 함께 관리합니다.",
    "빌드와 생성 검증을 통과한 뒤 PR을 squash merge합니다."
  ]
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "cwnu-campus-hub",
    description:
      "창원대학교 학생들이 자주 쓰는 링크, 일정, 생활 편의 기능을 한곳에 모으는 캠퍼스 허브 프로젝트",
    stack: ["TypeScript", "React", "Node.js", "GitHub Actions"],
    status: "in_progress",
    statusLabel: "진행 중",
    categoryLabel: "포트폴리오",
    currentFocus: "주요 캠퍼스 링크 레지스트리 구축, 홈 대시보드 UI 개선, 즐겨찾기 기능 확장",
    result: "진행 중",
    url: "https://github.com/jeongiryang/cwnu-campus-hub",
    priority: 1
  },
  {
    name: "3AM Computer Science: Mystery Room",
    description:
      "컴퓨터공학 개념을 퍼즐과 진행 요소로 녹여낸 Godot 기반 미스터리 룸 게임 프로젝트",
    stack: ["Godot", "GDScript", "Game Design", "Documentation"],
    status: "in_progress",
    statusLabel: "진행 중",
    categoryLabel: "게임",
    currentFocus: "게임 구조 설계, 룸 구성, 상호작용 시스템, 에셋 파이프라인 정리",
    result: "진행 중",
    url: "https://github.com/jeongiryang/3am-computer-science-mystery-room",
    priority: 2
  },
  {
    name: "GitHub Profile Dashboard",
    description: "GitHub 프로필 README를 자동 생성하는 TypeScript 기반 포트폴리오 대시보드",
    stack: ["TypeScript", "Node.js", "GitHub Actions", "Markdown", "SVG"],
    status: "in_progress",
    statusLabel: "진행 중",
    categoryLabel: "자동화",
    currentFocus: "선택 프로젝트 기반 섹션 구성, 한국어 UI 개선, SVG 카드 개선",
    result: "README 자동 생성 기반 구축 완료",
    url: "https://github.com/jeongiryang/jeongiryang",
    priority: 3
  },
  {
    name: "DBMS Web Board Project",
    description: "Node.js와 SQL을 기반으로 구현한 DBMS 웹 게시판 프로젝트",
    stack: ["Node.js", "Express", "SQL", "Authentication"],
    status: "completed",
    statusLabel: "완료",
    categoryLabel: "수업 프로젝트",
    currentFocus: "",
    result: "회원가입, 로그인, 게시글, 댓글, 좋아요, 페이징 등 핵심 게시판 기능 구현",
    url: "https://github.com/jeongiryang/dbms-web-board-project",
    priority: 4
  },
  {
    name: "Smart Edu Platform",
    description: "개인화 학습 관리 앱을 주제로 진행한 소프트웨어공학 팀 프로젝트",
    stack: ["React Native", "Expo", "Software Engineering", "Documentation"],
    status: "completed",
    statusLabel: "완료",
    categoryLabel: "팀 프로젝트",
    currentFocus: "",
    result: "요구사항 분석, 설계 문서, 구현 구조, 프로젝트 문서화 흐름 정리",
    url: "https://github.com/jeongiryang/smart-edu-platform",
    priority: 5
  }
];
