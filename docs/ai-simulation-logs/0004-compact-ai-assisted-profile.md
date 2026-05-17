# AI Simulation Log 0004: Compact AI-assisted Profile

## 사용자 요청 요약

README를 짧고 핵심만 보이는 GitHub 프로필 포트폴리오로 리팩터링한다.
개발 중/개발 완료 프로젝트를 최상단에 배치하고, `현재 학습 방향`과 중복되는
`대표 프로젝트` 섹션을 제거한다. SVG 카드는 보조 자료로 접기 섹션 안에 두고,
Codex 기반 AI-assisted development workflow를 짧고 전문적으로 표현한다.

## Codex 작업 요약

- README template을 Hero, 프로젝트 table, 기술 스택, AI-assisted workflow, 자동 갱신 정보로 단순화했다.
- 프로젝트 데이터를 table에 맞는 짧은 설명, 핵심 기술, 현재 작업, 구현 결과 중심으로 정리했다.
- renderer에서 학습 방향, 대표 프로젝트, 긴 최근 활동 렌더링을 제거했다.
- SVG 카드는 생성 기능을 유지하되 README 하단 `<details>` 안에 보조 자료로 배치했다.
- architecture/setup 문서를 간략형 README 구조에 맞게 갱신했다.

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
- `docs/ai-simulation-logs/0004-compact-ai-assisted-profile.md`

## 검증 내용

실행한 검증 명령:

- `npm run build`: 성공
- `npm run generate`: 성공
- `npm run check`: 성공
- `git diff --check`: 성공
- `git status -sb`: 변경 파일 확인

추가 확인:

- README에서 `현재 학습 방향` 섹션 제거 확인
- README에서 `대표 프로젝트` 섹션 제거 확인
- 개발 중/개발 완료 프로젝트가 상단에 표시되는지 확인
- README 길이가 173줄에서 61줄로 감소한 것 확인
- SVG 카드가 `<details>` 접기 섹션 안에 있는지 확인

## 커밋 메시지 후보

```text
feat: compact AI-assisted profile README
```

## 다음 작업

- 실제 공개 repository 기준으로 링크 표시 여부를 조정한다.
- 프로젝트가 늘어나면 table이 길어지지 않도록 priority나 표시 개수를 조정한다.
- GitHub Actions 자동 갱신 후 프로필 화면에서 table 가독성을 확인한다.
