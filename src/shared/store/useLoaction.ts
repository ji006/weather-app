import { create } from "zustand";

interface LocationState {
  selectedAddress: string | null; // 데이터 식별용
  homeDisplayName: string | null; // 메인 화면 표시용
  favDisplayName: string | null; // 즐겨찾기용
  // 위치 설정
  setLocation: (
    address: string,
    homeDisplay: string,
    favDisplay: string,
  ) => void;
  // 위치 초기화 (다시 GPS 기준으로 돌아가고 싶을 때)
  resetLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedAddress: null,
  homeDisplayName: null,
  favDisplayName: null,
  setLocation: (address, homeDisplay, favDisplay) =>
    set({
      selectedAddress: address,
      homeDisplayName: homeDisplay,
      favDisplayName: favDisplay,
    }),
  resetLocation: () =>
    set({ selectedAddress: null, homeDisplayName: null, favDisplayName: null }),
}));
