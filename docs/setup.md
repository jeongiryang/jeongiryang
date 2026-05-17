# Setup

## 로컬 요구사항

- Node.js 20 이상
- npm

## 설치와 실행

```bash
npm install
npm run build
npm run generate
npm run check
```

- `build`: TypeScript 컴파일
- `generate`: `README.md`와 `assets/generated/project-cards.svg` 생성
- `check`: build와 generate를 순차 실행

## README 수정 위치

README 본문은 직접 수정하지 않습니다. 다음 파일을 수정한 뒤 `npm run generate`를 실행합니다.

- `README.template.md`: 섹션 순서
- `src/projects.ts`: About Me 문구, 프로젝트 데이터, preview 이미지, 공개/비공개 링크 정책
- `src/renderer.ts`: Markdown table 렌더링 방식

## 프로젝트 데이터 필드

`src/projects.ts`의 `profileProjects` 항목은 다음 필드를 사용합니다.

- `name`: repository 이름
- `displayName`: README에 표시할 이름
- `description`: 한 줄 요약
- `result`: 완료 결과 또는 내부 관리용 진행 내용
- `tech`: 프로젝트와 과제 table에 표시할 기술 목록
- `section`: `completed`, `in_progress`, `assignment`
- `priority`: 섹션 내 정렬 순서
- `isPublic`: 공개 repository 여부
- `url`: GitHub URL
- `demoUrl`: 배포 사이트 URL
- `previewImage`: 개발 완료 프로젝트 block 아래에 표시할 preview 이미지 경로
- `previewAlt`: preview 이미지 alt 텍스트
- `previewCaption`: preview 이미지 아래에 표시할 짧은 caption
- `isPrivate`: private repository 여부
- `isArchived`: archive repository 여부

## 섹션별 표시 방식

- `completed`: 프로젝트별 heading, `요약 / 기술` table, 큰 preview 이미지
- `in_progress`: `프로젝트 / 요약 / 기술`
- `assignment`: `과제 / 요약 / 기술`

개발 완료가 개발 중보다 먼저 표시됩니다. 개발 중 table과 완료한 과제 table에는 사진 열을 만들지 않습니다.

## Preview 이미지 추가

이미지는 `assets/previews/`에 둡니다. 개발 완료 프로젝트만 README에서 preview 이미지를 표시합니다.
이미지 width는 `100%`로 렌더링됩니다. 이미지가 없는 개발 완료 프로젝트는 이미지 태그를 표시하지 않습니다.

현재 사용 중인 preview 파일:

- `assets/previews/database-language-cwnu-community.gif`
- `assets/previews/todo-app-mini-project.gif`

매핑이 불확실한 이미지는 `assets/previews/inbox/`에 둔 뒤 나중에 확인합니다.

## 링크 정책

확실히 공개된 repository만 링크합니다. Private repository는 README에서 일반 텍스트로 표시합니다.

프로필 노출에서 제외하는 repository:

- `jeongiryang`
- `Turtle-Hwan`
- `GitHub_Practice`
- `Coding_Study_Note`

## SVG 파일

`assets/generated/project-cards.svg`는 계속 생성되지만 README 본문에는 삽입하지 않습니다.
이번 README의 중심 UI는 간단한 Markdown table입니다.

## Issue/PR 제목과 본문

Issue와 PR은 한국어 중심으로 작성합니다. PR 제목의 `feat:`, `fix:`, `docs:` 같은 prefix는
그대로 두고, 뒤의 설명을 한국어로 씁니다. 파일명, branch 이름, 명령어, URL, 커밋 해시는
원문을 유지합니다.
