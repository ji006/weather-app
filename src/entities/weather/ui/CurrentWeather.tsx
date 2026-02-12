import { Star } from "lucide-react";

interface CurrentWeatherProps {
  temp: string;
  minTemp: string | number;
  maxTemp: string | number;
}

export const CurrentWeather = ({temp,
    minTemp,
    maxTemp}:CurrentWeatherProps) => {
  return (
    <div className="flex w-full justify-center px-4">
      <div className="min-h-[250px] w-full max-w-[912px] rounded-xl bg-white/20 p-8 text-white shadow-sm backdrop-blur-md">
        {/* 지역, 즐겨찾기 */}
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-xl font-bold md:text-2xl">서울특별시</h2>
          <button className="hover:scale-110">
            <Star className="h-7 w-7 fill-none text-yellow-200" />
          </button>
        </div>

        {/* 현재 기온 정보 */}
        <div className="mb-5 flex justify-between">
          <span className="text-[15px] mb-1 font-medium opacity-80 md:text-lg">
            현재 기온
          </span>
          <span className="text-7xl leading-none text-gray-700 md:text-[90px]">
            {temp}°
          </span>
        </div>

        {/* 최저,최고 기온 */}
        <div className="flex gap-2 border-t border-white/20 pt-4 text-lg font-bold md:text-xl">
          <div className="flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2">
            <span className="text-base text-blue-100">최저</span>
            <span>{minTemp}°</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2">
            <span className="text-base text-blue-100">최고</span>
            <span>{maxTemp}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};