import { FavoriteWeatherCard } from "../../../entities/weather/ui/FavoriteWeatherCard";

export const FavoriteWeatherSection = () => {
  const favorites = [
    { id: 1, location: "종로구", temp: 10, min: 1, max: 11 },
    { id: 2, location: "대전광역시", temp: 10, min: 1, max: 11 },
    { id: 3, location: "강남구", temp: 10, min: 1, max: 11 },
    { id: 4, location: "서울특별시", temp: 10, min: 1, max: 11 },
  ];
  return (
    <div className="mt-8 flex w-full max-w-[912px] flex-col items-center">
      <div className="w-full max-w-[912px]">
        <h2 className="mb-4 px-1 text-lg font-bold text-white">관심 지역</h2>
      </div>
      <div className="grid w-full max-w-[700px] grid-cols-1 justify-items-center gap-x-6 gap-y-5 md:grid-cols-2">
        {favorites.map((item) => (
          <FavoriteWeatherCard
            key={item.id}
            location={item.location}
            temp={item.temp}
            min={item.min}
            max={item.max}
          />
        ))}
      </div>
    </div>
  );
};
