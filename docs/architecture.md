# Profile Dashboard Architecture

이 저장소는 `jeongiryang/jeongiryang` GitHub 프로필 README 전용 저장소입니다.
README는 직접 수정하지 않고 TypeScript generator로 생성합니다.

## README 표시 구조

현재 README의 화면 표시 순서는 다음과 같습니다.

1. Hero
2. About Me
3. 개발 완료 프로젝트
4. 개발 중인 프로젝트
5. 수업 과제 아카이브
6. Footer

자동 갱신 정보는 HTML 주석으로만 남기며, 기술 스택 독립 섹션, Education, SVG 카드,
AI-assisted workflow 독립 섹션은 README 본문에 표시하지 않습니다.

## 프로젝트 분류

`src/projects.ts`의 `section` 필드가 README 표시 위치를 결정합니다.

- `completed`: 개발 완료 프로젝트
- `in_progress`: 개발 중인 프로젝트
- `coursework`: 수업 과제 아카이브

개발 완료/개발 중 프로젝트 table에는 `미리보기` 열이 있습니다. 수업 과제 아카이브에는
사진 열을 넣지 않습니다.

## 주요 파일

- `README.template.md`: README 섹션 순서와 placeholder를 정의합니다.
- `README.md`: 생성 결과물입니다.
- `src/projects.ts`: 프로필 문구, 프로젝트 분류, 링크 정책, 미리보기 이미지 경로를 관리합니다.
- `src/renderer.ts`: 상태별 table과 preview image HTML을 렌더링합니다.
- `src/svg/generateProjectCards.ts`: 보조 SVG 생성 기능을 유지합니다.
- `assets/previews/`: README table에 표시할 preview 이미지를 보관합니다.
- `assets/previews/inbox/`: 아직 매핑하지 않은 임시 입력 이미지를 둘 수 있는 폴더입니다.

## Preview 이미지 정책

`previewImage`가 있으면 README table에 다음 형태로 렌더링됩니다.

```html
<img src="assets/previews/cwnu-campus-hub.png" width="180" alt="CWNU Campus Hub 미리보기" />
```

`previewImage`가 비어 있으면 `-`로 표시합니다. 외부 이미지 호스팅은 사용하지 않습니다.

## 링크 정책

공개가 확인된 repository만 clickable link로 표시합니다.
Private repository는 `isPrivate: true` 또는 `isPublic: false`로 두고 링크하지 않습니다.

현재 README 프로젝트 목록에서 제외하는 repository:

- `jeongiryang`
- `Turtle-Hwan`
- `GitHub_Practice`
- `Coding_Study_Note`

## SVG 처리

`assets/generated/project-cards.svg`는 생성 기능 검증과 향후 재사용을 위해 유지합니다.
다만 README 본문이나 `<details>`에는 삽입하지 않습니다.
