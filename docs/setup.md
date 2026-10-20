# 프로필 설정과 갱신

이 저장소는 프로젝트 데이터와 템플릿으로 GitHub 프로필 README를 만들고, 같은 README를 [HTML 포트폴리오](https://jeongiryang.github.io/jeongiryang/)로 변환한다. `README.md`와 `site/`는 생성 결과다.

## 로컬 실행

Node.js 24와 npm을 권장한다. 패키지의 최소 Node 버전은 20이며, GitHub Actions는 24를 사용한다.

```bash
npm ci
npm test
npm run check
```

| 명령 | 하는 일 |
|---|---|
| `npm run build` | TypeScript를 `dist/`에 컴파일 |
| `npm run collect` | 선정한 공개 원본의 HEAD 소스 규모를 수집 |
| `npm run generate` | 기존 자산·측정값으로 README, 코드 규모 SVG, HTML 사이트 생성 |
| `npm test` | 생성기와 측정 기준 테스트 |
| `npm run check` | build → generate → 공개 대상·이미지·SVG·측정값 검증 |

일반 문구·화면 수정에는 이미 커밋된 측정 JSON과 stats·snake SVG를 사용한다. `generate`와 `check`가 외부 stats·snake를 새로 수집하지는 않는다. 최초 자산이 없는 상태에서는 Actions로 정상 자산을 먼저 생성해야 한다.

## 수정 위치

| 파일·폴더 | 수정할 내용 |
|---|---|
| [`src/projects.ts`](../src/projects.ts) | 프로젝트 소개·순서·기술·링크·GIF, 분류와 측정 대상 |
| [`README.template.md`](../README.template.md) | README 섹션 순서와 고정 문구 |
| [`src/renderer.ts`](../src/renderer.ts) | GitHub에서 표시할 갤러리·접기·이미지 HTML |
| [`assets/generated/capsule-header-source.json`](../assets/generated/capsule-header-source.json) | Capsule Render 공식 배너 URL과 출처 |
| [`src/source-metrics.ts`](../src/source-metrics.ts) | 소스 수집 기준과 코드 규모 SVG |
| [`src/site.ts`](../src/site.ts) | README를 HTML로 변환하고 CSS·이미지 복사 |
| [`assets/previews/`](../assets/previews/) | 실제 배포 화면을 촬영한 GIF |

`section`은 대표작(`completed`), 과제·실험(`assignment`), 진행 중(`in_progress`)을 구분한다. `priority`가 작을수록 먼저 나온다. 대표작은 WAVE, CBT OMR Tester, 사각사각, CWNU Community, CWNU Smart Portal 순서이며, WAVE를 첫 행 전체 너비로 표시한다. Campus Hub와 3AM은 공개 갤러리에서 제외한다.

`previewImage`와 `previewAlt`에 실제 GIF 경로와 화면 설명을 넣는다. 촬영일과 장면은 촬영 기록에 남긴다. `demoUrl`은 배포 주소다. 프로젝트 버전은 프로필 카드에 표시하지 않는다.

공개 목록은 `isPublic: true`, `isPrivate: false`와 본인 GitHub URL을 만족해야 한다. 비공개 작업이나 참고용 포크를 공개 작품으로 추가하지 않는다. 코드 수집 단계는 GitHub API로 소유자·공개 여부·포크 여부를 다시 확인한다.

## 배너와 HTML

상단 배너는 [Capsule Render](https://github.com/kyechan99/capsule-render)의 공식 endpoint에서 받은 `assets/generated/capsule-header.svg`다. 다시 받을 URL은 `capsule-header-source.json`에 기록한다. 색상·문구를 바꾸려면 공식 URL의 옵션을 수정하고 SVG와 출처 파일을 함께 갱신한다. 일반 `generate`는 배너를 새로 요청하지 않는다.

HTML 사이트는 [markdown-it](https://github.com/markdown-it/markdown-it) 15.0.3으로 README를 변환하고, [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) 5.9.0의 기본 `github-markdown.css`를 사용한다. 운영체제의 light/dark 설정에 따라 전환된다. 두 npm 의존성은 정확한 버전과 lock 파일로 고정한다. CSS 원본과 MIT 라이선스는 `site/assets/vendor/`에 함께 복사한다.

README의 표·이미지 크기에 필요한 최소 스타일만 `src/site.ts`에서 지정한다. 프로필과 사이트의 본문·프로젝트 순서·GIF는 같다.

## 실제 화면

대표작에는 실제 배포된 사이트에서 촬영한 GIF만 쓴다. 접근하지 못한 기능을 만든 화면이나 콘셉트 이미지로 대신하지 않는다. 로그인 전 소개만 촬영했다면 캡션에도 그 범위를 적는다.

현재 연결한 파일은 `wave-live.gif`, `cbt-omr-tester-live.gif`, `sagaksagak-live.gif`, `community-live.gif`, `smart-portal-live.gif`다. 모두 `assets/previews/`에 두며 README와 HTML 사이트가 같은 파일을 사용한다. 촬영 URL·시각·장면·크기·SHA256은 [capture-manifest.json](../assets/previews/capture-manifest.json)에 기록한다. 새 GIF를 추가할 때는 촬영 기록을 함께 갱신한다.

## 코드 규모

`Code` 접기 안에는 선정한 공개 원본 저장소의 현재 소스 규모를 표시한다. 대상은 WAVE, CBT OMR, 사각사각, CWNU Community, Smart Portal, OpenGL House, DFS Animation의 7개이며 `measureSource: true`로 선택한다. 팀 전체 소스를 포함하는 HEAD 기준 집계로, 개인 작성량·작업 시간·누적 수정량을 집계하지 않는다.

각 저장소의 기본 브랜치 HEAD를 확인한 뒤 shallow·partial clone과 sparse checkout으로 필요한 소스만 읽는다. 내려받은 저장소의 설치·빌드·실행 스크립트는 실행하지 않는다. 신뢰한 cloc 2.10 Perl 스크립트만 실행한다.

- 포함 확장자: `js jsx ts tsx py c cpp h hpp html css scss sql prisma gd vert frag glsl`.
- 제외 폴더: `.git`, `node_modules`, `vendor`, `dist`, `build`, `coverage`, 생성물·외부 의존성 폴더와 GLAD·STB·GLM·GLEW·GLFW·ImGui 등. 전체 목록은 수집기 소스를 따른다.
- minified·bundle·generated 이름 패턴, 알려진 외부 헤더, 심볼릭 링크와 2 MiB 초과 파일도 제외한다. lock 파일·문서·이미지는 포함 확장자가 아니므로 집계하지 않는다.
- 제외는 경로·파일명 기준이다. 모든 외부 코드와 생성물을 내용 분석으로 완벽히 판별하는 지표는 아니다.

[`assets/generated/source-metrics.json`](../assets/generated/source-metrics.json)에 도구 버전, 측정일, 저장소 이름, 40자리 HEAD SHA, 코드·주석·빈 줄·파일 수와 언어별 값을 남긴다. HEAD가 같으면 이전 측정값을 재사용하지만 공개 여부는 다시 확인한다. 측정 내용이 같으면 `measuredAt`을 바꾸지 않는다. 모든 대상의 수집이 성공한 뒤 JSON을 교체하며, 하나라도 실패하면 이전 snapshot을 보존하고 워크플로를 실패시킨다.

로컬에서 다시 수집하려면 Git, Perl 5.10 이상과 공식 cloc 2.10 `.pl` 파일이 필요하다. `CLOC_SCRIPT`에 그 파일의 절대 경로를 지정한다. `CLOC_PERL`은 선택 사항이며 기본값은 `perl`이다. `PROFILE_SOURCE_CACHE`는 선택한 수집 폴더이며 기본값은 저장소 밖 `../profile-source-cache`다. 재수집은 새 임시 디렉터리를 사용하고 기존 checkout을 덮거나 삭제하지 않는다.

```powershell
# 공식 cloc 2.10 파일을 준비하고 경로를 지정한 뒤 실행한다.
$env:CLOC_SCRIPT = (Resolve-Path "C:\tools\cloc-2.10.pl").Path
npm run collect
npm run check
```

Actions는 [공식 v2.10 릴리스](https://github.com/AlDanial/cloc/releases/tag/v2.10) 파일을 받아 SHA256 `bf59272455172108072a0a106379f7509fd4349bdcfd85203bac038ccd286d83`을 검증한다. npm 동명 패키지나 운영체제의 다른 버전으로 대체하지 않는다. Windows Perl 환경에서 모듈 충돌이 발생하면 측정을 성공한 것처럼 기록하지 않고 Ubuntu Actions 실행을 확인한다.

## 자동 갱신과 게시

[`update-profile.yml`](../.github/workflows/update-profile.yml)은 수동 실행, 관련 파일의 main push, 매일 한국 시간 03:17에 실행된다. 소스 수집 → stats·snake 생성 → 테스트·검증 → 생성물 커밋 → GitHub Pages 배포 순서다. 생성 내용이 달라졌을 때만 `README.md`와 `assets/generated/`를 커밋한다.

공개 데이터 조회와 생성물 커밋에는 GitHub가 제공하는 `GITHUB_TOKEN`만 쓴다. 개인 PAT, WakaTime 계정·API key, 별도 통계 호스팅 계정은 필요 없다. Pages 배포는 기본 OIDC 권한을 사용하며, 저장소 Settings → Pages의 배포 소스는 GitHub Actions로 설정한다.

stats는 고정한 Action SHA와 core 2.2.1로 저장소 내부 SVG를 만든다. light는 기본 테마, dark는 `tokyonight`를 사용한다. snake도 고정한 SVG-only Action SHA를 쓴다. stats의 오류 응답은 `fail_on_error: true`로 파일에 저장하지 않는다. 외부 SVG 생성이 실패해도 이전 정상 파일이 남아 있으면 검증 후 재사용한다. 파일이 없거나 SVG 검증에 실패하면 게시하지 않는다. 소스 수집 실패는 후속 생성·게시를 중단한다.

검증은 공개 측정 대상, HEAD 형식, GIF 촬영 기록·해시·URL, README·사이트의 로컬 이미지와 생성 SVG를 확인한다. 배포 서비스의 전체 기능 검사는 별도로 수행한다. snk는 GitHub 기여 달력을 사용하며, 기여 수와 커밋 수는 다른 지표다.

도구 선정과 라이선스는 [프로필 도구 상자](profile-toolbox.md), 전체 구조는 [구조 안내](architecture.md), 일상 수정 순서는 [빠른 사용법](profile-readme-quick-guide.md)을 참고한다.
