import { Star } from "lucide-react";
import { useLocationStore } from "../../../shared/store/useLoaction";
import { useFavorite } from "../../../shared/store/useFavorite";

interface CurrentWeatherProps {
  temp: string;
  minTemp: string | number;
  maxTemp: string | number;
  location: string;
}

export const CurrentWeather = ({
  temp,
  minTemp,
  maxTemp,
  location,
}: CurrentWeatherProps) => {
  const { selectedAddress } = useLocationStore();
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();

  const isFav = selectedAddress ? isFavorite(selectedAddress) : false;

  const toggleFavorite = () => {
    if (!selectedAddress) {
      alert("장소 정보를 가져올 수 없습니다.");
      return;
    }
    if (isFav) {
      removeFavorite(selectedAddress);
    } else {
      addFavorite(selectedAddress, location);
    }
  };

  return (
    <div className="flex w-full justify-center px-4">
      <div className="min-h-[250px] w-full max-w-[912px] rounded-xl bg-white/20 p-8 text-white shadow-sm backdrop-blur-md">
        {/* 지역, 즐겨찾기 */}
        <div className="mb-4 flex items-center gap-3">
          <h2
            className={`font-bold ${location.length >= 6 ? "text-[17px] sm:text-2xl" : "text-xl md:text-2xl"}`}
          >
            {location}
          </h2>
          <button
            onClick={toggleFavorite}
            className="hover:scale-110"
          >
            <Star
              className={`fill-none ${
                location.length >= 7
                  ? "h-6 w-6 md:h-7 md:w-7" // 7자 이상: 모바일 작게(h-6)
                  : "h-7 w-7"
              } ${
                isFav ? "fill-yellow-200 text-yellow-200" : "text-white"
              }`}
            />
          </button>
        </div>

        {/* 현재 기온 정보 */}
        <div className="mb-5 flex justify-between">
          <span className="mb-1 text-[15px] font-medium opacity-80 md:text-lg">
            현재 기온
          </span>
          <span className="text-7xl leading-none text-gray-700 md:text-[90px]">
            {temp}°
          </span>
        </div>

        {/* 최저,최고 기온 */}
        <div className="flex gap-2 border-t border-white/20 pt-4 text-lg font-bold md:text-xl">
          <div className="flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2">
            <span className="text-base text-blue-100">최저</span>
            <span>{minTemp}°</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2">
            <span className="text-base text-blue-100">최고</span>
            <span>{maxTemp}°</span>
          </div>
        </div>
      </div>
    </div>
  );
};
