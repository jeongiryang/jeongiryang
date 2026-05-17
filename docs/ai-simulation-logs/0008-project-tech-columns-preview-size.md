# 0008 - Project Tech Columns and Preview Size

## 사용자 요청 요약

- `개발 완료` table에 `기술` 열을 추가한다.
- `개발 중` table에도 `기술` 열을 추가하되 preview 열은 만들지 않는다.
- `완료한 과제` table은 `과제 / 요약 / 기술` 구조를 유지한다.
- 개발 완료 preview 이미지를 GitHub README에서 더 크게 보이도록 조정한다.
- README.md만 직접 수정하지 않고 generator와 source data를 함께 수정한다.

## Codex 작업 요약

- `src/projects.ts`의 개발 완료/개발 중 프로젝트별 기술 목록을 요청한 값으로 정리했다.
- `src/renderer.ts`에서 개발 완료 table을 `프로젝트 / 요약 / 기술 / 미리보기`로 변경했다.
- `src/renderer.ts`에서 개발 중 table을 `프로젝트 / 요약 / 기술`로 변경했다.
- preview image width를 `420`으로 키웠다.
- preview PNG의 과도한 외곽 영역을 줄여 주요 UI가 더 크게 보이도록 crop했다.
- 구조 변경 사항을 `docs/architecture.md`, `docs/setup.md`에 반영했다.

## 변경 파일

- `README.md`
- `src/projects.ts`
- `src/renderer.ts`
- `assets/previews/database-language-cwnu-community.png`
- `assets/previews/todo-app-mini-project.png`
- `docs/architecture.md`
- `docs/setup.md`
- `docs/ai-simulation-logs/0008-project-tech-columns-preview-size.md`

## 기술 열 매핑 내용

- `DatabaseLanguage_NodeJS_CWNU-Community`: JavaScript, Node.js, PostgreSQL
- `todo-app-mini-project-20222017`: JavaScript, Vercel
- `cwnu-campus-hub`: JavaScript, React, Vite
- `3am-computer-science-mystery-room`: Godot, GDScript
- `SoftwareEngineering_team15_project_-Smart-Edu-Platform`: React Native, Expo
- `2026-barrier-free-tour-data-app`: Web/App, Tourism Data

## 미리보기 이미지 크기 수정 내용

- 개발 완료 table의 preview image width를 `280`에서 `420`으로 변경했다.
- 개발 중 table에는 preview image 열을 추가하지 않았다.

## 이미지 crop 여부

- `assets/previews/database-language-cwnu-community.png`: 전체 화면 캡처에서 게시판 UI 중심 영역이 크게 보이도록 crop했다.
- `assets/previews/todo-app-mini-project.png`: 전체 화면 캡처에서 주요 카드 UI 중심 영역이 크게 보이도록 crop했다.

## 검증 내용

- `npm run build`
- `npm run generate`
- `npm run check`
- `git diff --check`
- `git status -sb`
- README table column 구조, preview width, private repository 링크 정책, Godot 표기를 추가 확인한다.

## 커밋 메시지 후보

```text
feat: add project tech columns and enlarge previews
```

## 다음 작업

- GitHub profile 화면에서 420px preview image가 모바일에서도 과하게 크지 않은지 확인한다.
- todo app 실제 화면 캡처가 준비되면 `todo-app-mini-project.png`를 교체한다.
- 개발 완료 프로젝트가 늘어나면 preview image 기준과 crop 기준을 문서화한다.
