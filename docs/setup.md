# Setup

## 로컬 요구사항

- Node.js 20 이상
- npm

## 설치

```bash
npm install
```

## 실행 명령

```bash
npm run build
npm run generate
npm run check
```

- `build`: TypeScript 컴파일
- `generate`: `README.md`와 `assets/generated/project-cards.svg` 생성
- `check`: build와 generate를 순차 실행

## README 문구 수정 위치

대부분의 내용은 `src/projects.ts`에서 수정합니다.

- 이름: `profileConfig.name`
- 학년/역할: `profileConfig.role`
- 관심 분야: `profileConfig.interests`
- 기술 스택: `profileConfig.techStackGroups`
- AI-assisted workflow: `profileConfig.workflow`

현재 README에는 `현재 학습 방향`과 `대표 프로젝트` 섹션이 없습니다. 중복을 줄이고
첫 화면에서 개발 중/완료 프로젝트가 바로 보이도록 구성했습니다.

## 프로젝트 추가/수정 방법

`featuredProjects` 배열의 항목을 수정합니다.

- `name`: README에 표시할 프로젝트명
- `repo`: repository slug
- `description`: table에 들어갈 한 줄 설명
- `stack`: 핵심 기술 3~4개
- `status`: `in_progress` 또는 `completed`
- `priority`: table 정렬 순서
- `url`: GitHub URL
- `currentFocus`: 개발 중 프로젝트의 현재 작업
- `result`: 완료 프로젝트의 구현 결과
- `isPublic`, `displayUrl`: 링크를 확실하게 공개해도 되는 경우에만 `true`

링크가 확실하지 않은 프로젝트는 `displayUrl: false`로 두면 README에서 일반 텍스트로 표시됩니다.

## SVG 카드

`assets/generated/project-cards.svg`는 계속 생성되지만 README 메인 흐름에는 직접 노출하지 않습니다.
`README.template.md`의 `<details>` 접기 섹션에서 보조 자료로만 표시됩니다.

## GitHub Actions

`.github/workflows/update-profile.yml`은 수동 실행과 하루 1회 schedule 실행을 지원합니다.
변경사항이 있을 때만 generated README와 SVG를 커밋합니다.

## 문제 해결

- README가 예상보다 길어지면 `description`, `currentFocus`, `result`를 한 줄로 줄입니다.
- Markdown table이 깨지면 프로젝트 문구에 줄바꿈이나 `|` 문자가 들어갔는지 확인합니다.
- SVG 텍스트가 넘치면 프로젝트명 또는 설명을 더 짧게 조정합니다.
- 생성 결과 확인 후 `npm run check`와 `git diff --check`를 실행합니다.
