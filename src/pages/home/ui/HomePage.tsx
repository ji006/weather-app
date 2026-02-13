// src/pages/home/ui/HomePage.tsx
import { Header } from "../../../widgets/header/ui/Header";
import { MainWeather } from "../../../widgets/main-weather/ui/MainWeatherSection";

export const HomePage = () => {
  return (
    // 배경 그라데이션 (이미지 느낌)
    <div className="min-h-screen w-full bg-gradient-to-b from-[#A7D5E4] to-[#80A9E9] flex flex-col items-center">
      <Header isFav={false}/>
      <div className="w-full max-w-[912px] px-6">
        <MainWeather />
      </div>
    </div>
  );
};
