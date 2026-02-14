// src/pages/home/ui/HomePage.tsx
import { Header } from "../../../widgets/header/ui/Header";
import { MainWeather } from "../../../widgets/main-weather/ui/MainWeatherSection";

export const HomePage = () => {
  return (
    // 배경 그라데이션 (이미지 느낌)
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#A7D5E4] to-[#80A9E9] bg-fixed">
      <Header />
      <div className="w-full max-w-[912px] px-6">
        <MainWeather />
      </div>
    </div>
  );
};
