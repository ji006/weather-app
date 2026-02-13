import { useEffect, useState } from "react";
import { CurrentWeather } from "../../../entities/weather/ui/CurrentWeather";
import { HourlyWeather } from "../../../entities/weather/ui/HourlyWeather";
import { getWeatherByTime } from "../../../shared/api/weatherApi";
import { getTodayMinMax } from "../../../shared/lib/weatherUtils";
import { getRegionName, searchLocation } from "../../../shared/api/kakaoApi";
import { SearchInput } from "../../../features/search-location/ui/SearchInput";
import { useLocationStore } from "../../../shared/store/useLoaction";

export const MainWeather = () => {
  const [rawData, setRawData] = useState<any[]>([]);
  const [fullDayData, setFullDayData] = useState<any[]>([]); // 오늘 최저/최고 기온
  const [loading, setLoading] = useState(true);
  const [locationName, setLocationName] = useState("위치 확인 중..."); // 지역명 표시용
  const { selectedAddress, selectedDisplay } = useLocationStore();

  // 서울 기본 좌표
  const SEOUL = { lat: 37.56, lon: 126.97 };

  // 날씨 데이터 호출 함수
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

  // 주소를 좌표로 바꿔서 날씨를 가져오는 핸들러
  const handleSelectLocation = async (address: string, displayName: string) => {
    try {
      // 카카오 API를 통해 '주소 텍스트'->'위경도 좌표'로 변환
      const coords = await searchLocation(address);

      if (coords) {
        // 변환된 좌표(lat, lon)로 API 호출
        await fetchWeatherData(coords.lat, coords.lon, address);
        setLocationName(displayName);
      } else {
        alert("해당 지역의 좌표를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("날씨 연동 중 오류 발생:", error);
    }
  };

  // 페이지 진입 시 위치 결정 로직
  useEffect(() => {
    // 전역 상태에 선택된 위치가 있다면 최우선으로 로드
    if (selectedAddress && selectedDisplay) {
      handleSelectLocation(selectedAddress, selectedDisplay);
      return;
    }

    // 없다면 기존처럼 GPS 기반 로직 실행
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
      { timeout: 10000 }, // 10초 내에 위치 안 잡히면 에러로 처리
    );
  }, [selectedAddress]);

  if (loading)
    return <div className="p-10 text-white">날씨 데이터를 불러오는 중...</div>;

  const currentTempItem = rawData.find((item) => item.category === "TMP");
  const currentTemp = currentTempItem ? currentTempItem.fcstValue : "--";
  const { min, max } = getTodayMinMax(fullDayData);

  return (
    <section className="w-full">
      <section className="mb-14 mt-2 w-full">
        <SearchInput onSelectLocation={handleSelectLocation} />
      </section>

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
