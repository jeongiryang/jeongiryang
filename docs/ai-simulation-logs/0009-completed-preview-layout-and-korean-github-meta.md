# 0009 - Completed Preview Layout and Korean GitHub Metadata

## 사용자 요청 요약

- `개발 완료` 섹션의 preview 이미지가 table 안에서 작게 보이는 문제를 개선한다.
- 완료 프로젝트를 개별 block으로 분리하고, 각 프로젝트 정보 아래에 스크린샷을 크게 표시한다.
- `개발 중`, `완료한 과제` 섹션은 기존 table 구조를 유지한다.
- 기존 open/closed Issue와 PR의 제목/본문을 한국어 중심으로 정리한다.
- README.md만 직접 수정하지 않고 generator, 문서, 로그를 함께 수정한다.

## Codex 작업 요약

- `src/renderer.ts`에서 완료 프로젝트 렌더링을 table row 방식에서 프로젝트별 block 방식으로 변경했다.
- 완료 프로젝트 block은 `### 프로젝트명`, `요약 / 기술` table, `width="100%"` preview 이미지 순서로 생성한다.
- 개발 중 table은 `프로젝트 / 요약 / 기술`, 완료한 과제 table은 `과제 / 요약 / 기술` 구조를 유지했다.
- `docs/architecture.md`와 `docs/setup.md`에 완료 프로젝트 preview 렌더링 방식과 GitHub 메타데이터 정책을 반영했다.
- 기존 Issue/PR 제목과 본문을 한국어 중심으로 정리했다.

## README 레이아웃 변경 내용

- `개발 완료` 섹션에서 `프로젝트 / 요약 / 기술 / 미리보기` 대형 table을 제거했다.
- 각 완료 프로젝트를 별도 heading으로 분리했다.
- preview 이미지는 table cell이 아니라 프로젝트 block 아래에서 `width="100%"`로 표시한다.
- preview 이미지가 없는 완료 프로젝트가 생기면 이미지 태그를 렌더링하지 않는다.

## Issue/PR 한국어화 작업 내용

- Issue 제목은 자연스러운 한국어 제목으로 정리한다.
- PR 제목은 `feat:` prefix를 유지하고 뒤의 설명을 한국어화한다.
- 본문은 `목표`, `작업 내용`, `검증 기준` 또는 `작업 요약`, `변경 사항`, `검증` 중심으로 정리한다.
- branch 이름, 파일명, 명령어, 커밋 해시, URL, repository 이름은 원문을 유지한다.

## 변경 파일

- `README.md`
- `src/renderer.ts`
- `docs/architecture.md`
- `docs/setup.md`
- `docs/ai-simulation-logs/0009-completed-preview-layout-and-korean-github-meta.md`

## 검증 내용

- `npm run build`
- `npm run generate`
- `npm run check`
- `git diff --check`
- `git status -sb`
- README의 완료 프로젝트 block 구조, `width="100%"` 이미지, 개발 중/완료한 과제 table 구조를 확인한다.
- 기존 open/closed Issue와 PR 제목/본문이 한국어 중심으로 정리되었는지 확인한다.

## 커밋 메시지 후보

```text
feat: improve completed preview layout and Koreanize GitHub metadata
```

## 다음 작업

- GitHub 프로필 실제 화면에서 `width="100%"` preview 이미지가 자연스럽게 보이는지 확인한다.
- 완료 프로젝트가 늘어나면 preview 이미지의 비율과 crop 기준을 통일한다.
- 새 Issue/PR 생성 시 한국어 본문 템플릿을 계속 유지한다.
