# 제작실 구조

`src/projects.ts`를 README와 HTML 제작실의 공통 데이터로 사용한다. 공개 원본 프로젝트의 결과 화면·상태·역할을 먼저 보여 주고, 기여 기록과 소스 규모를 뒤에 둔다.

## 표시 순서

1. light/dark 제작실 헤더, 한 문장 소개, HTML 제작실 바로가기.
2. 대표 프로젝트: WAVE를 첫 행 전체 너비로, 나머지 완성 결과물을 두 열 갤러리로 표시.
3. 실제 프로젝트에서 사용한 기술 아이콘 한 줄.
4. 공개 GitHub stats, 선정한 공개 원본 HEAD의 소스 규모, 실제 기여 달력 snake.
5. 완료한 과제와 개발 중 작업을 각각 접어서 보관.
6. 제작 방식과 상세 문서 링크.

GitHub README는 Markdown과 제한된 HTML로 구성한다. CSS 레이아웃과 반응형 표현이 필요한 화면은 [GitHub Pages 제작실](https://jeongiryang.github.io/jeongiryang/)에서 제공한다. 두 화면은 같은 데이터·미리보기·생성 SVG를 사용한다.

## 생성 흐름

| 단계 | 입력 | 출력 |
|---|---|---|
| `npm run collect` | 공개 API, 선정 저장소의 기본 브랜치 HEAD, 검증한 cloc 2.10 | `assets/generated/source-metrics.json` |
| stats Action / snk Action | GitHub 공개 통계 / 실제 기여 달력 | `github-stats-{light,dark}.svg`, `contribution-snake-{light,dark}.svg` |
| `npm run generate` | 프로젝트 데이터, 템플릿, 기존 측정 JSON | `README.md`, 제작실 헤더·코드 규모 SVG, `site/` |
| `npm run check` | 위 입력·생성물 | build·generate 후 공개 대상과 자산 검증 |
| GitHub Pages | 검증한 `site/` artifact | HTML 제작실 |

`collect`는 수집만 수행한다. 일반 `generate`는 외부 stats·snake를 새로 조회하지 않으며, 소스 규모 카드에는 실제 snapshot이 필요하다.

## 주요 파일

| 파일 | 역할 |
|---|---|
| [`src/projects.ts`](../src/projects.ts) | 소개와 공개 프로젝트 데이터, 상태·역할·순서, 화면, 측정 대상 |
| [`README.template.md`](../README.template.md) | 고정 문구와 섹션 placeholder |
| [`src/renderer.ts`](../src/renderer.ts) | 공개 데이터 필터, README 갤러리·접기·테마 이미지 |
| [`src/svg/workshop.ts`](../src/svg/workshop.ts) | 외부 자산 없는 정적 제작실 헤더 |
| [`src/source-metrics.ts`](../src/source-metrics.ts) | 공개 HEAD 검증, 소스 수집, snapshot, 코드 규모 카드 |
| [`src/site.ts`](../src/site.ts) | 정적 HTML·CSS 생성과 로컬 자산 복사 |
| [`src/index.ts`](../src/index.ts) | 수집 또는 일반 생성 실행 진입점 |
| [`scripts/verify.mjs`](../scripts/verify.mjs) | 공개 대상·측정 schema·로컬 자산·8개 SVG 확인 |
| [`.github/workflows/update-profile.yml`](../.github/workflows/update-profile.yml) | 예약 갱신, 고정 Action 호출, 검증, 커밋, Pages 배포 |

`assets/previews/`는 실제 배포 화면 GIF와 [촬영 기록](../assets/previews/capture-manifest.json)을, `assets/generated/`는 측정 JSON과 테마별 SVG를 보관한다. `site/`는 생성한 배포 artifact이며 직접 편집하지 않는다. 현재 실행 경로는 예전 `project-cards.svg`를 생성하거나 표시하지 않는다.

## 공개 범위와 수치의 의미

공통 데이터 필터는 본인 계정의 공개 URL만 허용한다. 수집기는 별도로 GitHub API에서 소유자 `jeongiryang`, `private: false`, `fork: false`를 확인한다. 비공개 자료나 다른 사람의 포크를 개인 작품으로 가져오지 않는다. 완료와 아카이브 상태를 나누고, 팀 프로젝트는 전체 결과와 본인 역할을 함께 적는다.

공개 원본 7개의 코드 규모는 **기본 브랜치 현재 HEAD의 선택한 소스 줄 수**다. 개인 작성량·누적 수정량·작업 시간과 다르다. 언어·경로·파일명·크기 기준으로 외부 의존성, 빌드·생성·minified 파일을 제외한다. 정확한 확장자와 한계는 [집계 기준](setup.md#코드-규모)을 따른다. 기여 달력 수와 커밋 수도 서로 다른 지표다.

## 실패와 갱신

모든 저장소 수집이 성공한 뒤 snapshot을 교체한다. 공개 확인·HEAD·cloc 중 하나라도 실패하면 이전 snapshot을 보존하고 게시 단계로 넘어가지 않는다. 같은 측정 내용은 날짜를 바꾸지 않아 불필요한 갱신 커밋을 만들지 않는다.

외부 stats·snake 생성은 일시 실패를 허용하되 남아 있는 정상 자산을 검사한 뒤 사용한다. stats는 오류 응답을 저장하지 않도록 설정한다. 최초 자산이 없거나 SVG 검사에 실패하면 전체 검증·게시가 중단된다. 검증 통과 후에만 생성물 커밋과 Pages artifact 업로드를 수행한다.

GitHub 인증에는 기본 `GITHUB_TOKEN`을 사용한다. 추가 PAT·WakaTime secret은 없다. Action SHA, stats core 버전, cloc 버전·checksum은 워크플로에 고정한다. 현재 기술 아이콘과 HTML 바로가기 배지는 각각 Skill Icons와 Shields 외부 이미지를 사용한다. stats·snake 공유 서버를 README에 직접 연결하지 않는다.
