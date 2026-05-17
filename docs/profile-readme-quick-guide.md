# Profile README Generator 빠른 사용법

## 핵심 규칙

- `README.md`는 직접 수정하지 않는다.
- 프로젝트 정보는 `src/projects.ts`에서 수정한다.
- README 구조는 `README.template.md`와 `src/renderer.ts`에서 수정한다.
- 스크린샷/GIF는 `assets/previews/`에 넣는다.
- 수정 후 `npm run generate`로 `README.md`를 다시 생성한다.
- 검증은 `npm run check`로 한다.

## 1. main 최신화

```bash
git fetch --all --prune
git checkout main
git reset --hard origin/main
git status -sb
```

예상 예시:

```bash
## main...origin/main
```

## 2. 의존성 설치

```bash
npm install
```

## 3. 프로젝트 정보 수정

프로젝트 이름, 설명, 기술, 링크, 미리보기 이미지는 `src/projects.ts`에서 수정한다.

예시:

```ts
previewImage: "assets/previews/todo-app-mini-project.gif"
```

## 4. 스크린샷/GIF 교체

루트에 있는 GIF를 preview 폴더로 옮기는 예시:

```bash
mv todo-preview.gif assets/previews/todo-app-mini-project.gif
```

그다음 `src/projects.ts`에서 경로를 바꾼다.

```ts
previewImage: "assets/previews/todo-app-mini-project.gif"
```

## 5. README 다시 생성

```bash
npm run generate
```

## 6. 전체 검증

```bash
npm run check
git diff --check
git status -sb
```

## 7. 변경사항 확인

```bash
git diff
git status -sb
```

## 8. 커밋/푸시

```bash
git add .
git commit -m "chore: update profile README"
git push origin main
```

## 9. 브랜치로 작업하는 경우

```bash
git checkout -b feature/update-profile-readme
npm run generate
npm run check
git add .
git commit -m "chore: update profile README"
git push -u origin feature/update-profile-readme
```

## 10. 실수했을 때

### `README.md`만 실수로 수정한 경우

```bash
git restore README.md
npm run generate
```

### 방금 커밋을 되돌려야 하는 경우

```bash
git reset --hard HEAD~1
git push --force-with-lease
```

주의: 이 명령은 최근 커밋을 되돌리고 원격 기록을 바꾼다. 반드시 혼자 쓰는 브랜치에서만 사용한다.

## 11. Codex에게 요청할 때 예시

```txt
README.md는 직접 수정하지 말고 generator 구조를 수정해줘.
src/projects.ts에서 프로젝트 데이터를 수정하고,
src/renderer.ts에서 렌더링 구조를 반영한 뒤,
npm run generate와 npm run check까지 실행해줘.
```

```txt
todo-app preview를 GIF로 교체해줘.
루트에 있는 todo 관련 gif를 assets/previews/todo-app-mini-project.gif로 옮기고,
src/projects.ts의 previewImage 경로를 .gif로 수정해줘.
README.md는 generator로 재생성하고 npm run check까지 검증해줘.
```

## 한 줄 요약

`src/projects.ts` 수정 → `npm run generate` → `npm run check` → commit/push
