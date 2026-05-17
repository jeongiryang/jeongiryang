# Setup

## 로컬 요구사항

- Node.js 20 이상
- npm

## 설치

```bash
npm install
```

## 실행 명령

TypeScript 컴파일:

```bash
npm run build
```

README와 SVG 카드 생성:

```bash
npm run generate
```

빌드와 생성을 한 번에 검증:

```bash
npm run check
```

## 프로필 문구 수정 위치

대부분의 내용은 `src/projects.ts`에서 수정합니다.

- 이름: `profileConfig.name`
- GitHub username: `profileConfig.username`
- 학년/역할: `profileConfig.role`
- 상단 소개 문구: `profileConfig.direction`
- 소개 문장: `profileConfig.introduction`
- 관심 분야: `profileConfig.interests`

수정 후에는 반드시 다음 명령을 실행합니다.

```bash
npm run check
```

## 프로젝트 추가/수정 방법

`src/projects.ts`의 `featuredProjects` 배열에 프로젝트를 추가하거나 수정합니다.

주요 필드:

- `name`: README에 표시할 프로젝트명
- `description`: 한국어 핵심 설명
- `stack`: 기술 스택. `TypeScript`, `React`, `Node.js`처럼 기술명은 영어 그대로 유지합니다.
- `status`: `in_progress` 또는 `completed`
- `statusLabel`: `진행 중` 또는 `완료`
- `categoryLabel`: `포트폴리오`, `게임`, `자동화`, `수업 프로젝트` 등 한국어 분류
- `currentFocus`: 진행 중 프로젝트의 현재 집중 작업
- `result`: 완료 프로젝트의 구현 결과
- `url`: GitHub 저장소 링크
- `priority`: 대표 프로젝트 섹션의 정렬 기준

## 상태별 표시 방식

- `status: "in_progress"`인 프로젝트는 `현재 작업 중인 프로젝트` 섹션에 표시됩니다.
- `status: "completed"`인 프로젝트는 `완료한 프로젝트` 섹션에 표시됩니다.
- `대표 프로젝트` 섹션은 `priority` 기준으로 상위 프로젝트를 카드형 table로 보여줍니다.
- SVG 카드는 `Now Building · 진행 중`과 `Completed · 완료` 영역으로 나뉩니다.

## 기술 스택과 학습 방향

- 기술 스택 그룹은 `profileConfig.techStackGroups`에서 관리합니다.
- 학습 방향과 한국어 설명은 `profileConfig.learningFocus`에서 관리합니다.
- 기술명, repository slug, GitHub URL은 영어 원문을 유지하는 것을 권장합니다.

## SVG 카드 생성 방식

`src/svg/generateProjectCards.ts`는 외부 이미지나 badge 서비스 없이 순수 SVG를 생성합니다.
카드에는 프로젝트명, 상태, 분류, 설명, 현재 집중 작업 또는 구현 결과, 기술 스택이 들어갑니다.
README에서는 `assets/generated/project-cards.svg`를 `width="100%"`로 삽입합니다.

## 환경변수

- `GITHUB_USERNAME`: 선택 사항. 기본값은 `jeongiryang`입니다.
- `GITHUB_TOKEN`: 선택 사항. GitHub Actions에서는 기본 `${{ github.token }}`을 사용합니다.

토큰이나 secret은 생성 파일에 쓰지 않습니다. GitHub API 호출에 실패하면 한국어 fallback 활동 요약으로 README를 생성합니다.

## GitHub Actions

`.github/workflows/update-profile.yml`은 다음 경우 실행됩니다.

- 수동 실행: `workflow_dispatch`
- 자동 실행: 하루 1회 `schedule`

워크플로우는 `npm run check`를 실행하고, 생성 결과가 바뀐 경우에만
`README.md`와 `assets/generated/project-cards.svg`를 커밋합니다.

## 문제 해결

- README가 예상과 다르면 `npm run generate`를 다시 실행하고 `git diff`를 확인합니다.
- GitHub 활동이 fallback으로 표시되면 API 토큰, rate limit, 네트워크 상태를 확인합니다.
- SVG 텍스트가 길면 `description`, `currentFocus`, `result` 문장을 짧게 정리합니다.
- Actions push가 실패하면 repository workflow permission의 read/write 권한을 확인합니다.
