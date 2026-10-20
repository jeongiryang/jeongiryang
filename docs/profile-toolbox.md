# 프로필 도구 상자

기준일: **2026-10-20 KST**. 25개 후보의 공식 저장소·설정과 주요 이미지 endpoint 응답을 조사하고, 검색·블로그·YouTube 자료를 대조했다. 적용은 완성 결과물을 먼저 보여 주는 제작실 구성에 맞췄다. 별 수는 누적 인기 지표이며 최근 급상승 순위나 정상 동작의 보증이 아니다.

아래 **★ 16개는 jeongiryang 계정에서 실제 star를 확인한 저장소**다. star는 참고·보류 후보에도 남겼으며 실제 사용 여부와 구분한다.

## 실제 사용

| 도구 | 현재 사용 방식 | 확인한 인기·조건 |
|---|---|---|
| ★ [GitHub Stats Action](https://github.com/stats-organization/github-readme-stats-action) | 공개 GitHub stats를 저장소 내부 light/dark SVG로 생성 | 317 stars · 2026-10-19 push · 기본 `GITHUB_TOKEN` · MIT |
| ★ [GitHub Stats Extended](https://github.com/stats-organization/github-stats-extended) | 위 Action의 stats core 2.2.1 | 1,529 stars · 2026-10-17 push · MIT |
| ★ [Platane/snk](https://github.com/Platane/snk) | 실제 기여 달력을 SVG-only Action으로 시각화 | 6,140 stars · 2026-10-18 push · 기본 token · 명시 라이선스 미확인 |
| ★ [AlDanial/cloc](https://github.com/AlDanial/cloc) | 선정한 공개 원본 7개의 현재 HEAD 소스 규모 측정 | 23,607 stars · 2026-09-20 push · 공식 2.10 Perl 파일 · GPL-2.0 및 내장 모듈별 고지 |
| ★ [Shields](https://github.com/badges/shields) | HTML 제작실 바로가기 정적 배지 1개 | 27,277 stars · 2026-10-18 push · 추가 계정 불필요 · MIT / Apache-2.0 |
| ★ [Skill Icons](https://github.com/tandpfun/skill-icons) | 실제 사용 기술 아이콘 한 줄 | 13,294 stars · 2026-02-27 push · 추가 계정 불필요 · MIT |

유명 원본 [anuraghazra/github-readme-stats](https://github.com/anuraghazra/github-readme-stats)는 79,846 stars지만 유지보수 중단과 후속 프로젝트를 README에서 안내한다. 새 Action/core는 별 수가 더 적어도 **원본이 안내한 후속 경로**여서 선택했다. 공유 통계 URL을 그대로 붙이지 않고 고정 버전으로 SVG를 생성한다.

stats Action은 `2c498845f71017821efaad14293ebc736156ef21`, snake SVG-only Action은 `d8f6715049803e982ee5ff501b6b9b7d5deeb09b`로 고정했다. cloc는 공식 v2.10 파일과 SHA256을 확인한다. 실제 설정은 [워크플로](../.github/workflows/update-profile.yml)를 따른다. 라이선스와 실행 전제는 버전 변경 때 다시 확인한다. snk를 MIT로 표기하거나 소스를 복사해 재배포할 권리가 확인됐다고 주장하지 않는다.

stats·snake·코드 규모는 서로 다른 정보를 보여 준다. 기여 수는 커밋 수와 같지 않으며, 코드 규모는 팀 전체를 포함한 저장소 HEAD의 선택 소스 줄 수다. **개인 작성량·코딩 시간으로 소개하지 않는다.** [집계와 제외 기준](setup.md#코드-규모)

## 참고할 도구

| 후보 | 남겨 둔 용도 |
|---|---|
| ★ [awesome-github-profile-readme](https://github.com/abhisheknaiidu/awesome-github-profile-readme) | 다양한 실제 프로필의 구성·밀도를 비교하는 모음 |
| ★ [readme-typing-svg](https://github.com/DenverCoder1/readme-typing-svg) | 타이핑 헤더 대안. 현재 정적 헤더·snake 조합에는 추가하지 않음 |
| ★ [capsule-render](https://github.com/kyechan99/capsule-render) | 1,843 stars, 2026-10-16 push. 배너를 바꿀 때 우선 검토할 대안 |
| ★ [Devicon](https://github.com/devicons/devicon) | 개별 기술 SVG가 필요할 때. 현재는 Skill Icons를 사용 |
| ★ [Simple Icons](https://github.com/simple-icons/simple-icons) | 단색 브랜드 아이콘 대안. CC0와 개별 브랜드 지침 확인 필요 |
| [isometric-contributions](https://github.com/jasonlong/isometric-contributions) | 시각 표현 참고. 방문자 브라우저 확장 기능이어서 README 생성 자산과 다름 |
| [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes) | 글·프로젝트 상세가 커질 때 Jekyll 구조 참고 |
| ★ [modern-resume-theme](https://github.com/sproogen/modern-resume-theme) | 이력서형 정보 구조 참고. 마지막 push가 2024-06-15라 신규 설치 전 의존성 재검토 |

맞춤 제작실 헤더는 자체 SVG로 구현했다. Capsule이나 typing 헤더를 겹치기보다 결과 화면을 주역으로 두고, 자유로운 HTML/CSS 표현은 [Pages 제작실](https://jeongiryang.github.io/jeongiryang/) 바로가기로 연결한다. 현재 사이트는 별도 Jekyll·React 템플릿을 설치하지 않고 같은 데이터에서 정적 HTML로 생성한다.

## 이번에는 보류

| 후보 | 이유 |
|---|---|
| ★ [lowlighter/metrics](https://github.com/lowlighter/metrics) | 풍부한 패널이 있지만 공식 Action 설치가 PAT를 요구. 현재 추가 secret 없는 범위에 불필요 |
| [옛 github-readme-stats](https://github.com/anuraghazra/github-readme-stats) | 유명 원본이 유지보수 중단을 명시하여 후속 Action/core 채택 |
| [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats) | 동작 후보지만 stats·기여 달력 외 지표를 더 늘리지 않음 |
| ★ [github-profile-3d-contrib](https://github.com/yoshi389111/github-profile-3d-contrib) | 1,781 stars, 2026-10-18 push. snake와 같은 기여 달력을 중복 표현 |
| ★ [waka-readme](https://github.com/athul/waka-readme) | WakaTime 계정·에디터 플러그인·API key가 필요. 별도 시간 기록 목적이 없어 미적용 |
| ★ [waka-readme-stats](https://github.com/anmol098/waka-readme-stats) | WakaTime key와 문서화된 PAT 설정이 필요. 시간·누적 수정량은 현재 HEAD 소스 규모와 다름 |
| [jstrieb/github-stats](https://github.com/jstrieb/github-stats) | 공식 설치가 넓은 권한의 classic PAT를 요구. 공개 작품 전시에 과한 범위 |
| [github-readme-activity-graph](https://github.com/Ashutosh00710/github-readme-activity-graph) | 확인 당시 공식 README의 기본 공유 endpoint가 HTTP 402, SVG 아님 |
| [blog-post-workflow](https://github.com/gautamkrishnar/blog-post-workflow) | 자동 표시할 공개 RSS/Atom feed를 선정하지 않음 |
| [developerFolio](https://github.com/saadpasta/developerFolio) | 마지막 push 2024-12-16. 별도 프런트 의존성을 추가할 필요가 작음 |
| [github-profile-trophy](https://github.com/ryo-ma/github-profile-trophy) | 확인 당시 기본 공유 endpoint가 HTTP 402, SVG 아님. 결과물보다 상패 수가 앞서지 않도록 보류 |

이날 Skill Icons·Shields·Capsule·typing·새 stats·streak 등의 요청은 200 SVG였다. 한 번의 응답은 장기 가용성 보장이 아니다. 옛 stats도 200이었지만 유지보수 상태와 구분했다. 기본 공유 서버의 실패를 도구 전체 소스나 자가 호스팅 불가로 확대하지 않는다.

## 검색·블로그·YouTube에서 확인한 범위

| 자료 | 직접 확인한 내용 |
|---|---|
| [SitePoint — GitHub Profile README](https://www.sitepoint.com/github-profile-readme/) | 본문 최초 2022-01-26, 갱신 2026-10-12. Shields·DevIcons·stats 사례를 확인. 남은 옛 endpoint 예제는 공식 저장소와 재대조 |
| [Vivek — GitHub terminal profile](https://vulabs.dev/posts/github-terminal-profile-readme/) | 본문 2026-07-13. Skill Icons·Shields·typing·streak와 공유 서버 장애 경험 확인 |
| [Adrij — Agentic-era profile README](https://adrijshikhar.dev/blogs/building-an-agentic-era-profile-readme/) | 본문 2026-05-31. snk light/dark SVG와 직접 계산한 공개 GitHub 지표 사례 확인 |
| [NextWork — Standout GitHub Profile README](https://www.youtube.com/watch?v=lfVVm5K-Xp0) | 공식 oEmbed에서 채널과 현재 제목의 “Step by Step Guide 2026” 확인. watch 본문은 429여서 게시일·조회수·영상 내용 미검증 |
| [Digitaley Drive — Level up your GitHub profile in 2025](https://www.youtube.com/watch?v=xg52sWC9DKA) | 공식 oEmbed에서 제목·채널 확인. watch 본문 조회 실패로 게시일·조회수·영상 내용 미검증 |

검색 인덱스에서 후보를 찾고 열람 가능한 원문을 확인했다. YouTube 검색 snippet의 조회수나 오래된 제목을 검증된 근거로 쓰지 않았다. 디자인 아이디어는 폭넓게 참고하되 실제 설치·권한·버전은 공식 문서와 소스를 기준으로 삼았다.

## 유지보수 기준

새 도구는 실제 결과물 탐색을 돕는지 먼저 본다. 계정·PAT·플러그인을 추가해야 하는 기능은 목적이 생길 때 검토한다. 외부 stats·snake 생성이 실패하면 남은 정상 자산을 검증해 사용하며, 최초 자산 누락이나 검증 실패 때는 게시를 중단한다. 소스 수집 실패도 게시를 중단하고 이전 snapshot을 보존한다. 현재 구성에는 기본 `GITHUB_TOKEN` 외의 추가 비밀값이 없다. [설정과 실패 처리](setup.md#자동-갱신과-게시)
