# AI Simulation Log 0005: Minimal Profile README

## 사용자 요청 요약

README를 GitHub 프로필 첫 화면에 맞는 최소 포트폴리오 구조로 더 단순화한다.
Hero, About Me, 개발 중인 프로젝트, 개발 완료 프로젝트, 하단 감사 문구만 남기고
기술 스택, AI-assisted workflow 독립 섹션, 자동 갱신 정보, SVG 카드 표시를 제거한다.

## Codex 작업 요약

- `README.template.md`를 최소 표시 섹션만 남기는 구조로 정리했다.
- 자동 생성 안내와 마지막 갱신 시간을 화면에 보이지 않는 HTML 주석으로 이동했다.
- `src/renderer.ts`에서 Hero, About Me, 상태별 프로젝트 table, Footer 중심으로 렌더링을 정리했다.
- `src/projects.ts`의 프로젝트 데이터를 README table에 맞는 짧은 요약과 핵심 기술 중심으로 다듬었다.
- SVG 생성 기능은 유지하되 README 본문에는 표시하지 않도록 했다.
- architecture/setup 문서를 최소 프로필형 구조에 맞게 갱신했다.

## 생성/수정 파일

- `README.template.md`
- `README.md`
- `src/index.ts`
- `src/projects.ts`
- `src/renderer.ts`
- `src/svg/generateProjectCards.ts`
- `assets/generated/project-cards.svg`
- `docs/architecture.md`
- `docs/setup.md`
- `docs/ai-simulation-logs/0005-minimal-profile-readme.md`

## 검증 내용

실행한 검증 명령:

- `npm run build`: 성공
- `npm run generate`: 성공
- `npm run check`: 성공
- `git diff --check`: 성공
- `git status -sb`: 변경 파일 확인

추가 확인:

- 관심 분야 나열 문구 제거 확인
- `[!IMPORTANT]`, Education, 기술 스택, AI-assisted workflow 독립 섹션 제거 확인
- 자동 갱신 정보가 화면 표시 섹션으로 남지 않는지 확인
- SVG 이미지와 `<details>`가 README 본문에 삽입되지 않는지 확인
- 개발 중/개발 완료 프로젝트 table 유지 확인
- 학년 문구 유지 확인

## 커밋 메시지 후보

```text
feat: simplify profile README layout
```

## 다음 작업

- 공개 가능한 프로젝트 URL을 실제 상태에 맞게 조정한다.
- 프로젝트가 늘어나면 README table 표시 개수를 제한한다.
- GitHub 프로필 화면에서 모바일 table 가독성을 확인한다.
