export type ProjectStatus =
  | "Planning"
  | "Building"
  | "Prototype"
  | "Course Project"
  | "Maintained";

export interface FeaturedProject {
  name: string;
  description: string;
  stack: string[];
  status: ProjectStatus;
  url: string;
}

export interface ProfileConfig {
  name: string;
  username: string;
  role: string;
  interests: string[];
  direction: string;
  currentlyBuilding: string[];
  techStack: string[];
  learningFocus: string[];
}

export const profileConfig: ProfileConfig = {
  name: "정이량",
  username: "jeongiryang",
  role: "컴퓨터공학과 2학년",
  interests: ["AI", "Big Data", "Backend", "Systems", "Software Engineering"],
  direction: "실용적인 프로젝트를 만들며 GitHub 포트폴리오를 쌓는 중",
  currentlyBuilding: [
    "cwnu-campus-hub",
    "3AM Computer Science: Mystery Room",
    "DBMS Web Board Project",
    "Smart Edu Platform"
  ],
  techStack: [
    "C",
    "Python",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "React",
    "SQL",
    "Git/GitHub",
    "Godot"
  ],
  learningFocus: [
    "AI / Big Data",
    "Database",
    "Computer Networks",
    "Software Engineering",
    "Computer Architecture",
    "GitHub Workflow Automation"
  ]
};

export const featuredProjects: FeaturedProject[] = [
  {
    name: "cwnu-campus-hub",
    description:
      "Campus utility hub concept for collecting useful CWNU student resources, schedules, and everyday links in one place.",
    stack: ["TypeScript", "React", "Node.js", "SQL"],
    status: "Building",
    url: "https://github.com/jeongiryang/cwnu-campus-hub"
  },
  {
    name: "3AM Computer Science: Mystery Room",
    description:
      "Narrative mystery-room game concept where computer science topics become puzzles and progression mechanics.",
    stack: ["Godot", "Game Design", "Computer Science"],
    status: "Prototype",
    url: "https://github.com/jeongiryang/3am-computer-science-mystery-room"
  },
  {
    name: "DBMS Web Board Project",
    description:
      "Database-backed web board project focused on CRUD flows, relational modeling, SQL practice, and backend fundamentals.",
    stack: ["Node.js", "JavaScript", "SQL", "Database"],
    status: "Course Project",
    url: "https://github.com/jeongiryang/dbms-web-board-project"
  },
  {
    name: "Smart Edu Platform",
    description:
      "Education platform prototype for organizing learning content, user workflows, and practical dashboard features.",
    stack: ["TypeScript", "React", "Node.js", "SQL"],
    status: "Planning",
    url: "https://github.com/jeongiryang/smart-edu-platform"
  }
];
