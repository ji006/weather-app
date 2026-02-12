import { Search } from "lucide-react";

export const SearchInput = () => {
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
          className="h-[50px] w-full rounded-full border border-purple bg-white bg-opacity-30 pl-12 pr-4 text-white placeholder:text-gray-500"
        />
      </div>
    </div>
  );
};
