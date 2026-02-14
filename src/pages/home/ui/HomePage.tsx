// src/pages/home/ui/HomePage.tsx
import { Footer } from "../../../widgets/footer/ui/Footer";
import { Header } from "../../../widgets/header/ui/Header";
import { MainWeather } from "../../../widgets/main-weather/ui/MainWeatherSection";

export const HomePage = () => {
  return (
    // 배경 그라데이션
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#A7D5E4] to-[#80A9E9] bg-fixed">
      <Header />
      <div className="w-full max-w-[912px] px-6 flex-grow">
        <MainWeather />
      </div>
      <Footer/>
    </div>
  );
};
