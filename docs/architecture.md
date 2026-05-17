# Profile Dashboard Architecture

이 저장소는 `jeongiryang/jeongiryang` GitHub 프로필 README 전용 저장소입니다.
README는 짧은 포트폴리오 화면을 목표로 하며, `README.md`를 직접 관리하지 않고
TypeScript generator로 재생성합니다.

## 현재 README 구조

생성되는 README는 다음 순서만 유지합니다.

1. Hero
2. 개발 중인 프로젝트
3. 개발 완료 프로젝트
4. 기술 스택
5. AI-assisted Development Workflow
6. 자동 갱신 정보

`현재 학습 방향`과 중복되는 `대표 프로젝트` 섹션은 제거했습니다. 프로젝트 정보는
첫 화면에서 바로 읽히도록 진행 중/완료 table에 집중합니다.

## 주요 파일

- `README.template.md`: 간략형 README의 placeholder 배치입니다.
- `README.md`: GitHub 프로필에 표시되는 생성 결과물입니다.
- `src/projects.ts`: 프로필 Hero, 프로젝트 목록, 기술 스택, AI-assisted workflow를 관리합니다.
- `src/renderer.ts`: 프로젝트 상태별 Markdown table과 자동 갱신 정보를 렌더링합니다.
- `src/svg/generateProjectCards.ts`: 보조용 SVG 프로젝트 카드를 생성합니다.
- `assets/generated/project-cards.svg`: README 하단 `<details>` 안에서만 표시되는 보조 시각 자료입니다.
- `.github/workflows/update-profile.yml`: GitHub Actions 자동 갱신 workflow입니다.

## 생성 흐름

1. `src/index.ts`가 `profileConfig`와 `featuredProjects`를 읽습니다.
2. `src/svg/generateProjectCards.ts`가 보조 SVG 카드를 생성합니다.
3. `src/renderer.ts`가 template placeholder를 짧은 Markdown 섹션으로 치환합니다.
4. 최종 결과가 `README.md`에 저장됩니다.

## 프로젝트 상태별 렌더링

`src/projects.ts`의 `status` 값으로 표시 위치를 나눕니다.

- `in_progress`: `개발 중인 프로젝트` table에 표시됩니다.
- `completed`: `개발 완료 프로젝트` table에 표시됩니다.

각 프로젝트는 `description`, `stack`, `currentFocus`, `result`를 짧게 유지합니다.
README table에 들어가는 문장이므로 한 줄 요약을 권장합니다.

## SVG 카드 정책

SVG 카드는 README의 중심 UI가 아닙니다. GitHub README에서 자연스럽게 보이는
Markdown table을 우선 사용하고, SVG는 `<details>` 접기 섹션 안의 보조 자료로만 둡니다.

## AI-assisted Workflow 섹션

이 섹션은 Codex를 활용한 작업 흐름을 짧게 설명합니다. 핵심은 요구사항 분해,
구현, 리팩터링, 테스트, 문서화, PR 기반 검증 루프를 빠르게 반복하는 방식입니다.
과장된 자기소개보다 실제 개발 프로세스가 보이도록 유지합니다.
