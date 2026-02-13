import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocationStore } from "../../../shared/store/useLoaction";
import { useFavorite } from "../../../shared/store/useFavorite";

interface FavoriteWeatherProps {
  address: string;
  location: string;
  temp: number | string;
  min: number | string;
  max: number | string;
  isFavorite?: boolean;
}

export const FavoriteWeatherCard = ({
  address,
  location,
  temp,
  min,
  max,
  isFavorite = true,
}: FavoriteWeatherProps) => {
  const navigate = useNavigate();
  const setLocation = useLocationStore((state) => state.setLocation);
  const handleCardClick = () => {
    setLocation(address, location);
    navigate("/");
  };

  const { removeFavorite } = useFavorite();

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트가 발생하지 않도록 막음

    removeFavorite(address);
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex h-[186px] w-full max-w-[340px] flex-col justify-between rounded-2xl bg-white/30 p-5 shadow-md backdrop-blur-md transition-all hover:cursor-pointer hover:bg-white/35 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        <span className="truncate pr-4 text-xl font-medium text-gray-800 md:text-2xl">
          {location}
        </span>
        <span className="text-4xl font-light text-gray-900 md:text-5xl">
          {temp}°
        </span>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-3 text-base font-medium text-gray-600">
          <span>최저: {min}°</span>
          <span>최고: {max}°</span>
        </div>
        <button
          onClick={handleFavorite}
          className="rounded-full bg-white/20 p-2 transition-colors hover:bg-white/30 active:scale-95"
        >
          <Star
            className={`h-7 w-7 text-white transition-all ${isFavorite ? "fill-yellow-100 text-yellow-100" : "text-white"}`}
          />
        </button>
      </div>
    </div>
  );
};
