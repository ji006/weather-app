import { SearchInput } from "../../../features/search-location/ui/SearchInput";
import { FavoriteWeatherSection } from "../../../widgets/favorite-weather/ui/FavoriteWeatherSection";
import { Header } from "../../../widgets/header/ui/Header";

export const FavoritePage = () => {
    return (
      <div className="min-h-screen w-full bg-gradient-to-b from-[#A7D5E4] to-[#80A9E9] flex flex-col items-center">
        <Header />
        <div className="w-full max-w-[912px] px-6">
          <FavoriteWeatherSection />
        </div>
      </div>
    );
  };
  