# 실제 배포 화면 GIF

2026-10-20 KST에 각 배포 사이트를 새 브라우저 세션으로 열어 직접 조작하고 촬영했다. 화면 크기는 1280×800이며, 캡처한 프레임을 축소·팔레트 변환해 GIF로 인코딩했다. 기존 저장소 이미지, 로컬 재현 화면, 합성 UI는 사용하지 않았다.

| GIF | 실제 촬영한 장면 | 배포 사이트 |
|---|---|---|
| [WAVE](wave-live.gif) | 홈 → 여행 설계·지역 선택 → 관광지 목록 → 상세·이용과 편의 | [WAVE](https://wave-barrier-free-gyeongnam.vercel.app/) |
| [CBT OMR](cbt-omr-tester-live.gif) | 시험 설정 → 답안 마킹 → 10문항 중 8개 정답·80점 채점 | [CBT OMR](https://cbt-omr-tester.vercel.app/) |
| [사각사각](sagaksagak-live.gif) | 로그인 전 공개 랜딩과 서비스 소개 | [사각사각](https://sagaksagak-smart-edu.vercel.app/) |
| [Community](community-live.gif) | 공개 대시보드 → 게시판 목록 → 공지·댓글 읽기 | [Community](https://cwnu-community.vercel.app/) |
| [Smart Portal](smart-portal-live.gif) | 메인 → 학점계산기 → 예시 과목 입력·평점 계산 | [Smart Portal](https://todo-app-mini-project-20222017.vercel.app/) |

사각사각 GIF는 공개 소개 화면이다. 로그인 후 대시보드·학습 기능을 실행한 장면으로 소개하지 않는다. CBT 답안과 Smart Portal 과목은 시연용 예시다. 게시글 작성이나 계정 생성은 하지 않았다.

촬영 시각(UTC), URL, 장면, 크기, 재생 시간과 파일 SHA-256은 [capture-manifest.json](capture-manifest.json)에 기록했다. GIF는 촬영 당시 배포 상태를 보여 주며 현재 상태와 달라질 수 있다. 교체할 때는 실제 배포 화면을 다시 촬영하고 기록을 함께 갱신한다.

이전 PNG와 작업 로그는 과거 기록이며 현재 프로필 미리보기로 사용하지 않는다. 이전의 큰 GIF 두 개는 새 촬영본으로 교체했다.
