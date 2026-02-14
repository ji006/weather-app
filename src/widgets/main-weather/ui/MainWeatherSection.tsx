import { useEffect, useMemo, useState } from "react";
import { CurrentWeather } from "../../../entities/weather/ui/CurrentWeather";
import { HourlyWeather } from "../../../entities/weather/ui/HourlyWeather";
import { getTodayMinMax } from "../../../shared/lib/weatherUtils";
import { getRegionName, searchLocation } from "../../../shared/api/kakaoApi";
import { SearchInput } from "../../../features/search-location/ui/SearchInput";
import { useLocationStore } from "../../../shared/store/useLoaction";
import { useWeatherQuery } from "../../../entities/weather/model/useWeatherQuery";
import convertRegionData, {
  type Region,
} from "../../../shared/lib/regionUtils";
import districtArea from "../../../shared/assets/data/korea_districts.json";
import { useFavorite } from "../../../shared/store/useFavorite";

export const MainWeather = () => {
  const { selectedAddress, homeDisplayName, favDisplayName, setLocation } =
    useLocationStore();
  const { favorites } = useFavorite();
  const REGION_FIXER: { [key: string]: string } = {
    서울: "서울특별시",
    부산: "부산광역시",
    대구: "대구광역시",
    인천: "인천광역시",
    광주: "광주광역시",
    대전: "대전광역시",
    울산: "울산광역시",
    세종: "세종특별자치시",
    경기: "경기도",
    충북: "충청북도",
    충남: "충청남도",
    전남: "전라남도",
    경북: "경상북도",
    경남: "경상남도",
    제주: "제주특별자치도",
    강원: "강원특별자치도",
    전북: "전북특별자치도",
  };
  const regions: Region[] = useMemo(
    () => districtArea.map(convertRegionData),
    [],
  );
  const WIDE_AREAS = useMemo(
    () => [...new Set(regions.map((item) => item.address.split(" ")[0]))],
    [regions],
  );

  // 상태 선언
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(
    null,
  );
  const [locationName, setLocationName] = useState("서울특별시 (기본)");

  const { data, isLoading } = useWeatherQuery(
    coords?.lat ?? 0,
    coords?.lon ?? 0,
    { enabled: !!coords },
  );

  // 주소를 좌표로 바꿔서 날씨를 가져오는 핸들러
  const handleSelectLocation = async (
    address: string,
    homeDisplay: string,
    favDisplay: string,
  ) => {
    try {
      const result = await searchLocation(address);
      if (result) {
        setCoords({ lat: result.lat, lon: result.lon });
        setLocationName(homeDisplay);
        setLocation(address, homeDisplay, favDisplay);
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

    // 이전 장소의 기록 남는거 방지
    if (!selectedAddress) {
      setCoords(null)
    }

    // 전역 상태에 선택된 위치가 있다면 최우선으로 로드
    if (selectedAddress) {
      // 화면에 보여줄 이름을 동기화
      if (homeDisplayName) {
        setLocationName(homeDisplayName);
      }

      // 좌표 정보가 없을 때만 좌표를 새로 찾기
      if (!coords) {
        handleSelectLocation(
          selectedAddress,
          homeDisplayName || "",
          favDisplayName || "",
        );
      }

      return;
    }

    // 없다면 기존처럼 GPS 기반 로직 실행
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const { latitude, longitude } = pos.coords;
          let regionName = await getRegionName(latitude, longitude);

          // 서울 강남구 -> 서울특별시 강남구로 변환
          const firstWord = regionName.split(" ")[0]; // 서울 추출
          if (REGION_FIXER[firstWord]) {
            regionName = regionName.replace(firstWord, REGION_FIXER[firstWord]);
          }
          let homeDisplay = "";

          // 광역자치단체 여부 확인
          const isWideArea = WIDE_AREAS.includes(regionName);

          if (isWideArea) {
            // 서울특별시, 경기도 등은 그대로 이름을 사용
            homeDisplay = regionName;
          }
          // 기초자치단체 혹은 상세 주소인 경우
          else {
            // regions 데이터에서 해당 주소에 맞는 display 이름
            const officialRegion = regions.find(
              (r) => regionName === r.address,
            );

            if (officialRegion) {
              homeDisplay = officialRegion.displayName;
            } else {
              // 리스트에 없으면 검색 시 address의 앞부분 활용
              const words = regionName.split(" ");
              homeDisplay = words[1] || words[0];
            }
          }

          // 즐겨찾기 상태 확인 (이미 즐겨찾기 된 곳인지 확인)
          const savedFav = favorites.find((f) => f.address === regionName);
          const finalFav = savedFav ? savedFav.favDisplayName : homeDisplay;

          // 상태 업데이트
          setCoords({ lat: latitude, lon: longitude });
          setLocationName(homeDisplay);

          setLocation(regionName, homeDisplay, finalFav);
        },
        (error) => {
          setCoords({ lat: 37.56, lon: 126.97 });
          setLocation("서울특별시", "서울특별시", "서울특별시");
        },
      );
    }
  }, [selectedAddress]);

  // 위치(좌표) 자체가 아직 없을 때
  if (!coords) {
    return (
      <div className="py-20 text-center text-white">
        위치 정보를 확인 중입니다...
      </div>
    );
  }

  // 위치는 찾았는데, 해당 위치의 날씨를 불러오는 중일 때
  if (isLoading) {
    return (
      <div className="py-20 text-center text-white">
        날씨 정보를 불러오는 중입니다...
      </div>
    );
  }

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
