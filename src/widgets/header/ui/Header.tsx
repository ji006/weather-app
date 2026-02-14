import { Star, CloudMoon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocationStore } from "../../../shared/store/useLoaction";

interface HeaderProps {
  isFav: boolean;
}

export const Header = ({ isFav }: HeaderProps) => {
  const navigate = useNavigate();
  const { resetLocation } = useLocationStore();

  const handleHomeClick = () => {
    resetLocation();
    navigate("/");
  };

  const handleFavClick = () => {
    navigate("/favorites");
  };

  return (
    <div className="relative mx-auto flex w-full max-w-[912px] items-center justify-between px-6 py-8">
      <div />
      <div
        onClick={handleHomeClick}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      >
        <CloudMoon className="h-[55px] w-[55px] text-white" />
      </div>
      <div onClick={handleFavClick} className="flex flex-col items-end">
        <div
          className={`flex cursor-pointer flex-col items-center rounded-xl bg-white/20 p-2 transition-colors hover:bg-white/30 active:scale-95 ${isFav ? "invisible" : "visible"}`}
        >
          <Star className="h-8 w-8 fill-yellow-200 text-yellow-200 transition-all" />
          <span className="mt-1 text-[9px] font-bold text-gray-500">
            즐겨찾기
          </span>
        </div>
      </div>
    </div>
  );
};
