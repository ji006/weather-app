import { Search, Star } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Region } from "../../../shared/lib/regionUtils";
import convertRegionData from "../../../shared/lib/regionUtils";
import districtsData from "../../../shared/assets/data/korea_districts.json";
import { useFavorite } from "../../../shared/store/useFavorite";

interface SearchInputProps {
  onSelectLocation: (
    address: string,
    homeDisplay: string,
    displayName: string,
  ) => void;
}

export const SearchInput = ({ onSelectLocation }: SearchInputProps) => {
  const [keyword, setKeyword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null); // 검색창 영역을 가리킬 레퍼런스 생성

  // 즐겨찾기
  const { addFavorite, removeFavorite, isFavorite } = useFavorite();
  const { favorites } = useFavorite();

  const toggleFavorite = (selectedAddress: string, displayName: string) => {
    const isFav = isFavorite(selectedAddress);
    if (!selectedAddress) {
      alert("장소 정보를 가져올 수 없습니다.");
      return;
    }
    if (isFav) {
      removeFavorite(selectedAddress);
    } else {
      addFavorite(selectedAddress, displayName, displayName);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 클릭된 곳이 searchRef(검색창 전체) 밖이라면 리스트를 닫음
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // 문서 전체에 클릭 이벤트 등록
    document.addEventListener("mousedown", handleClickOutside);

    // 컴포넌트가 사라질 때 이벤트 제거 (메모리 누수 방지)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 전체 데이터를 Region 객체 배열로 딱 한 번 가공
  const regions: Region[] = useMemo(() => {
    return districtsData.map(convertRegionData);
  }, []);

  // 사용자가 입력한 키워드에 따라 실시간 필터링
  const suggestions = useMemo(() => {
    const trimmed = keyword.trim();
    if (trimmed.length < 1) return [];

    const searchTarget = trimmed.replace(/\s+/g, "");

    return regions
      .filter((r) => r.address.replace(/\s+/g, "").includes(searchTarget))
      .slice(0, 10);
  }, [keyword, regions]);

  const handleSelect = (region: Region) => {
    const savedFav = favorites.find((f) => f.address === region.address);
    const finalFavName = savedFav
      ? savedFav.favDisplayName
      : region.displayName;
    onSelectLocation(region.address, region.displayName, finalFavName);
    setKeyword("");
    setIsOpen(false);
  };

  return (
    <div className="flex w-full justify-center px-4" ref={searchRef}>
      <div className="relative w-full max-w-[912px]">
        {/* 아이콘 */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <Search className="h-5 w-5 text-gray-700" />
        </div>
        {/* 검색창 input */}
        <input
          type="text"
          value={keyword}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setKeyword(e.target.value);
            setIsOpen(true);
          }}
          placeholder="지역을 입력하세요"
          className={`h-[50px] w-full border border-purple bg-white pl-12 pr-4 text-gray-800 shadow-sm placeholder:text-gray-500 focus:outline-none ${
            isOpen && keyword.length > 0
              ? "rounded-t-[25px] border-b-transparent" // 리스트가 열리면 아래쪽 둥근 모서리 제거 및 선 없앰
              : "rounded-full bg-opacity-40" // 평소에는 완전 둥글게
          }`}
        />
        {isOpen && keyword.length > 0 && (
          <ul className="absolute z-10 max-h-[400px] w-full overflow-hidden rounded-b-3xl border border-purple border-t-gray-300 bg-white/95 shadow-2xl">
            <div className="max-h-[400px] overflow-y-auto overscroll-contain">
            {suggestions.length > 0 ? (
              suggestions.map((region) => (
                <li
                  key={region.id}
                  onClick={() => handleSelect(region)}
                  className="flex cursor-pointer justify-between border-t-2 border-gray-100 bg-opacity-35 px-12 py-3 first:border-none hover:bg-[#E1E8F2]"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-gray-800 md:text-base">
                      {region.displayName}
                    </span>
                    <span className="text-xs text-gray-500">
                      {region.address}
                    </span>
                  </div>
                  <button
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      toggleFavorite(region.address, region.displayName);
                    }}
                    className="hover:scale-125"
                  >
                    <Star
                      className={`w-7" h-7 fill-none ${
                        isFavorite(region.address)
                          ? "fill-yellow-200 text-yellow-400"
                          : "text-yellow-200"
                      }`}
                    />
                  </button>
                </li>
              ))
            ) : (
              <li className="py-6 text-center text-sm text-gray-700">
                해당 장소의 정보가 제공되지 않습니다.
              </li>
            )}
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};
