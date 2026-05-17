# AI Simulation Log 0007: Simplify Project Tables

## 사용자 요청 요약

README의 프로젝트 섹션명을 더 짧게 바꾸고, table 구조를 단순화한다. `개발 완료`에는
미리보기 이미지만 유지하고, `개발 중`과 `완료한 과제`에는 이미지 열을 두지 않는다.
기존 개발 중 preview 이미지는 `todo-app-mini-project-20222017`의 preview로 재매핑한다.

## Codex 작업 요약

- 섹션명을 `개발 완료`, `개발 중`, `완료한 과제`로 변경했다.
- `개발 완료` table을 `프로젝트 / 요약 / 미리보기` 3열로 단순화했다.
- `개발 중` table을 `프로젝트 / 요약` 2열로 단순화했다.
- `완료한 과제` table을 `과제 / 요약 / 기술` 3열로 유지했다.
- About Me를 GitHub Issue, branch, PR, merge 흐름과 Git 관리 역량 중심으로 수정했다.
- footer 감사 문구를 제거했다.
- preview 이미지 width를 `280`으로 변경했다.
- 기존 `cwnu-campus-hub` preview 이미지를 `todo-app-mini-project.png`로 재매핑했다.
- architecture/setup 문서를 새 table 정책에 맞게 갱신했다.

## 변경 파일

- `README.template.md`
- `README.md`
- `src/projects.ts`
- `src/renderer.ts`
- `assets/previews/todo-app-mini-project.png`
- `docs/architecture.md`
- `docs/setup.md`
- `docs/ai-simulation-logs/0007-simplify-project-tables.md`

## 이미지 매핑 수정 내용

- `DatabaseLanguage_NodeJS_CWNU-Community`
  - `assets/previews/database-language-cwnu-community.png`
- `todo-app-mini-project-20222017`
  - `assets/previews/todo-app-mini-project.png`
- `cwnu-campus-hub`
  - previewImage 제거
  - 개발 중 table에는 미리보기 열을 표시하지 않음

## 검증 내용

실행한 검증 명령:

- `npm run build`: 성공
- `npm run generate`: 성공
- `npm run check`: 성공
- `git diff --check`: 성공
- `git status -sb`: 변경 파일 확인

추가 확인:

- 새 섹션명 확인
- 이전 긴 섹션명 제거 확인
- 개발 완료 table에서 `결과` 열 제거 확인
- 개발 중 table에서 `진행 내용`, `미리보기`, `결과` 열 제거 확인
- 완료한 과제 table에 사진 열이 없는지 확인
- todo mini project preview 연결 확인
- cwnu-campus-hub preview 미표시 확인
- preview image width `280` 확인
- private repository 링크 미사용 확인
- 제외 repository 미노출 확인
- footer 감사 문구 제거 확인
- `Godat` 오타가 없고 `Godot`으로 표기되는지 확인

## 커밋 메시지 후보

```text
feat: simplify project tables and fix previews
```

## 다음 작업

- Todo preview 이미지가 실제 Todo 화면과 맞는지 확인한다.
- 추가 preview가 생기면 개발 완료 프로젝트에만 연결한다.
- GitHub 프로필 모바일 화면에서 280px preview table 가독성을 확인한다.
