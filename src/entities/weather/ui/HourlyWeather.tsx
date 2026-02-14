import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudSun,
  BadgeQuestionMarkIcon,
} from "lucide-react";
import { formatHourlyData } from "../../../shared/lib/weatherUtils";

const iconMap: { [key: string]: React.ReactNode } = {
  Clear: <Sun className="h-6 w-6 text-yellow-200" />,
  PartlyCloudy: <CloudSun className="h-6 w-6 text-gray-200" />,
  Cloudy: <Cloud className="h-6 w-6 text-gray-400" />,
  Rain: <CloudRain className="h-6 w-6 text-blue-400" />,
  Snow: <CloudSnow className="h-6 w-6 text-white" />,
};

export const HourlyWeather = ({ rawData }: { rawData: any[] }) => {
  const hourlyData = formatHourlyData(rawData);

  if (!hourlyData || hourlyData.length === 0) return null;

  return (
    <div className="mb-7 mt-10 w-full max-w-[912px] rounded-xl bg-white/20 p-4 text-white shadow-sm backdrop-blur-md">
      <p className="mb-4 text-[14px] font-medium opacity-100">시간대별 기온</p>

      <div className="scrollbar-width-none md:scrollbar-width-thin flex gap-7 overflow-x-auto md:pb-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-transparent md:[&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-track]:bg-transparent md:[&::-webkit-scrollbar-track]:bg-white/10 [&::-webkit-scrollbar]:h-[10px]">
        {hourlyData.map((item, key) => (
          <div
            key={`${item.time}-${key}`}
            className="flex min-w-[40px] flex-col items-center gap-2"
          >
            <span className="text-sm font-bold opacity-90">{item.time}</span>
            {iconMap[item.condition] || (
              <BadgeQuestionMarkIcon className="h-6 w-6 text-gray-300" />
            )}
            <span className="text-xl font-bold">{item.temp}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};
