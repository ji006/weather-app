import { useQueries } from "@tanstack/react-query";
import { getWeatherByTime } from "../../../shared/api/weatherApi";
import { searchLocation } from "../../../shared/api/kakaoApi";

export const useFavoriteWeatherQuery = (
  favorites: { address: string; displayAdr: string }[],
) => {
  return useQueries({
    queries: favorites.map((fav) => ({
      queryKey: ["weather", fav.address], // 주소별로 고유 키 생성
      queryFn: async () => {
        // 주소로 좌표 찾기
        const coords = await searchLocation(fav.address);
        if (!coords) throw new Error(`${fav.displayAdr} 좌표 조회 실패`);

        // 좌표로 날씨 가져오기
        const [currentData, fullDayData] = await Promise.all([
          getWeatherByTime(coords.lat, coords.lon, false),
          getWeatherByTime(coords.lat, coords.lon, true),
        ]);

        // 필요한 데이터만 정제해서 반환
        const currentTemp =
          currentData.find((item: any) => item.category === "TMP")?.fcstValue ||
          "--";
        return {
          address: fav.address,
          displayAdr: fav.displayAdr,
          temp: currentTemp,
          fullDayData: fullDayData,
        };
      },
      staleTime: 1000 * 60 * 10,
    })),
  });
};
