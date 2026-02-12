import { useEffect, useState } from "react";
import { CurrentWeather } from "../../../entities/weather/ui/CurrentWeather";
import { HourlyWeather } from "../../../entities/weather/ui/HourlyWeather";
import { getWeatherByTime } from "../../../shared/api/weatherApi";
import { getTodayMinMax } from "../../../shared/lib/weatherUtils";
import { getRegionName } from "../../../shared/api/kakaoApi";

export const MainWeather = () => {
  const [rawData, setRawData] = useState<any[]>([]);
  const [fullDayData, setFullDayData] = useState<any[]>([]); // 오늘 최저/최고 기온
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("위치 확인 중..."); // 지역명 표시용

  // 서울 기본 좌표
  const SEOUL = { lat: 37.56, lon: 126.97 };

  const fetchWeatherData = async (lat: number, lon: number, label: string) => {
    try {
      setLoading(true);
      const [currentData, fullData] = await Promise.all([
        getWeatherByTime(lat, lon, false),
        getWeatherByTime(lat, lon, true),
      ]);

      setRawData(currentData);
      setFullDayData(fullData);
      setLocationName(label);
    } catch (error) {
      console.error("날씨 정보 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      // 기본은 서울로
      fetchWeatherData(SEOUL.lat, SEOUL.lon, "서울특별시 (기본)");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // 해당 좌표로 호출
        const { latitude, longitude } = position.coords;
        const regionName = await getRegionName(latitude, longitude);
        fetchWeatherData(latitude, longitude, regionName);
      },
      (error) => {
        // 위치 거부/오류 시: 서울 좌표로 호출
        console.warn("위치 정보 접근 거부됨, 서울 날씨를 보여줍니다.");
        fetchWeatherData(SEOUL.lat, SEOUL.lon, "서울특별시 (기본)");
      },
      { timeout: 7000 }, // 7초 내에 위치 안 잡히면 에러로 처리
    );
  }, []);

  if (loading)
    return <div className="p-10 text-white">날씨 데이터를 불러오는 중...</div>;

  const currentTempItem = rawData.find((item) => item.category === "TMP");
  const currentTemp = currentTempItem ? currentTempItem.fcstValue : "--";
  const { min, max } = getTodayMinMax(fullDayData);

  return (
    <section className="w-full">
      <CurrentWeather
        temp={currentTemp}
        minTemp={min}
        maxTemp={max}
        location={locationName}
      />

      <HourlyWeather rawData={rawData} />
    </section>
  );
};
