# Profile Dashboard Architecture

이 저장소는 `jeongiryang/jeongiryang` GitHub 프로필 README 전용 저장소입니다.
현재 README는 기능 설명서가 아니라 GitHub 프로필 첫 화면에 맞춘 최소 포트폴리오
구조로 생성됩니다.

## README 표시 구조

생성되는 README에서 화면에 보이는 섹션은 다음뿐입니다.

1. Hero
2. About Me
3. 개발 중인 프로젝트
4. 개발 완료 프로젝트
5. Footer

기술 스택, AI-assisted workflow, 자동 갱신 정보, SVG 프로젝트 카드 섹션은 화면에
표시하지 않습니다. 자동 생성 정보와 마지막 갱신 시간은 HTML 주석으로만 남깁니다.

## 주요 파일

- `README.template.md`: 최소 README 구조와 placeholder를 정의합니다.
- `README.md`: GitHub 프로필에 표시되는 생성 결과물입니다.
- `src/projects.ts`: Hero, About Me, 프로젝트 데이터를 관리합니다.
- `src/renderer.ts`: Hero, About Me, 상태별 프로젝트 table, Footer, 숨김 주석을 렌더링합니다.
- `src/svg/generateProjectCards.ts`: 보조 SVG 파일을 계속 생성합니다.
- `assets/generated/project-cards.svg`: README 본문에는 표시하지 않는 보조 생성물입니다.
- `.github/workflows/update-profile.yml`: README와 생성 asset을 자동 갱신합니다.

## 생성 흐름

1. `src/index.ts`가 `profileConfig`와 `featuredProjects`를 읽습니다.
2. `src/svg/generateProjectCards.ts`가 보조 SVG 파일을 생성합니다.
3. `src/renderer.ts`가 `README.template.md`의 placeholder를 치환합니다.
4. 최종 결과를 `README.md`로 저장합니다.

## 프로젝트 상태별 렌더링

`featuredProjects`의 `status` 값으로 table 표시 위치를 나눕니다.

- `in_progress`: `개발 중인 프로젝트` table에 표시됩니다.
- `completed`: `개발 완료 프로젝트` table에 표시됩니다.

링크가 확실한 프로젝트만 `isPublic: true`, `displayUrl: true`로 두면 clickable 링크로
표시됩니다. 그 외 프로젝트는 일반 텍스트로 표시됩니다.

## 자동 생성 정보

자동 생성 안내와 마지막 갱신 시간은 README 상단 HTML 주석에만 들어갑니다.
GitHub 렌더링 화면에는 보이지 않습니다.

## SVG 처리

`assets/generated/project-cards.svg`는 생성 기능 검증과 향후 재사용을 위해 유지합니다.
다만 현재 README 본문이나 `<details>`에는 삽입하지 않습니다. 프로필 화면에서는
Markdown table이 주 UI입니다.
