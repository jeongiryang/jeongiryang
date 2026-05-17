# AI Simulation Log 0003: Korean Profile UI Refresh

## 사용자 요청 요약

GitHub 프로필 README를 한국어 중심의 깔끔한 포트폴리오 대시보드로 개선한다.
학년 문구를 `컴퓨터공학과 3학년 1학기 재학 중`으로 수정하고, 프로젝트 상태/설명/섹션명,
최근 활동, SVG 카드, 문서를 모두 한국어 기준으로 정리한다.

## Codex 작업 요약

- README 템플릿을 한국어 섹션 구조로 재구성했다.
- 프로젝트 데이터를 `in_progress`와 `completed` 상태 기반으로 정리했다.
- 진행 중 프로젝트, 완료 프로젝트, 대표 프로젝트 섹션을 generator에서 렌더링하도록 개선했다.
- 기술 스택을 그룹형 table로 바꾸고 학습 방향에 한국어 설명을 추가했다.
- 개발 워크플로우 섹션을 추가했다.
- GitHub API fallback 활동 요약과 이벤트 문구를 한국어로 수정했다.
- SVG 프로젝트 카드를 진행 중/완료 구분이 보이는 카드형 대시보드로 개선했다.
- architecture/setup 문서를 한국어 중심 구조에 맞게 갱신했다.

## 생성/수정 파일

- `README.template.md`
- `README.md`
- `src/projects.ts`
- `src/renderer.ts`
- `src/github.ts`
- `src/svg/generateProjectCards.ts`
- `assets/generated/project-cards.svg`
- `docs/architecture.md`
- `docs/setup.md`
- `docs/ai-simulation-logs/0003-korean-profile-ui-refresh.md`

## 검증 내용

실행한 검증 명령:

- `npm run build`: 성공
- `npm run generate`: 성공
- `npm run check`: 성공
- `git diff --check`: 성공
- `git status -sb`: 변경 파일 확인

## 커밋 메시지 후보

```text
feat: refresh profile dashboard Korean UI
```

## 다음 작업

- GitHub 프로필 화면에서 SVG 카드 실제 표시 상태를 확인한다.
- 대표 프로젝트의 저장소 URL을 실제 공개 repository 기준으로 조정한다.
- GitHub API 활동 요약을 더 읽기 좋은 한국어 문장으로 확장한다.
- 프로젝트별 스크린샷이나 결과 링크를 README에 추가할지 검토한다.
