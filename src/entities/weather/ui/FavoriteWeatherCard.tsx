import { Pencil, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocationStore } from "../../../shared/store/useLoaction";
import { useFavorite } from "../../../shared/store/useFavorite";
import { useEffect, useRef, useState } from "react";

interface FavoriteWeatherProps {
  address: string;
  homeDisplayName: string;
  favDisplayName: string;
  temp: number | string;
  min: number | string;
  max: number | string;
  isFavorite?: boolean;
}

export const FavoriteWeatherCard = ({
  address,
  homeDisplayName,
  favDisplayName,
  temp,
  min,
  max,
  isFavorite = true,
}: FavoriteWeatherProps) => {
  const navigate = useNavigate();
  const setLocation = useLocationStore((state) => state.setLocation);
  const { removeFavorite, updateNickname } = useFavorite();

  // 수정 모드 상태 관리
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(favDisplayName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  // 카드 클릭 시 해당 날씨 조회
  const handleCardClick = (e: React.MouseEvent) => {
    if (isEditing) return; // 수정 중에는 이동 방지

    setLocation(address, homeDisplayName, newName);
    navigate("/");
  };

  // 즐겨찾기 취소
  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트가 발생하지 않도록 막음
    if (isEditing) return; // 수정 중에는 이동 방지

    removeFavorite(address);
  };

  // 장소 이름 input 창으로 변경
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  // 장소 이름 변경
  const handleUpdateName = (e: React.KeyboardEvent | React.FocusEvent) => {
    function save() {
      const trimmedName = newName.trim();
      if (trimmedName && trimmedName !== favDisplayName) {
        updateNickname(address, trimmedName);
      } else {
        // 이름이 비어있거나 변경사항이 없으면 원래 이름으로 복구
        setNewName(favDisplayName);
      }

      setTimeout(() => {
        setIsEditing(false);
      }, 100);
    }

    // 엔터를 누르거나 포커스를 잃었을 때 저장
    if (("key" in e && e.key === "Enter") || e.type === "blur") {
      save();
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex h-[186px] w-full max-w-[340px] flex-col justify-between rounded-2xl bg-white/30 p-5 shadow-md backdrop-blur-md transition-all hover:cursor-pointer hover:bg-white/35 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">
        {/* 지역명 또는 수정 인풋 */}
        <div className="mr-5 flex flex-col gap-1 overflow-hidden">
          {isEditing ? (
            <input
              ref={inputRef}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={handleUpdateName}
              onBlur={handleUpdateName}
              onClick={(e) => e.stopPropagation()}
              className="border-b border-white bg-transparent text-xl font-medium text-gray-800 outline-none"
            />
          ) : (
            <div className="flex items-center gap-2">
              <span className="truncate text-xl font-medium text-gray-800 md:text-2xl">
                {favDisplayName}
              </span>
              <button
                onClick={handleEditClick}
                className="text-gray-600 hover:text-gray-900"
              >
                <Pencil className="h-5 w-5" />
              </button>
            </div>
          )}
          <span className="truncate text-xs text-gray-500">{address}</span>
        </div>
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
