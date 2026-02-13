import { useQuery } from "@tanstack/react-query";
import { getWeatherByTime } from "../../../shared/api/weatherApi";

export const useWeatherQuery = (lat: number, lon: number, options?: { enabled?: boolean }) => {
  return useQuery({
    // lat, lon이 바뀔 때마다 자동으로 새로운 데이터를 fetching
    queryKey: ["weather", lat, lon],
    queryFn: async () => {
      const [currentData, fullDayData] = await Promise.all([
        getWeatherByTime(lat, lon, false),
        getWeatherByTime(lat, lon, true),
      ]);
      return { currentData, fullDayData };
    },
    staleTime: 1000 * 60 * 10, // 10분 동안은 캐시된 데이터를 사용 (서버 부하 감소)
    gcTime: 1000 * 60 * 60, // 1시간 동안 메모리에 보관
    ...options,
  });
};
