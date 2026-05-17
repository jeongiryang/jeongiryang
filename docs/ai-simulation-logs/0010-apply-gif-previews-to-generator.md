# 0010 - Apply GIF Previews to Generator

## 사용자 요청 요약

- 루트에 있는 untracked GIF 2개를 삭제하지 않고 `assets/previews/`로 이동한다.
- 완료 프로젝트 preview를 기존 `.png`가 아니라 `.gif`로 README에 표시한다.
- GitHub 웹에서 직접 수정했던 완료 프로젝트 block 구조를 generator에 반영한다.
- README.md는 직접 수정하지 않고 `src/projects.ts`, `src/renderer.ts` 변경 후 `npm run generate`로 재생성한다.

## Codex 작업 요약

- 작업 시작 전 `origin/main` 기준으로 로컬 main을 동기화했다.
- 루트 GIF 파일명을 확인하고 첫 프레임을 확인해 프로젝트별로 매핑했다.
- 완료 프로젝트 데이터에 `demoUrl`, `previewCaption`, `.gif` preview 경로를 추가했다.
- 개발 완료 섹션 렌더링을 번호 heading, 사이트 바로가기, 요약/기술 table, preview HTML table 구조로 변경했다.
- 관련 문서와 README 생성 결과를 갱신했다.

## 루트 GIF 파일 매핑 내용

- `데이터베이스.gif`
  - 대상 프로젝트: `DatabaseLanguage_NodeJS_CWNU-Community`
  - 이동 경로: `assets/previews/database-language-cwnu-community.gif`
- `투두앱.gif`
  - 대상 프로젝트: `todo-app-mini-project-20222017`
  - 이동 경로: `assets/previews/todo-app-mini-project.gif`

## README generator 반영 내용

- 완료 프로젝트 heading을 `### 1. [프로젝트명](URL)` 형식으로 렌더링한다.
- `demoUrl`이 있으면 `#### [사이트 바로가기 ↗](URL)`을 표시한다.
- 요약/기술 table을 유지한다.
- `previewImage`가 있으면 `#### 미리보기`와 HTML table 액자 구조를 표시한다.
- 이미지 아래 caption은 `previewCaption` 값을 사용한다.
- 개발 중/완료한 과제 섹션에는 preview 이미지를 표시하지 않는다.

## 변경 파일

- `README.md`
- `src/projects.ts`
- `src/renderer.ts`
- `docs/architecture.md`
- `docs/setup.md`
- `docs/ai-simulation-logs/0010-apply-gif-previews-to-generator.md`
- `assets/previews/database-language-cwnu-community.gif`
- `assets/previews/todo-app-mini-project.gif`

## 검증 내용

- `npm run build`
- `npm run generate`
- `npm run check`
- `git diff --check`
- `git status -sb`
- README의 `.gif` preview 경로, 사이트 바로가기 링크, preview table/caption 구조, 루트 GIF 정리 상태를 확인한다.

## 커밋 메시지 후보

```text
feat: apply GIF previews to profile README generator
```

## 다음 작업

- GitHub README에서 GIF 용량과 로딩 속도를 확인한다.
- GIF가 과하게 무거우면 해상도나 길이를 줄인 최적화본으로 교체한다.
