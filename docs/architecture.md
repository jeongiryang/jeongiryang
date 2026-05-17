# Profile Dashboard Architecture

이 저장소는 `jeongiryang/jeongiryang` GitHub 프로필 README 전용 저장소입니다.
README는 직접 수정하지 않고 TypeScript generator로 생성합니다.

## README 표시 구조

현재 README에서 화면에 보이는 섹션은 다음 순서입니다.

1. Hero
2. About Me
3. 개발 완료
4. 개발 중
5. 완료한 과제

자동 생성 정보는 HTML 주석으로만 남깁니다. 기술 스택 독립 섹션, Education,
자동 갱신 정보, SVG 카드, footer 감사 문구는 README 본문에 표시하지 않습니다.

## 프로젝트 분류

`src/projects.ts`의 `section` 필드가 README 표시 위치를 결정합니다.

- `completed`: `개발 완료`
- `in_progress`: `개발 중`
- `assignment`: `완료한 과제`

`개발 완료` table만 미리보기 이미지를 사용합니다. `개발 중` table은 `프로젝트 / 요약`,
`완료한 과제` table은 `과제 / 요약 / 기술`만 표시합니다.

## 주요 파일

- `README.template.md`: README 섹션 순서와 placeholder를 정의합니다.
- `README.md`: 생성 결과물입니다.
- `src/projects.ts`: About Me 문구, 프로젝트 분류, 링크 정책, 미리보기 이미지 경로를 관리합니다.
- `src/renderer.ts`: 섹션별 Markdown table과 preview image HTML을 렌더링합니다.
- `src/svg/generateProjectCards.ts`: 보조 SVG 생성 기능을 유지합니다.
- `assets/previews/`: 개발 완료 프로젝트 preview 이미지를 보관합니다.
- `assets/previews/inbox/`: 아직 매핑하지 않은 임시 입력 이미지를 둘 수 있는 폴더입니다.

## Preview 이미지 정책

`previewImage`가 있는 개발 완료 프로젝트는 README table에 다음 형태로 렌더링됩니다.

```html
<img src="assets/previews/todo-app-mini-project.png" width="280" alt="Todo 리스트 미니 프로젝트 미리보기" />
```

이미지 width는 `280`으로 고정합니다. `previewImage`가 비어 있으면 `-`로 표시합니다.
외부 이미지 호스팅은 사용하지 않습니다.

## 링크 정책

공개가 확인된 repository만 clickable link로 표시합니다.
Private repository는 `isPrivate: true` 또는 `isPublic: false`로 두고 링크하지 않습니다.

현재 README 프로젝트/과제 table에서 제외하는 repository:

- `jeongiryang`
- `Turtle-Hwan`
- `GitHub_Practice`
- `Coding_Study_Note`

## SVG 처리

`assets/generated/project-cards.svg`는 생성 기능 검증과 향후 재사용을 위해 유지합니다.
다만 README 본문이나 `<details>`에는 삽입하지 않습니다.
