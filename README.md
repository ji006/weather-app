# ☁️ WeatherView: 실시간 국내 날씨 조회 서비스 ☁️

<br/>
<div align="center">
<p align="center">
    <strong>"오늘 국내 날씨, 확인해보세요"</strong><br />
    기상청 공공데이터와 카카오 로컬 API를 활용한 날씨 조회 서비스
  </p>
    <img src="https://github.com/user-attachments/assets/53b615cf-fcfa-41d8-880c-867fe2773915" width="50%">
    <div align="center">
</div>
  <p align="center">
    <a href="https://weatherview-eight.vercel.app/"><strong>✨ 배포 주소 바로가기</strong></a>
  </p>
</div>
<br />

## ☀️ 프로젝트 실행 방법

1. **의존성 패키지 설치**

   ```
   npm install
   ```

   <br />

2. **환경 변수 설정(.env)**

- 루트 디렉토리에 .env 파일을 생성한 뒤 발급받은 API키를 입력합니다.
  ```
  VITE_KAKAO_API_KEY=your_kakao_api_key_here
  VITE_WEATHER_API_KEY=your_weather_portal_key_here
  ```
  <br />

3. **로컬 서버 실행**
   ```
   npm run dev
   ```

### ❄️ Sitemap

- [배포된 주소](https://weatherview-eight.vercel.app/)

<br/>

## ☀️ 프로젝트 설명

사용자의 실시간 위치를 기반으로 신뢰도 높은 기상 정보를 제공하며, 관심 지역을 나만의 별칭으로 관리할 수 있는 개인화된 날씨 서비스입니다.

<br />

### 📍 실시간 위치 기반 날씨 조회

- 접속 시 브라우저 **Geolocation API**를 통해 현재 위치 권한을 요청합니다.
- 권한 허용 시, 공공데이터포탈의 단기예보 데이터를 분석하여 **현재 기온, 오늘 최저/최고 기온, 향후 12시간의 기온**을 시각화하여 제공합니다.

### 🔍 정밀한 지역 검색 및 상세 조회

- **카카오맵 API**를 연동하여 전국 동/읍/면 단위의 상세 주소 검색을 지원합니다.
- 검색 결과에서 특정 지역을 선택하면 해당 지역의 실시간 기상 상태를 즉시 확인할 수 있습니다.

### ⭐ 관심 지역 즐겨찾기 (북마크)

- **전역 상태 관리**를 통해 메인 페이지와 검색 창 어디서든 간편하게 즐겨찾기를 추가하거나 삭제할 수 있습니다.
- 즐겨찾기 페이지에서 등록된 여러 지역의 날씨를 한눈에 볼 수 있어 효율적입니다.
- **별칭(Nickname) 설정 기능**: 사용자가 원하는 이름으로 별칭을 설정할 수 있어 개인화된 장소 관리가 가능합니다.

### 📱 반응형 웹 앱

- 다양한 디바이스 환경을 고려하여 최적화된 화면을 제공하는 **반응형 UI**를 구축했습니다.
- **스크롤 경험 개선**: 모바일 환경에서도 시간대별 기온을 부드럽게 확인할 수 있도록 가로 스크롤을 최적화(Scrollbar-hide)를 적용했습니다.

<br/>

## ☀️ 기술 스택

### Frontend

<p>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=Tailwind-CSS&logoColor=white">
  <img src="https://img.shields.io/badge/Zustand-443E38?style=for-the-badge&logo=react&logoColor=white">
  <img src="https://img.shields.io/badge/Lucide_React-F7B93E?style=for-the-badge&logo=lucide&logoColor=black">
</p>

### Deployment & Tools

<p>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=Vercel&logoColor=white">
  <img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white">
  <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white">
</p>

### APIs

<p>
  <img src="https://img.shields.io/badge/Kakao_Maps_API-FFCD00?style=for-the-badge&logo=Kakao&logoColor=black">
  <img src="https://img.shields.io/badge/Public_Data_Portal-0070BA?style=for-the-badge&logo=Open-Data&logoColor=white">
</p>

<br/>

## ☀️ 기술적 의사결정

| 항목                     | 도입 이유 및 상세                                                                                                                                                                                    |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **FSD 아키텍처**         | **Feature Sliced Design**을 기반으로 기능 단위로 폴더를 구조화하여, 프로젝트 규모가 커져도 코드의 예측 가능성과 유지보수성을 확보할 수 있도록 설계했습니다.                                          |
| **TanStack Query**       | useEffect를 사용한 복잡한 데이터 fetch 로직을 간결하게 정리하고, 로딩 상태를 효율적으로 관리하기 위해 도입했습니다. 또한 10분간의 데이터 캐싱을 통해 불필요한 API 호출을 줄여 성능을 최적화했습니다. |
| **Zustand**              | 서버에서 받아오는 날씨 정보와 별개로, 사용자가 직접 등록한 즐겨찾기 목록과 지역별 별칭 데이터를 독립적으로 관리하기 위해 사용했습니다.                                                               |
| **TypeScript**           | 프로젝트 전반에 타입을 적용하여 컴포넌트 간 주고받는 데이터의 흐름을 명확히 파악하고, 개발 단계에서 발생할 수 있는 오타나 타입 오류를 방지하여 개발 효율을 높였습니다.                               |
| **Functional Component** | 최신 React 방식에 맞춰 함수형 컴포넌트로 작성했습니다. 코드가 간결해지고 Hook을 자유롭게 사용할 수 있어 로직 재사용에 효율적입니다.                                                                  |
| **Vercel**               | Edge Network를 활용하여 국내 사용자에게 최상의 응답 속도를 제공하며, GitHub 연동을 통한 자동 배포 시스템을 구축했습니다.                                                                             |
| **공공데이터포탈 API**   | 국내 기상청의 공신력 있는 데이터를 활용하고, 한국어 기반의 위치 정보를 통해 국내 사용자에게 최적화된 데이터를 제공받기 위해 선택했습니다.                                                            |
| **카카오맵 Rest API**    | 한국 주소 체계(지번/도로명)에 최적화되어 있으며, 동/읍/면 단위까지 정밀한 위치 변환 및 검색 기능을 구현하기 위해 도입했습니다.                                                                       |
