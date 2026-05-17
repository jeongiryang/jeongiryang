# AI Simulation Log 0006: Project Sections and Previews

## 사용자 요청 요약

README 프로젝트 구성을 실제 repository 목록 기준으로 재정리한다. 개발 완료 프로젝트를
개발 중 프로젝트보다 위에 배치하고, 개발 완료/개발 중 프로젝트 table에는 오른쪽에
미리보기 이미지 열을 추가한다. 그 아래에는 `수업 과제 아카이브` 섹션을 새로 추가한다.

## Codex 작업 요약

- `src/projects.ts`를 `completed`, `in_progress`, `coursework` section 기반 데이터 구조로 재작성했다.
- 개발 완료/개발 중 프로젝트 table에 `미리보기` 열을 추가했다.
- 수업 과제 아카이브 table을 추가하고 사진 열은 넣지 않았다.
- Private repository는 링크하지 않도록 렌더링 정책을 정리했다.
- README 본문에는 자동 갱신 정보, SVG 카드, 기술 스택 독립 섹션, AI-assisted workflow 독립 섹션을 추가하지 않았다.
- preview 이미지 폴더를 만들고 사용자 제공 스크린샷을 프로젝트별 preview 파일로 매핑했다.
- architecture/setup 문서를 프로젝트 section과 preview 이미지 정책 기준으로 갱신했다.

## 생성/수정 파일

- `README.template.md`
- `README.md`
- `src/index.ts`
- `src/projects.ts`
- `src/renderer.ts`
- `src/svg/generateProjectCards.ts`
- `assets/generated/project-cards.svg`
- `assets/previews/cwnu-campus-hub.png`
- `assets/previews/database-language-cwnu-community.png`
- `assets/previews/inbox/.gitkeep`
- `docs/architecture.md`
- `docs/setup.md`
- `docs/ai-simulation-logs/0006-project-sections-and-previews.md`

## 이미지 매핑 내용

- `스크린샷 2026-05-17 222416.png`
  - 매핑 대상: `cwnu-campus-hub`
  - 저장 경로: `assets/previews/cwnu-campus-hub.png`
- `스크린샷 2026-05-17 222449.png`
  - 매핑 대상: `DatabaseLanguage_NodeJS_CWNU-Community`
  - 저장 경로: `assets/previews/database-language-cwnu-community.png`

## 검증 내용

실행한 검증 명령:

- `npm run build`: 성공
- `npm run generate`: 성공
- `npm run check`: 성공
- `git diff --check`: 성공
- `git status -sb`: 변경 파일 확인

추가 확인:

- 개발 완료 프로젝트가 개발 중 프로젝트보다 위에 있는지 확인
- `수업 과제 아카이브` 섹션 확인
- 개발 완료/개발 중 table의 `미리보기` 열 확인
- 수업 과제 아카이브 table에는 미리보기 열이 없는지 확인
- `SoftwareEngineering_team15_project_-Smart-Edu-Platform`이 clickable link가 아닌 일반 텍스트인지 확인
- 제외 repository가 프로젝트 table에 노출되지 않는지 확인
- `Godat` 오타가 없고 `Godot`으로 표기되는지 확인
- 이미지가 있는 프로젝트는 `<img>` 태그, 없는 프로젝트는 `-` 표시 확인

## 커밋 메시지 후보

```text
feat: reorganize profile projects with previews
```

## 다음 작업

- 추가 preview 이미지가 생기면 `assets/previews/`에 매핑한다.
- Private repository 공개 여부가 바뀌면 `isPublic`, `isPrivate`, `url` 값을 조정한다.
- 프로젝트가 늘어나면 README table 표시 개수를 제한할지 검토한다.
