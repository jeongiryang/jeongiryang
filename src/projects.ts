export type ProjectSection = "completed" | "in_progress" | "assignment";
export interface ProfileProject {
  name:string; displayName:string; description:string; result:string; tech:string[];
  section:ProjectSection; priority:number; isPublic:boolean; isPrivate:boolean; isArchived:boolean;
  url:string; demoUrl?:string; previewImage:string; previewAlt:string; previewCaption?:string;
  statusLabel:string; role:string; measureSource?:boolean; shortName?:string;
}
export const profileConfig = {
  name:"정이량", username:"jeongiryang", role:"컴퓨터공학 전공",
  headline:"작게 만들고, 실제로 쓰는 것들.",
  description:"공부와 일상에 필요한 도구를 만들고, 웹 서비스와 인터랙티브 프로젝트로 확장합니다.",
  siteUrl:"https://jeongiryang.github.io/jeongiryang/"
};
export type ProfileConfig = typeof profileConfig;
const project=(name:string,displayName:string,description:string,result:string,tech:string[],section:ProjectSection,priority:number,options:Partial<ProfileProject>={}):ProfileProject=>({
  name,displayName,description,result,tech,section,priority,isPublic:true,isPrivate:false,isArchived:false,
  url:`https://github.com/jeongiryang/${name}`,previewImage:"",previewAlt:"",statusLabel:"과제 완료",role:"수업 프로젝트",...options
});
// 공개된 본인 소유 원본만 등록합니다. 참고용 포크와 비공개 작업은 제외합니다.
export const profileProjects:ProfileProject[]=[
  project("wave-barrier-free-gyeongnam","WAVE","경남 관광·공식 편의정보를 연결한 여행 일정 서비스","여행지 탐색, 날짜별 일정·지도, 대화형 일정 편집과 저장·공유를 제공합니다.",["TypeScript","React","Vite / Vinext","Neon / Vercel"],"completed",0,
    {statusLabel:"공개 서비스 · 주요 기능 구현",role:"관광 데이터 활용 프로젝트",demoUrl:"https://wave-barrier-free-gyeongnam.vercel.app/",previewImage:"assets/previews/wave-live.gif",previewAlt:"WAVE 실제 배포 화면: 홈, 여행 설계, 관광지 상세와 편의정보",previewCaption:"실제 배포 화면 · 홈 → 여행 설계 → 관광지 상세·편의정보 · 2026.10.20 촬영",measureSource:true,shortName:"WAVE"}),
  project("cbt-omr-tester","CBT OMR Tester","설치 없이 브라우저에서 사용하는 OMR · 자동 채점 도구","시험 프리셋, 타이머, 정답 비교와 합격·과락 판정을 한 화면에 담았습니다.",["HTML","CSS","JavaScript"],"completed",1,
    {statusLabel:"v1.0.0 · 완성",role:"개인 프로젝트",demoUrl:"https://cbt-omr-tester.vercel.app/",previewImage:"assets/previews/cbt-omr-tester-live.gif",previewAlt:"CBT OMR Tester 실제 배포 화면: OMR 마킹과 자동 채점 결과",previewCaption:"실제 배포 화면 · OMR 마킹 → 자동 채점 · 2026.10.20 촬영",measureSource:true,shortName:"CBT OMR"}),
  project("SoftwareEngineering_team15_project_-Smart-Edu-Platform","사각사각","학습 자료와 노트·퀴즈를 연결하는 학습 관리 앱","PDF 기반 학습 지원과 실시간 스터디 기능을 구현하고 최종 제출을 마쳤습니다.",["Expo","React Native Web","Express","PostgreSQL / Prisma"],"completed",2,
    {statusLabel:"v2.10.3 · 과제 완료",role:"3인 팀 · 팀장 / 통합·검증·배포·UI/UX",isArchived:true,demoUrl:"https://sagaksagak-smart-edu.vercel.app/",previewImage:"assets/previews/sagaksagak-live.gif",previewAlt:"사각사각 실제 배포 사이트의 공개 랜딩과 기능 소개",previewCaption:"실제 배포 화면 · 로그인 전 공개 소개 · 2026.10.20 촬영",measureSource:true,shortName:"Sagaksagak"}),
  project("DatabaseLanguage_NodeJS_CWNU-Community","CWNU Community","Node.js와 PostgreSQL로 만든 대학 커뮤니티 게시판","회원가입·로그인부터 게시글, 댓글, 반응과 페이지 이동까지 구현했습니다.",["JavaScript","Node.js","PostgreSQL","Vercel"],"completed",3,
    {statusLabel:"v2.0.1 · 과제 완료",role:"개인 과제",isArchived:true,demoUrl:"https://cwnu-community.vercel.app/",previewImage:"assets/previews/community-live.gif",previewAlt:"CWNU Community 실제 배포 화면: 공개 게시판과 공지 상세",previewCaption:"실제 배포 화면 · 게시판 → 공지 상세 · 2026.10.20 촬영",measureSource:true,shortName:"CWNU Community"}),
  project("todo-app-mini-project-20222017","CWNU Smart Portal","ToDo와 학교 생활 도구를 모은 웹 미니 프로젝트","할 일 관리, 타이머·스톱워치와 학점계산기를 연결하고 배포했습니다.",["React","Vite","Express","MongoDB"],"completed",4,
    {statusLabel:"v1.1.0 · 과제 완료",role:"개인 과제",isArchived:true,demoUrl:"https://todo-app-mini-project-20222017.vercel.app/",previewImage:"assets/previews/smart-portal-live.gif",previewAlt:"CWNU Smart Portal 실제 배포 화면: 메인과 학점계산기",previewCaption:"실제 배포 화면 · 메인 → 학점계산기 · 2026.10.20 촬영",measureSource:true,shortName:"Smart Portal"}),
  project("Computer-Graphics_project_Team1","OpenGL 3D House","OpenGL로 구현한 3D 집과 주변 환경","완성본과 최종 렌더, 요구사항 충족 기록을 보관합니다.",["C++","OpenGL"],"assignment",1,{isArchived:true,role:"팀 과제",measureSource:true,shortName:"OpenGL House"}),
  project("AlgorithmAnimation_DFS-AnimalScript_Assignment","DFS Animation","그래프 탐색 과정을 AnimalScript 애니메이션으로 변환","입력 두 개, DFS 생성기와 실행 결과·제출 문서를 정리했습니다.",["Python","AnimalScript"],"assignment",2,{measureSource:true,shortName:"DFS Animation"}),
  project("Network-Programming_TCP_and_UDP-Analysis","TCP / UDP 실험","전송 조건에 따른 TCP·UDP 성능 비교","서버·클라이언트와 측정 결과, 그래프·분석 보고서를 정리했습니다.",["C","Socket"],"assignment",3),
  project("Advanced_Data_Structures_Team6","너구리 게임","기존 C 게임의 오류 분석과 수정","스테이지와 오프닝·엔딩·재시작을 포함한 팀 과제 결과를 보관합니다.",["C"],"assignment",4,{isArchived:true,role:"팀 과제"}),
  project("OpenSource_1_team-project","Python 던전 게임","팀이 함께 만든 텍스트 기반 던전 게임","전투, 상점과 게임 진행 흐름을 구현했습니다.",["Python"],"assignment",5,{isArchived:true,role:"팀 과제"}),
  project("WebProgramming_team-project","웹 프로그래밍 프로젝트","ToDo · 중고 마켓의 기본 기능 구현","CRUD, 필터, 정렬과 검색 흐름을 정리했습니다.",["HTML","CSS","JavaScript","Node.js"],"assignment",6,{isArchived:true,role:"팀 과제"}),
  project("Network-Programming_Checksum-Generator","Checksum Generator","Even Parity 기반 16-bit 체크섬 생성기","입력 처리, 패리티 변환과 체크섬 계산을 구현했습니다.",["C","Network"],"assignment",7,{isArchived:true}),
  project("DatabaseLanguage_SQL_Assignment","MariaDB SQL 실습","요구사항에 맞는 DDL · DML · 질의 작성","README에 SQL과 결과를 정리했습니다. 별도 SQL 파일 정리는 후속 보완입니다.",["SQL","MariaDB"],"assignment",8),
  project("Algorithm_animal-animation_tool","Animal Animation","점 데이터의 알고리즘 애니메이션 생성","생성기와 결과를 보관합니다. 실행 경로 안내는 후속 보완입니다.",["Python","AnimalScript"],"assignment",9),
  project("BigData_Kubernetes_Hadoop_HDFS_Assignment","Hadoop / HDFS 실습","Kubernetes에서 HDFS 실행과 저장 확인","실행 결과와 보고서를 보관합니다. 재현용 YAML 원문은 후속 보완입니다.",["Kubernetes","Hadoop"],"assignment",10),
  project("kg-ontology-decision-framework","Ontology / Knowledge Graph","온톨로지와 지식그래프 기반 의사결정 지원 PoC","로컬 연구·검증 단계이며 정식 운영 서비스와 구분합니다.",["Knowledge Graph","Ontology"],"in_progress",4,{statusLabel:"연구 PoC",role:"산학협력 과제"}),
  project("lg-ax-hackathon-cwnu-2026","Kitchen Mood Radio","LG AX 해커톤 Android 앱 초기 개발","개인 프로토타입을 바탕으로 기능과 제출 자료를 발전시킵니다.",["Android"],"in_progress",5,{statusLabel:"초기 프로토타입",role:"해커톤 프로젝트"})
];
export function publicProjects(projects=profileProjects):ProfileProject[]{return projects.filter(p=>p.isPublic&&!p.isPrivate&&p.url.startsWith("https://github.com/jeongiryang/"));}
