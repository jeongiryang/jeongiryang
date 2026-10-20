# 프로필 구조

프로젝트 데이터로 README를 생성하고, 그 README를 그대로 HTML 포트폴리오로 변환한다.

## 화면 구성

1. Capsule Render 배너와 Portfolio 바로가기.
2. `Projects`: WAVE를 첫 행에, 나머지 대표작 4개를 두 열로 배치. 실제 배포 GIF와 Code·Demo 링크.
3. `Stack`: Skill Icons 기술 아이콘.
4. `GitHub`: stats, contribution snake, 접힌 `Code` 차트.
5. 접힌 과제·실험과 진행 중 목록.

GitHub 프로필은 Markdown과 제한된 HTML을 사용한다. [HTML 포트폴리오](https://jeongiryang.github.io/jeongiryang/)는 같은 README에 [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)의 기본 스타일을 적용한다. 시스템 설정에 따라 light/dark가 바뀐다. 별도 프로젝트별 버전 라벨은 표시하지 않는다.

## 생성 흐름

| 단계 | 입력 | 출력 |
|---|---|---|
| `npm run collect` | 공개 API, 선정 저장소의 HEAD, 검증한 cloc 2.10 | `assets/generated/source-metrics.json` |
| stats / snk Action | 공개 통계 / GitHub 기여 달력 | light/dark stats·snake SVG |
| README 생성 | `src/projects.ts`, `README.template.md`, `src/renderer.ts` | `README.md` |
| 코드 규모 카드 | 기존 측정 JSON | light/dark `source-scale` SVG |
| HTML 생성 | README, markdown-it 15.0.3, github-markdown-css 5.9.0 | `site/index.html`, CSS·라이선스·미디어 |
| Pages 배포 | 검증한 `site/` artifact | HTML 포트폴리오 |

`generate`는 수집과 분리되어 있다. 커밋된 Capsule 배너·stats·snake와 실제 측정 JSON을 사용하며 외부 서버에 새 이미지를 요청하지 않는다. Capsule 배너의 공식 요청 URL은 [출처 파일](../assets/generated/capsule-header-source.json)에 남긴다.

## 주요 파일

| 파일 | 역할 |
|---|---|
| [`src/projects.ts`](../src/projects.ts) | 공개 프로젝트·순서·기술·링크·GIF·측정 대상 |
| [`README.template.md`](../README.template.md) | README 섹션과 placeholder |
| [`src/renderer.ts`](../src/renderer.ts) | 공개 필터, 갤러리·접기·테마 이미지 |
| [`src/source-metrics.ts`](../src/source-metrics.ts) | HEAD 검증, 소스 수집, snapshot, 코드 규모 카드 |
| [`src/site.ts`](../src/site.ts) | markdown-it 변환, 기본 CSS와 미디어 복사 |
| [`src/index.ts`](../src/index.ts) | 수집·생성 진입점 |
| [`scripts/verify.mjs`](../scripts/verify.mjs) | 공개 대상·측정값·GIF 기록·로컬 자산·SVG 검증 |
| [갱신 워크플로](../.github/workflows/update-profile.yml) | 예약 수집·생성·검증·커밋·Pages 배포 |

`assets/previews/`에는 실제 배포 GIF와 [촬영 기록](../assets/previews/capture-manifest.json)을 둔다. `assets/generated/`에는 측정 JSON, 외부 도구가 만든 SVG와 출처 파일을 둔다. `site/`는 배포용 생성물이므로 직접 편집하지 않는다. 기존 `src/svg/workshop.ts`와 `project-cards.svg`는 현재 생성·표시에 사용하지 않는다.

## 수집과 실패 처리

공개 목록은 본인 계정 URL과 공개 플래그로 제한한다. 수집기는 GitHub API에서 소유자 `jeongiryang`, `private: false`, `fork: false`를 다시 확인한다. 측정은 선정한 원본 7개의 기본 브랜치 HEAD를 기준으로 한다. 확장자·경로·파일명·크기 기준과 수치의 범위는 [코드 규모](setup.md#코드-규모)에 기록한다.

모든 대상 수집이 성공한 뒤 snapshot을 교체한다. 하나라도 실패하면 이전 snapshot을 보존하고 게시를 중단한다. 동일한 측정 내용은 측정일을 바꾸지 않는다.

stats·snake의 일시 실패 때는 남아 있는 정상 SVG를 검증해 사용한다. 파일 누락이나 검증 실패 때는 커밋·Pages 게시를 중단한다. stats는 오류 카드를 저장하지 않도록 `fail_on_error: true`로 설정한다.

인증은 기본 `GITHUB_TOKEN`과 Pages OIDC를 사용한다. Action SHA, stats core, cloc 버전·checksum은 워크플로에 고정하고 HTML용 두 라이브러리는 정확한 npm 버전과 lock 파일로 고정한다. CSS 원본 MIT 라이선스는 배포 artifact에 포함한다. Shields와 Skill Icons는 외부 이미지 endpoint를 사용한다.
