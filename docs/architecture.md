# Profile Dashboard Architecture

이 저장소는 `jeongiryang/jeongiryang` GitHub 프로필 README 전용 저장소입니다.
README는 직접 손으로 관리하지 않고, TypeScript generator가 로컬 설정 데이터와
GitHub 활동 데이터 또는 fallback 데이터를 조합해 생성합니다.

## 전체 구조

- `README.template.md`: README의 전체 배치와 placeholder를 정의합니다.
- `README.md`: GitHub 프로필 상단에 표시되는 생성 결과물입니다.
- `src/projects.ts`: 이름, 학년/소개 문구, 기술 스택, 학습 방향, 개발 워크플로우,
  프로젝트 목록을 관리하는 핵심 설정 파일입니다.
- `src/github.ts`: `GITHUB_TOKEN`, `GITHUB_USERNAME`을 읽고 GitHub 공개 활동을 가져옵니다.
  API 호출에 실패하면 한국어 fallback 활동 요약을 반환합니다.
- `src/renderer.ts`: 프로젝트 상태별로 README 섹션을 렌더링합니다.
- `src/svg/generateProjectCards.ts`: 외부 이미지 없이 순수 SVG 프로젝트 카드를 생성합니다.
- `src/index.ts`: 전체 생성 흐름을 실행합니다.
- `assets/generated/project-cards.svg`: README에서 참조하는 생성 SVG입니다.
- `.github/workflows/update-profile.yml`: 매일 1회 또는 수동 실행으로 README를 갱신합니다.

## README 생성 흐름

1. `src/index.ts`가 `src/projects.ts`의 `profileConfig`와 `featuredProjects`를 읽습니다.
2. `src/github.ts`가 GitHub 공개 활동을 가져오거나 fallback 활동 데이터를 만듭니다.
3. `src/svg/generateProjectCards.ts`가 프로젝트 상태를 기준으로 SVG 카드를 생성합니다.
4. `src/renderer.ts`가 template placeholder를 한국어 Markdown/HTML 조각으로 치환합니다.
5. 최종 결과가 `README.md`에 저장됩니다.

## 프로젝트 상태별 렌더링

`featuredProjects`의 `status` 값은 다음 두 가지를 사용합니다.

- `in_progress`: `현재 작업 중인 프로젝트` 섹션과 SVG의 `Now Building · 진행 중` 영역에 표시됩니다.
- `completed`: `완료한 프로젝트` 섹션과 SVG의 `Completed · 완료` 영역에 표시됩니다.

`대표 프로젝트` 섹션은 `priority` 값이 낮은 순서로 상위 프로젝트를 보여줍니다.
진행 중 프로젝트는 `currentFocus`, 완료 프로젝트는 `result`가 핵심 설명으로 사용됩니다.

## 주요 모듈 역할

- `src/projects.ts`
  - 학년/역할 문구: `profileConfig.role`
  - 상단 소개 문구: `profileConfig.direction`, `profileConfig.introduction`
  - 기술 스택 그룹: `profileConfig.techStackGroups`
  - 학습 방향: `profileConfig.learningFocus`
  - 개발 워크플로우: `profileConfig.workflow`
  - 프로젝트 데이터: `featuredProjects`

- `src/renderer.ts`
  - Hero, 소개, 진행 중 프로젝트, 완료 프로젝트, 대표 프로젝트, 기술 스택,
    학습 방향, 개발 워크플로우, 최근 활동, 마지막 갱신 섹션을 생성합니다.

- `src/svg/generateProjectCards.ts`
  - 프로젝트명과 기술명은 영어를 유지하고, 상태/분류/설명 라벨은 한국어로 출력합니다.
  - 텍스트가 카드 밖으로 넘치지 않도록 줄바꿈과 생략 처리를 적용합니다.

## GitHub Actions 자동화

워크플로우는 `workflow_dispatch`와 `schedule`로 실행됩니다.
`npm ci`, `npm run check`를 실행한 뒤 `README.md`와 `assets/generated/project-cards.svg`가
변경된 경우에만 커밋하고 push합니다. 변경사항이 없으면 커밋하지 않아 반복 실행을 피합니다.
