import { useNavigate } from "react-router-dom";
import { SearchInput } from "../../../features/search-location/ui/SearchInput";
import { FavoriteWeatherSection } from "../../../widgets/favorite-weather/ui/FavoriteWeatherSection";
import { Header } from "../../../widgets/header/ui/Header";
import { useLocationStore } from "../../../shared/store/useLoaction";

export const FavoritePage = () => {
  const navigate = useNavigate();
  const setLocation = useLocationStore((state) => state.setLocation);

  const handleSelectLocation = (
    address: string,
    displayName: string,
    favDisplay: string,
  ) => {
    setLocation(address, displayName, favDisplay);
    navigate("/");
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-gradient-to-b from-[#A7D5E4] to-[#80A9E9]">
      <Header isFav={true} />
      <div className="w-full max-w-[912px] px-6">
        <SearchInput onSelectLocation={handleSelectLocation} />
        <FavoriteWeatherSection />
      </div>
    </div>
  );
};
