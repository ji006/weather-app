import {
  Sun,
  Cloud,
  CloudRain,
  BadgeQuestionMarkIcon,
  CloudSunRainIcon,
  CloudSnowIcon,
  Snowflake,
  Cloudy,
} from "lucide-react";
import { formatHourlyData } from "../../../shared/lib/weatherUtils";

const iconMap: { [key: string]: { label: string; icon: any; color: string } } =
  {
    맑음: { label: "맑음", icon: Sun, color: "text-yellow-200" },
    구름많음: { label: "구름 많음", icon: Cloudy, color: "text-gray-400" },
    흐림: { label: "흐림", icon: Cloud, color: "text-[#a191ba]" },
    비: { label: "비", icon: CloudRain, color: "text-blue-400" },
    "비/눈": { label: "비/눈", icon: CloudSnowIcon, color: "text-blue-200" },
    눈: { label: "눈", icon: Snowflake, color: "text-white" },
    소나기: {
      label: "소나기",
      icon: CloudSunRainIcon,
      color: "text-[#5b9bc2]",
    },
  };

export const HourlyWeather = ({ rawData }: { rawData: any[] }) => {
  const hourlyData = formatHourlyData(rawData);

  if (!hourlyData || hourlyData.length === 0) return null;

  return (
    <div className="mb-7 mt-10 w-full max-w-[912px] rounded-xl bg-white/20 p-4 text-white shadow-sm backdrop-blur-md">
      <p className="mb-4 text-[14px] font-medium opacity-100">시간대별 기온</p>

      <div className="flex gap-7 overflow-x-auto pb-2 md:pb-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent md:[&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-track]:bg-transparent md:[&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar]:h-[10px] md:[&::-webkit-scrollbar]:block">
        {hourlyData.map((item, key) => {
          const weather = iconMap[item.condition];
          const WeatherIcon = weather?.icon;
          return (
            <div
              key={`${item.time}-${key}`}
              className="flex min-w-[61px] flex-col items-center gap-2"
            >
              <span className="text-sm font-bold opacity-90">{item.time}</span>
              {weather ? (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-[14px] font-bold text-white">
                    {weather.label}
                  </span>
                  <WeatherIcon className={`h-7 w-7 ${weather.color}`} />
                </div>
              ) : (
                <BadgeQuestionMarkIcon className="h-7 w-7 text-gray-300" />
              )}
              <span className="text-xl font-bold">{item.temp}°</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
