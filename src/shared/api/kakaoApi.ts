// src/shared/api/kakaoApi.ts
import axios from "axios";

const KAKAO_REST_KEY = import.meta.env.VITE_KAKAO_REST_KEY;

export const getRegionName = async (lat: number, lon: number) => {
  try {
    const res = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}`,
      {
        headers: {
          Authorization: `KakaoAK ${KAKAO_REST_KEY}`,
        },
      },
    );

    if (res.data.documents.length > 0) {
      const addr = res.data.documents[0].address;
      // 1(시/도), 2(구), 3(동)
      const {
        region_1depth_name: d1,
        region_2depth_name: d2,
        region_3depth_name: d3,
      } = addr;

      // 동 이름이 있으면 "구 동", 없으면 "시 구", 그것도 없으면 "시"만 출력
      if (d3) return `${d2} ${d3}`;
      if (d2) return `${d1} ${d2}`;
      return d1;
    }
    return "알 수 없는 지역";
  } catch (error: any) {
    console.error(
      "카카오 주소 변환 에러:",
      error.response?.data || error.message,
    );
    return "서울특별시 (기본)";
  }
};
