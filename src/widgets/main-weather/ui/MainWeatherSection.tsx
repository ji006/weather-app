import { useEffect, useState } from "react";
import { CurrentWeather } from "../../../entities/weather/ui/CurrentWeather";
import { HourlyWeather } from "../../../entities/weather/ui/HourlyWeather";
import { getTodayMinMax } from "../../../shared/lib/weatherUtils";
import { getRegionName, searchLocation } from "../../../shared/api/kakaoApi";
import { SearchInput } from "../../../features/search-location/ui/SearchInput";
import { useLocationStore } from "../../../shared/store/useLoaction";
import { useWeatherQuery } from "../../../entities/weather/model/useWeatherQuery";

export const MainWeather = () => {
  const { selectedAddress, selectedDisplay,setLocation } = useLocationStore();

  // 상태 선언
  const [coords, setCoords] = useState({ lat: 37.56, lon: 126.97 }); // 기본 서울
  const [locationName, setLocationName] = useState("서울특별시 (기본)");

  const { data, isLoading } = useWeatherQuery(coords.lat, coords.lon);

  // 주소를 좌표로 바꿔서 날씨를 가져오는 핸들러
  const handleSelectLocation = async (address: string, displayName: string) => {
    try {
      const result = await searchLocation(address);
      if (result) {
        setCoords({ lat: result.lat, lon: result.lon });
        setLocationName(displayName);
        setLocation(address, displayName);
      } else {
        // 좌표를 못 찾았을 때의 피드백
        console.warn("좌표를 찾을 수 없는 지역입니다.");
      }
    } catch (error) {
      console.error("위치 검색 중 오류 발생:", error);
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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          const regionName = await getRegionName(latitude, longitude);
          setCoords({ lat: latitude, lon: longitude });
          setLocationName(regionName);
          setLocation(regionName, regionName);
        },
        (error) => {
          console.warn("위치 권한 거부됨, 서울 날씨 가져옴");
          setCoords({ lat: 37.56, lon: 126.97 });
          setLocation("서울특별시", "서울특별시");
        },
      );
    }
  }, [selectedAddress]);

  // 로딩 처리는 TanStack Query가 주는 isLoading으로 해결
  if (isLoading)
    return <div className="p-10 text-white">날씨 데이터를 불러오는 중...</div>;

  if (!data)
    return (
      <div className="p-10 text-white">날씨 데이터를 읽어올 수 없습니다.</div>
    );

  const currentTempItem = data.currentData.find(
    (item: any) => item.category === "TMP",
  );
  const currentTemp = currentTempItem ? currentTempItem.fcstValue : "--";
  const { min, max } = getTodayMinMax(data.fullDayData);

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

      <HourlyWeather rawData={data.currentData} />
    </section>
  );
};
