import axios from "axios";
import { convertToNxNy } from "../lib/geoUtils";
import { getBaseTime, getTodayFullTime } from "../lib/timeUtils";

const SERVICE_KEY = import.meta.env.VITE_WEATHER_API_KEY; // 인코딩된 키
const BASE_URL = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";

export const getWeatherByTime = async (
  lat: number,
  lon: number,
  isFullRange = false,
) => {
  const { nx, ny } = convertToNxNy(lat, lon);
  const { baseDate, baseTime } = isFullRange
    ? getTodayFullTime()
    : getBaseTime();

  const url = `${BASE_URL}/getVilageFcst?serviceKey=${SERVICE_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  try {
    const res = await axios.get(url);
    const items = res.data.response?.body?.items?.item || [];

    return items.filter((item: any) =>
      ["TMP", "SKY", "PTY", "TMN", "TMX"].includes(item.category),
    );
  } catch (error) {
    console.error("API 호출 실패:", error);
    return [];
  }
};
