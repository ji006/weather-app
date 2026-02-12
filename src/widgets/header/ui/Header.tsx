import { Star, CloudMoon } from "lucide-react";

export const Header = () => {
  return (
    <div className="relative mx-auto flex w-full max-w-[912px] items-center justify-between px-6 py-8">
      <div />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
        <CloudMoon className="h-[55px] w-[55px] text-white" />
      </div>
      <div className="flex flex-col items-end">
        <div className="flex cursor-pointer flex-col items-center">
          <Star className="h-8 w-8 fill-slate-300 text-slate-400" />
          <span className="mt-1 text-[9px] font-bold text-black">즐겨찾기</span>
        </div>
      </div>
    </div>
  );
};
