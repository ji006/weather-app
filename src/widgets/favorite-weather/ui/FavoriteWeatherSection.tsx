import { FavoriteWeatherCard } from "../../../entities/weather/ui/FavoriteWeatherCard";

export const FavoriteWeatherSection = () => {
  const favorites = [
    {
      id: 1,
      address: "서울특별시 종로구",
      location: "종로구",
      temp: 10,
      min: 1,
      max: 11,
    },
    {
      id: 2,
      address: "서울특별시 종로구",
      location: "대전광역시",
      temp: 10,
      min: 1,
      max: 11,
    },
    {
      id: 3,
      address: "서울특별시 종로구",
      location: "강남구",
      temp: 10,
      min: 1,
      max: 11,
    },
    {
      id: 4,
      address: "서울특별시 종로구",
      location: "서울특별시",
      temp: 10,
      min: 1,
      max: 11,
    },
  ];
  return (
    <div className="mt-8 flex w-full max-w-[912px] flex-col items-center">
      <div className="w-full max-w-[912px]">
        <h2 className="mb-4 px-1 text-lg font-bold text-white">관심 지역</h2>
      </div>
      <div className="grid w-full grid-cols-1 justify-items-center gap-y-5 md:grid-cols-2">
        {favorites.map((item) => (
          <FavoriteWeatherCard
            key={item.id}
            address={item.address}
            location={item.location}
            temp={item.temp}
            min={item.min}
            max={item.max}
          />
        ))}
        {favorites.length === 0 && (
          <div className="py-20 text-white/70">즐겨찾기한 지역이 없습니다.</div>
        )}
      </div>
    </div>
  );
};
