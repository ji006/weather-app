import { useFavoriteWeatherQuery } from "../../../entities/weather/model/useFavoriteWeatherQuery";
import { FavoriteWeatherCard } from "../../../entities/weather/ui/FavoriteWeatherCard";
import { getTodayMinMax } from "../../../shared/lib/weatherUtils";
import { useFavorite } from "../../../shared/store/useFavorite";

export const FavoriteWeatherSection = () => {
  const { favorites } = useFavorite();

  // 여러 지역의 날씨 데이터를 병렬로 가져오기
  const results = useFavoriteWeatherQuery(favorites);

  // 로딩 상태 확인 (하나라도 로딩 중이면 표시)
  const isLoading = results.some((result) => result.isLoading);

  if (isLoading) {
    return (
      <div className="my-8 flex w-full max-w-[912px] flex-col items-center">
        <div className="w-full max-w-[912px]">
          <h2 className="mb-4 px-1 text-lg font-bold text-white">관심 지역</h2>
        </div>
        <div className="py-20 text-center text-white">
          정보를 불러오는 중입니다...
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 flex w-full max-w-[912px] flex-col items-center">
      <div className="w-full max-w-[912px]">
        <h2 className="mb-4 px-1 text-lg font-bold text-white">관심 지역</h2>
      </div>
      <div className="grid w-full grid-cols-1 justify-items-center gap-y-5 md:grid-cols-2">
        {results.map((result, index) => {
          // 데이터가 없거나 로딩 실패 시 건너뜀
          if (!result.data) return null;

          const item = result.data;
          // 최저/최고 기온 계산
          const { min, max } = getTodayMinMax(item.fullDayData);
          const currentFavorite = favorites[index];

          return (
            <FavoriteWeatherCard
              key={item.address}
              address={item.address}
              location={currentFavorite?.displayAdr || item.displayAdr}
              temp={item.temp}
              min={min}
              max={max}
            />
          );
        })}
      </div>
      {favorites.length === 0 && (
        <div className="flex w-full justify-center">
          <div className="py-20 text-white/70">즐겨찾기한 지역이 없습니다.</div>
        </div>
      )}
    </div>
  );
};
