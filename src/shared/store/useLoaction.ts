import { create } from "zustand";

interface LocationState {
  selectedAddress: string | null;
  selectedDisplay: string | null;
  // 위치 설정
  setLocation: (address: string, display: string) => void;
  // 위치 초기화 (다시 GPS 기준으로 돌아가고 싶을 때)
  resetLocation: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  selectedAddress: null,
  selectedDisplay: null,
  setLocation: (address, display) =>
    set({ selectedAddress: address, selectedDisplay: display }),
  resetLocation: () => set({ selectedAddress: null, selectedDisplay: null }),
}));
