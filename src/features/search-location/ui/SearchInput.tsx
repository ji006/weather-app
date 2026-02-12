import { Search } from "lucide-react";
import { useState } from "react";

export const SearchInput = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions] = useState<any[]>([
    { id: "1", displayName: "서울특별시", address: "서울특별시" },
    {
      id: "2",
      displayName: "종로구 청운동",
      address: "서울특별시 종로구 청운동",
    },
    {
      id: "3",
      displayName: "강남구 역삼동",
      address: "서울특별시 강남구 역삼동",
    },
  ]);
  return (
    <div className="flex w-full justify-center px-4">
      <div className="relative w-full max-w-[912px]">
        {/* 아이콘 */}
        <div className="absolute inset-y-0 left-4 flex items-center">
          <Search className="h-5 w-5 text-gray-700" />
        </div>
        {/* 검색창 input */}
        <input
          type="text"
          placeholder="지역을 입력하세요"
          className={`h-[50px] w-full border border-purple bg-white pl-12 pr-4 text-gray-800 shadow-sm placeholder:text-gray-500 focus:outline-none ${
            isOpen && suggestions.length > 0
              ? "rounded-t-[25px] border-b-transparent" // 리스트가 열리면 아래쪽 둥근 모서리 제거 및 선 없앰
              : "rounded-full bg-opacity-40" // 평소에는 완전 둥글게
          }`}
        />
        {isOpen && (
          <ul className="absolute z-10 w-full overflow-hidden rounded-b-3xl border border-purple border-t-gray-300 bg-white/95 shadow-2xl">
            {suggestions.map((region) => (
              <li
                key={region.id}
                className="flex cursor-pointer flex-col border-t-2 border-gray-100 bg-opacity-35 px-12 py-3 first:border-none hover:bg-[#E1E8F2]"
              >
                <span className="text-sm font-bold text-gray-800 md:text-base">
                  {region.displayName}
                </span>
                <span className="text-xs text-gray-500">{region.address}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
