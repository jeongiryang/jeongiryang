# 프로필 빠른 수정

프로젝트 정보는 `src/projects.ts`, README 구조는 `README.template.md`와 `src/renderer.ts`에서 바꾼다. `README.md`와 `site/`는 생성 결과다. 상세 설정과 수집은 [설정 안내](setup.md)를 따른다.

## 작업 시작

먼저 현재 변경을 확인한다. 작업 파일이 남아 있으면 보존한 상태에서 정리한 뒤 브랜치를 전환한다.

```bash
git status -sb
git fetch origin
```

작업 트리가 깨끗하고 main에서 시작할 때:

```bash
git switch main
git pull --ff-only origin main
git switch -c docs/update-workshop
npm ci
```

브랜치가 갈라졌거나 로컬 수정이 있으면 자동으로 덮지 않고 차이를 먼저 확인한다.

## 내용과 화면 수정

`src/projects.ts`에서 설명·결과·기술·상태·역할·공개 링크를 고친다. 대표작 순서는 `priority`, 분류는 `section`으로 관리한다. 현재 WAVE가 첫 대표작이다.

화면은 실제 배포 사이트에서 촬영한 GIF를 `assets/previews/`에 넣고 다음 세 필드를 함께 수정한다.

```ts
previewImage: "assets/previews/wave-live.gif",
previewAlt: "WAVE 실제 배포 화면: 여행 설계와 관광지 편의정보",
previewCaption: "실제 배포 화면 · 촬영한 기능과 날짜"
```

새 파일명은 실제 파일과 맞춘다. [촬영 기록](../assets/previews/capture-manifest.json)의 URL·시각·장면·크기·SHA256도 함께 갱신한다. 검증기는 실제 GIF와 기록의 해시 및 배포 URL이 같은지 확인한다. 로그인 전 화면만 확인했다면 그 범위를 캡션에 적는다. 팀 프로젝트의 결과를 개인 단독 성과로 바꾸지 않는다.

## 생성과 검증

```bash
npm run generate
npm test
npm run check
git diff --check
git diff --stat
git status -sb
```

README의 light/dark 이미지, GIF의 실제 내용, 링크와 HTML 제작실도 확인한다. `check`는 로컬 자산과 측정 snapshot을 검사하며, 배포 서비스의 전체 기능을 대신 검증하지 않는다.

문구·화면만 바꿀 때는 기존 측정값을 사용한다. 소스 규모의 대상이나 값을 갱신할 때는 [cloc 설정](setup.md#코드-규모)을 갖추고 `npm run collect`를 먼저 실행한다. 로컬 수집이 어렵다면 Actions 수동 실행으로 수집 결과를 확인한다. 수치나 날짜를 임의로 채우지 않는다.

## 검토할 변경 올리기

```bash
git diff -- src/projects.ts README.template.md src/renderer.ts README.md
git add src/projects.ts README.md
git commit -m "docs: 제작실 프로젝트 소개 갱신"
git push -u origin docs/update-workshop
```

위 `git add`는 데이터·README 수정 예시다. 실제로 고친 템플릿·소스·GIF·문서만 경로를 지정해 추가하고, 생성한 `assets/generated/`가 바뀌었다면 함께 검토한다. `site/`와 `dist/`는 워크플로에서 다시 만든다. PR에서 diff를 확인한 뒤 병합한다. main의 관련 파일이 바뀌면 워크플로가 갱신·검증·게시한다.

## 수정 취소

README를 직접 편집했다면 필요한 문구를 먼저 데이터나 템플릿으로 옮긴 뒤 `npm run generate`로 재생성한다. 재생성은 README의 수동 변경을 덮으므로 먼저 diff를 확인한다.

이미 게시한 변경을 취소할 때는 취소할 커밋을 확인한 뒤 별도 브랜치에서 `git revert <커밋 SHA>`로 취소 커밋을 만들고 PR로 검토한다. 진행 중인 로컬 파일과 원격 기록을 덮어쓰는 방식으로 복구하지 않는다.

## Codex 요청 예시

```text
src/projects.ts에서 프로젝트 소개와 실제 화면 경로를 수정해줘.
완성 상태와 팀 역할은 공개 근거를 유지하고,
README와 HTML 제작실은 generator로 다시 만들어줘.
npm test, npm run check, git diff --check를 실행하고 변경을 보여줘.
```

```text
공개 원본의 코드 규모를 갱신해줘.
고정한 cloc 2.10과 현재 수집 기준으로 npm run collect를 실행하고,
HEAD·제외 기준·측정일을 확인한 뒤 생성과 검증까지 해줘.
측정 실패 시 이전 정상 snapshot을 유지하고 임의 수치를 넣지 마.
```
