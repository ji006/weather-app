import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface FavoriteItem {
  address: string;
  displayAdr: string;
}

interface FavoriteState {
  favorites: FavoriteItem[];
  addFavorite: (address: string, displayAdr: string) => void;
  removeFavorite: (address: string) => void;
  updateAdrName: (address: string, newNickname: string) => void;
  isFavorite: (address: string) => boolean;
}

export const useFavorite = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      // 등록
      addFavorite: (address, displayAdr) => {
        const { favorites } = get();

        // 중복 체크
        if (favorites.some((fav) => fav.address === address)) return;

        // 개수 제한 체크
        if (favorites.length >= 6) {
          alert("즐겨찾기는 최대 6개까지만 등록할 수 있습니다.");
          return;
        }
        set({
          favorites: [...favorites, { address, displayAdr }],
        });
      },

      // 삭제
      removeFavorite: (address) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.address !== address),
        })),

      // 주소 별칭 수정
      updateAdrName: (address, newNickname) =>
        set((state) => ({
          favorites: state.favorites.map((fav) =>
            fav.address === address ? { ...fav, displayAdr: newNickname } : fav,
          ),
        })),

      // 즐겨찾기 여부 확인 유틸리티
      isFavorite: (address) =>
        get().favorites.some((fav) => fav.address === address),
    }),
    {
      name: "favorite-locations-storage",
    },
  ),
);
