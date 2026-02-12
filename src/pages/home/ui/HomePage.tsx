// src/pages/home/ui/HomePage.tsx
import { SearchInput } from "../../../features/search-location/ui/SearchInput";
import { Header } from "../../../widgets/header/ui/Header";

export const HomePage = () => {
  return (
    // 배경 그라데이션 (이미지 느낌)
    <div className="min-h-screen w-full bg-gradient-to-b from-[#A7D5E4] to-[#80A9E9]">
      <Header />
      <section className="w-full mt-2">
        <SearchInput />
      </section>
    </div>
  );
};
