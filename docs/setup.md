# Setup

## 로컬 요구사항

- Node.js 20 이상
- npm

## 설치와 실행

```bash
npm install
npm run build
npm run generate
npm run check
```

- `build`: TypeScript 컴파일
- `generate`: `README.md`와 `assets/generated/project-cards.svg` 생성
- `check`: build와 generate를 순차 실행

## README 수정 위치

README 본문은 직접 수정하지 않고 `src/projects.ts`와 `README.template.md`를 수정한 뒤
다시 생성합니다.

- Hero 이름/학년: `profileConfig.name`, `profileConfig.role`
- About Me note: `profileConfig.aboutNote`
- About Me bullet: `profileConfig.aboutBullets`
- 프로젝트 목록: `featuredProjects`

자동 생성 안내와 마지막 갱신 시간은 `src/renderer.ts`의 숨김 HTML 주석으로만 출력됩니다.
화면에는 `자동 갱신 정보` 섹션이 표시되지 않습니다.

## 프로젝트 데이터

`featuredProjects` 항목은 README table에 바로 들어가므로 짧게 유지합니다.

- `name`: 표시 제목
- `description`: 한 줄 요약
- `stack`: 개발 중 프로젝트에 표시할 핵심 기술 2~3개
- `status`: `in_progress` 또는 `completed`
- `priority`: 정렬 순서
- `url`: GitHub URL
- `result`: 완료 프로젝트의 핵심 결과
- `isPublic`, `displayUrl`: 링크 표시 여부

링크가 확실하지 않으면 `displayUrl: false`로 두면 됩니다.

## 표시 섹션

현재 README 화면에는 다음만 표시됩니다.

- Hero
- About Me
- 개발 중인 프로젝트
- 개발 완료 프로젝트
- Footer

기술 스택, Education, AI-assisted workflow 독립 섹션, 자동 갱신 정보, SVG 카드는
표시하지 않습니다.

## SVG 파일

`assets/generated/project-cards.svg`는 계속 생성됩니다. 하지만 README 본문에는 삽입하지
않습니다. 향후 별도 시각 자료가 필요할 때 재사용할 수 있는 보조 생성물입니다.

## GitHub Actions

`.github/workflows/update-profile.yml`은 수동 실행과 하루 1회 schedule 실행을 지원합니다.
변경사항이 있을 때만 generated README와 SVG를 커밋합니다.
