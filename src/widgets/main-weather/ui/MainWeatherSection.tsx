import { useEffect, useState } from "react";
import { CurrentWeather } from "../../../entities/weather/ui/CurrentWeather";
import { HourlyWeather } from "../../../entities/weather/ui/HourlyWeather";
import { getWeatherByTime } from "../../../shared/api/weatherApi";
import { getTodayMinMax } from "../../../shared/lib/weatherUtils";

export const MainWeather = () => {
  const [rawData, setRawData] = useState<any[]>([]);
  const [fullDayData, setFullDayData] = useState<any[]>([]); // 오늘 최저/최고 기온
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoading(true);

        // 두 가지 데이터를 병렬로 호출 (서울로 일단 설정)
        const [currentData, fullData] = await Promise.all([
          getWeatherByTime(37.56, 126.97, false),
          getWeatherByTime(37.56, 126.97, true),
        ]);

        setRawData(currentData);
        setFullDayData(fullData);
      } catch (error) {
        console.error("날씨 데이터를 가져오는 중 에러 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading)
    return <div className="p-10 text-white">날씨 데이터를 불러오는 중...</div>;

  const currentTempItem = rawData.find((item) => item.category === "TMP");
  const currentTemp = currentTempItem ? currentTempItem.fcstValue : "--";
  const { min, max } = getTodayMinMax(fullDayData);

  return (
    <section className="w-full">
      <CurrentWeather temp={currentTemp} minTemp={min} maxTemp={max} />

      <HourlyWeather rawData={rawData} />
    </section>
  );
};
