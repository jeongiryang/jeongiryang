# 저장소 소개 정리 계획

기준일: **2026-10-20 KST**

본인 계정의 공개 저장소를 다시 확인했다. 공개 69개 중 포크 48개는 개인 작품 목록에서 제외했다. 공개 원본은 프로필을 포함해 21개다. 아래 계획은 프로필을 제외한 **20개 원본 저장소**를 다룬다.

대표작은 현재 사용자 선택에 따라 **W.A.V.E를 가장 먼저** 보여 준다. 릴리스·최종 보고서·소스·결과물을 함께 확인하고, `archived`는 보관 상태로 따로 표시한다. 공개 기능의 구현과 별도 운영 검증·공모전 제출·수상 여부는 구분한다.

완성작 README의 상단 소개·기술 배지·결과·실행법을 정리했다. 웹 대표작 5개에는 아래 촬영 GIF를 연결하고, 긴 기존 보고서와 개발 기록은 보존했다. 반영에는 저장소별 PR을 사용하며 보관된 저장소는 수정 후 원래 아카이브 상태로 복원한다. WAVE는 README PR을 준비했으나 기존 의존성 보안 검사로 병합이 대기 중이다.

## 먼저 보여 줄 5개

| 프로젝트 | 상태 | 소개와 화면 | 본인 역할 |
|---|---|---|---|
| [W.A.V.E](https://github.com/jeongiryang/wave-barrier-free-gyeongnam) | 사용자 선정 대표 1위 · 공개 서비스 | 실제 홈 → 여행 설계·지역 선택 → 통영 여행지 목록 → 관광지 상세·편의정보를 보여 준다. | 본인 계정의 공개 원본 서비스. 공개 기능과 구현·운영 기록을 중심으로 소개한다. |
| [CBT OMR Tester](https://github.com/jeongiryang/cbt-omr-tester) | 릴리스된 브라우저 도구 | 시험 설정 → 답안 마킹 → 자동 채점. 실제 시험 설정 화면과 실행·HTML 다운로드 링크를 먼저 둔다. | 본인 계정의 원본 도구. 시험 설정·타이머·채점 흐름을 중심으로 설명한다. |
| [사각사각](https://github.com/jeongiryang/SoftwareEngineering_team15_project_-Smart-Edu-Platform) | 보관된 팀 프로젝트 | 로그인 전 실제 공개 랜딩과 서비스 소개를 보여 준다. 배포·발표·최종 보고서를 연결한다. | 3인 팀의 팀장. 협업 통합, PR 검토, 검증·배포 확인, 인트로·서비스 소개 UI/UX. |
| [CWNU Community](https://github.com/jeongiryang/DatabaseLanguage_NodeJS_CWNU-Community) | 보관된 개인 과제 | 게시판 화면과 ERD. 로그인 → 게시글 작성 → 조회 흐름과 DB 설계를 연결한다. | 개인 제출 과제. 데이터 모델·API·인증·정적 프런트·배포 구현을 공개 기록 범위에서 소개한다. |
| [CWNU Smart Portal](https://github.com/jeongiryang/todo-app-mini-project-20222017) | 보관된 개인 과제 | 최종 과제 버전의 실제 화면. 주요 도구·사용법·최종 릴리스를 연결한다. | 이전 공동 웹 과제를 확장한 개인 제출 과제. 생성형 AI 활용 이력을 유지한다. |

W.A.V.E는 **TypeScript·React·Vite/Vinext·Neon·Vercel**, 사각사각은 **Expo·React Native Web·Express·PostgreSQL·Prisma** 기반이다. CWNU Community는 **Express·PostgreSQL·Prisma·HTML/CSS/JavaScript**, Smart Portal은 **React·Vite·Express·MongoDB** 기반이다. 서로의 기술 스택을 섞지 않는다.

W.A.V.E는 서비스 링크와 직접 촬영한 실제 화면을 먼저 둔다. 이번 GIF는 여행지 탐색과 관광지 상세·편의정보까지 보여 준다. [출시 준비 기록](https://github.com/jeongiryang/wave-barrier-free-gyeongnam/blob/main/docs/launch-readiness-status.md)과 [제출 원고](https://github.com/jeongiryang/wave-barrier-free-gyeongnam/blob/main/docs/submission/development-entry-draft.md)의 별도 확인 항목은 유지하며, Release GO·최종 제출·수상·전 구간 접근성 인증을 확인된 사실처럼 추가하지 않는다.

프로필과 HTML 갤러리에는 **현재 배포 사이트에서 직접 촬영한 GIF만** 사용한다. 기존 저장소의 PNG/GIF, 로컬 재현 화면, 생성 이미지, DOM을 바꿔 만든 화면은 사용하지 않는다.

## 이번에 직접 촬영한 GIF 5개

모두 **2026-10-20 KST**, 로그인 정보가 없는 새 브라우저 환경에서 실제 배포 URL을 열어 촬영했다. 실제 화면 프레임과 촬영 시각을 보관하고 크기·색상만 GIF에 맞게 압축했다.

| 프로젝트·GIF | 실제 촬영 출처 | 촬영 시각(KST) | 영상에서 확인한 장면 |
|---|---|---|---|
| [W.A.V.E](../assets/previews/wave-live.gif) | [배포 사이트](https://wave-barrier-free-gyeongnam.vercel.app/) | 13:50:58 | 홈 → 여행 설계·지역 선택 → 통영 여행지 목록 → 관광지 상세 → 이용·편의정보. |
| [CBT OMR Tester](../assets/previews/cbt-omr-tester-live.gif) | [배포 사이트](https://cbt-omr-tester.vercel.app/) | 13:52:48 | 1과목·10문항 설정 → 답안 10개 마킹 → 정답 입력 → 실제 80점·오답 2문항 채점 결과. |
| [CWNU Community](../assets/previews/community-live.gif) | [배포 사이트](https://cwnu-community.vercel.app/) | 13:52:15 | 공개 메인 → 게시판 표/카드 목록 전환 → 시연 데이터 안내 공지와 댓글 읽기. |
| [CWNU Smart Portal](../assets/previews/smart-portal-live.gif) | [배포 사이트](https://todo-app-mini-project-20222017.vercel.app/) | 13:53:01 | 메인 → 학점계산기 → 예시 과목·학점·성적 입력 → 브라우저 내 실제 계산 결과. |
| [사각사각](../assets/previews/sagaksagak-live.gif) | [배포 사이트](https://sagaksagak-smart-edu.vercel.app/) | 13:54:22 | 로그인 전 공개 랜딩과 서비스 소개 섹션. 공개 소개 애니메이션과 기능 안내를 촬영. |

사각사각은 계정을 사용하거나 인증을 우회하지 않고 볼 수 있는 **공개 서비스 소개**를 촬영했다. 인증 뒤 대시보드·퀴즈·협동 기능을 직접 실행한 영상으로 소개하지 않는다.

CBT의 시험·정답과 Smart Portal의 학점은 촬영용 예시 입력이다. 실제 배포 페이지의 보이는 폼으로 입력하고 브라우저 안에서 계산했다. 커뮤니티 글·반응·ToDo 등 서버 데이터를 작성하지 않았다.

## 아직 촬영하지 않은 후속 계획

W.A.V.E의 날짜별 지도·일정 저장·공유·대화형 편집, 사각사각의 인증 뒤 학습·공동 작업 등은 이번 GIF에 포함하지 않았다. 추가 장면이 필요하면 현재 배포에서 허용된 범위를 다시 확인해 새로 촬영한다. 아래 저장소별 README 정리 계획과 현재 갤러리의 촬영 목록은 구분한다.

본인 역할의 근거는 [사각사각 최종 보고서](https://github.com/jeongiryang/SoftwareEngineering_team15_project_-Smart-Edu-Platform/blob/adf02fe48523f2abad368bc91b1e423a018a5cc6/docs/final-report/final-report.md#L718), [Community 과제 개요](https://github.com/jeongiryang/DatabaseLanguage_NodeJS_CWNU-Community/blob/cd24a9010b4bb287ea2b405da4364abc942b7166/README.md#L106), [Smart Portal 과제 개요](https://github.com/jeongiryang/todo-app-mini-project-20222017/blob/1981f21d2421c59747ca5b0136aa840f9fedf303/README.md#L71)를 따른다.

## 완료 보관함에서 이어 볼 2개

| 프로젝트 | 상태와 역할 | 정리할 내용 |
|---|---|---|
| [OpenGL 3D 주택](https://github.com/jeongiryang/Computer-Graphics_project_Team1) | 보관된 팀 프로젝트. 조장·주택 1/2층·차고·가로등 구현. | 최종 렌더링을 먼저 보여 준다. 키 조작표 → 빌드 환경 → 계층 모델링·지붕 계산 → 팀 역할 → 결과 순서로 정리한다. C++·OpenGL·GLFW·GLAD·GLM을 표기한다. |
| [DFS AnimalScript Generator](https://github.com/jeongiryang/AlgorithmAnimation_DFS-AnimalScript_Assignment) | 소스·출력·실행 결과가 있는 알고리즘 과제. | 초기 → 탐색 중 → 완료 화면을 보여 준다. Python 생성 명령, Animal에서 열기, 두 입력의 방문 순서·트리 간선, 제출용 보고서·부록을 연결한다. |

OpenGL의 자연환경·담장·나무·자동차 등 다른 팀원의 작업을 본인 구현으로 바꾸지 않는다. 역할은 [공개 보고서](https://github.com/jeongiryang/Computer-Graphics_project_Team1/blob/cb2db536cdcf90f49606668a1c7396836be9def3/README.md#L222) 기준으로 쓴다.

DFS의 과제 안내와 긴 AnimalScript 원문은 기존 부록으로 연결한다. 저장소의 완성 자료와 LMS 제출 여부·성적은 구분한다.

## 완료 보관작 8개

| 프로젝트 | 현재 근거 | README 정리 계획 |
|---|---|---|
| [TCP/UDP 분석](https://github.com/jeongiryang/Network-Programming_TCP_and_UDP-Analysis) | 서버·클라이언트 4개, 측정 그래프와 최종 분석 보고서. | 비교 그래프 → RTT·손실률·송신 조건 → 실험 결과 → 컴파일·실행 → 전체 보고서. 실험 조건을 벗어난 성능 우열로 확대하지 않는다. |
| [너구리 게임](https://github.com/jeongiryang/Advanced_Data_Structures_Team6) | 보관된 팀과제. 제공 코드 수정·확장, 4스테이지와 결과 보고서. | 시작·플레이·엔딩 화면 → 조작 → OS별 실행 → 구현·문제 해결. 본인 담당은 `opening`, `ending`, `reset_game`로 적는다. |
| [Python TRPG](https://github.com/jeongiryang/OpenSource_1_team-project) | 보관된 팀과제. 플레이어·전투·상점·던전 모듈과 보고서. | 터미널 플레이 예시 → 실행·조작 → 모듈 구조 → 역할 → 결과. 본인 담당은 플레이어 상태·인벤토리·상점으로 적는다. |
| [To-do·중고 마켓 웹](https://github.com/jeongiryang/WebProgramming_team-project) | 보관된 공동 제출 과제. 구현 코드와 결과 화면. | 실제 화면 → 기능 → 서버 실행 위치·API·JSON 저장 → 결과. 세부 역할이 확인되지 않아 전체를 단독 구현으로 쓰지 않는다. |
| [16-bit Checksum](https://github.com/jeongiryang/Network-Programming_Checksum-Generator) | 보관된 C 구현 과제. 소스와 계산 규칙·검사 자료. | 입력 → checksum 출력 예제, 비트 처리 규칙, C11 컴파일·실행, 예상 결과를 짧게 정리한다. |
| [Animal 1000 Points](https://github.com/jeongiryang/Algorithm_animal-animation_tool) | 생성기·입력·출력·1000점 최종 렌더 결과. | 최종 화면 → 특수 붉은 점 계산 → 실행 → 결과. `src` 실행법과 `data/points.txt` 경로, `.txt` 출력과 보존 `.asu`의 차이를 먼저 정리한다. |
| [Hadoop on Kubernetes](https://github.com/jeongiryang/BigData_Kubernetes_Hadoop_HDFS_Assignment) | Pod 실행·Web UI·HDFS 파일 저장 결과와 보고서. | 구성 → 클러스터·Pod·파일 저장 결과 → 재현 순서. 문서에서 참조하는 YAML 원문을 보완할 계획이다. |
| [MariaDB SQL](https://github.com/jeongiryang/DatabaseLanguage_SQL_Assignment) | README에 DDL·DML·6개 질의와 실행 결과가 있음. | 스키마 → 실행 순서 → 6개 요구사항과 결과. 현재 0 byte인 독립 SQL 파일 3개에 기존 쿼리를 분리할 계획이다. |

Animal·Hadoop·SQL은 완성 결과와 재현 자료의 정리 문제를 나누어 설명한다. 이 자료 누락만으로 과제 전체가 중단됐다고 쓰지 않는다.

## 별도로 기록할 프로토타입 2개

| 프로젝트 | 현재 소개 | 정리 계획 |
|---|---|---|
| [KG Ontology Decision Framework](https://github.com/jeongiryang/kg-ontology-decision-framework) | 로컬 GraphRAG PoC. | 질문 → 검증된 근거 답변 화면, 데이터 범위, 안전 검증 흐름, 실제 실행 진입점과 평가 문서를 보여 준다. 운영 서비스나 최종 졸업 판정 시스템으로 소개하지 않는다. |
| [Kitchen Mood Radio](https://github.com/jeongiryang/lg-ax-hackathon-cwnu-2026) | 개인 Android 프로토타입 0.2.0. | 실제 Android 화면과 콘셉트 스케치를 구분한다. 무드·합성 오디오·타이머의 현재 기능, Android Studio 실행, 미지원 백그라운드 기능을 정리한다. |

Kitchen Mood Radio는 LG전자나 국립창원대학교의 공식 서비스 또는 수상작으로 소개하지 않는다.

## 학습 기록 1개

[Coding-test](https://github.com/jeongiryang/Coding-test)는 BaekjoonHub 기반 풀이 기록이다. 문제·언어·유형별 탐색을 정리하고 제품 갤러리에서는 제외한다.

## 프로필 게재 보류

CWNU Campus Hub·3AM Mystery Room — **프로필 게재 보류(사용자 지정)**. 대표작·개발 중 목록·화면 추천에 포함하지 않는다.

## 공통 적용 순서

1. 한 문장 소개와 정확한 상태를 쓴다.
2. 실제 대표 화면 1장과 실재하는 실행·다운로드·보고서 링크를 둔다.
3. 사용 흐름 3단계, 본인 역할, 핵심 기술을 설명한다.
4. 설치·실행을 처음 방문한 사람도 따라갈 순서로 정리한다.
5. 실제 결과·검증 범위·남은 한계를 쓴다.
6. 긴 과제 안내·소스·변경 이력은 기존 상세 문서로 연결한다.

화면 크기·여백·링크 위치는 통일하고, 프로젝트별 실제 화면과 강조색으로 차이를 준다. 그림·영상·예제는 현재 버전과 일치하는 것을 고른다.

## 유지할 기준

- 팀 전체 결과와 본인 역할을 구분한다. 포크 원작의 화면·수상·기술 성과를 본인 실적으로 가져오지 않는다.
- 보관 프로젝트는 당시 최종 상태로 소개한다. 과거 테스트 결과를 이번에 다시 검증한 성공으로 표시하지 않는다.
- GitHub의 `license=null`은 라이선스 미검출이다. package.json의 MIT/ISC 문자열, 기존 All rights reserved 문구와 에셋 출처를 확인해 유지한다. 새 라이선스나 배지를 임의 추가하지 않는다.
- README 상단과 프로필의 프로젝트 버전 표시는 제거한다. 실행에 필요한 도구 버전과 기존 변경 이력은 상세 문서에 보존한다.
- 공개 주소의 HTTP 200 응답은 접속 확인이다. 로그인·외부 API·전체 사용 흐름까지 정상이라고 확대하지 않는다.
- 공개 소개는 공개 소스와 공개 보고서만 사용한다. 공개하지 않은 자료나 자격증명을 추가하지 않는다.

앱 기능·기존 소스·라이선스는 README 정리 범위에서 변경하지 않는다. 문서의 링크·결과 이미지와 실제 배포 GIF를 확인하고, 저장소에 설정된 검사를 거쳐 반영한다.
