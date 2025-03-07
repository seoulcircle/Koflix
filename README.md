# Netflix Clone

## 📌 프로젝트 소개

아직 개발중..

이 프로젝트는 **Netflix 클론코딩**으로, React와 TypeScript를 사용하여 Netflix의 UI와 기능을 재현하는 프로젝트입니다. 애니메이션 효과를 위해 **Framer Motion**을 활용하였으며, 상태 관리를 위해 **Zustand**를 사용하였습니다.

## 🛠 사용 기술

- **React**: 컴포넌트 기반 UI 개발
- **TypeScript**: 정적 타입을 적용하여 안정적인 코드 작성
- **Framer Motion**: 애니메이션 및 인터랙션 구현
- **Zustand**: 경량 상태 관리 라이브러리

## 📂 폴더 구조

```
📦 netflix-clone
├── 📁 src
│   ├── 📁 components    # 재사용 가능한 UI 컴포넌트
│   ├── 📁 pages         # 페이지 단위 컴포넌트
│   ├── 📁 hooks         # 커스텀 훅 모음
│   ├── 📁 stores        # Zustand 상태 관리 스토어
│   ├── 📁 styles        # 스타일 파일
│   ├── 📁 utils         # 유틸리티 함수
│   ├── App.tsx         # 메인 앱 컴포넌트
│   ├── index.tsx       # React 렌더링 시작점
├── package.json
├── tsconfig.json
├── README.md
```

## 🚀 설치 및 실행

1. **프로젝트 클론**
   ```bash
   git clone https://github.com/your-repo/netflix-clone.git
   cd netflix-clone
   ```
2. **패키지 설치**
   ```bash
   npm install
   ```
3. **개발 서버 실행**
   ```bash
   npm start
   ```
4. **웹 브라우저에서 확인**
   ```
   http://localhost:3000
   ```

## 🎬 주요 기능

- **메인 페이지**: 인기 영화 및 TV 프로그램 목록 표시
- **검색 기능**: 영화 및 TV 프로그램 검색
- **애니메이션 효과**: Framer Motion을 활용한 자연스러운 UI 전환
- **상태 관리**: Zustand를 사용하여 전역 상태 관리
- **반응형 디자인**: 다양한 화면 크기에 대응하는 UI

## 📜 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.
