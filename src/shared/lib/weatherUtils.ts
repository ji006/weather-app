export const formatHourlyData = (rawItems: any[]) => {
  /**
   * SKY(하늘상태), PTY(강수형태) 코드를 바탕으로 날씨 상태 문자열 반환
   */
  const getWeatherCondition = (sky: number, pty: number) => {
    if (pty > 0) {
      if (pty === 1 || pty === 4) return "Rain";
      if (pty === 2 || pty === 3) return "Snow";
    }
    if (sky === 1) return "Clear";
    if (sky === 3) return "PartlyCloudy";
    return "Cloudy";
  };

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");

  // 현재 날짜와 시간을 "202602122000" 형태로 만듭니다.
  const currentFullKey = `${year}${month}${day}${hours}00`;

  const groupedByTime: { [key: string]: any } = {};

  rawItems.forEach((item) => {
    // 날짜와 시간을 합쳐서 고유 키로 사용
    const dateTimeKey = item.fcstDate + item.fcstTime;

    if (!groupedByTime[dateTimeKey]) {
      groupedByTime[dateTimeKey] = {
        date: item.fcstDate,
        time: item.fcstTime,
      };
    }
    groupedByTime[dateTimeKey][item.category] = item.fcstValue;
  });

  // 정렬할 때 dateTimeKey(날짜+시간)를 기준으로 정렬
  return Object.values(groupedByTime)
    .sort((a, b) => {
      const aKey = a.date + a.time;
      const bKey = b.date + b.time;
      return aKey.localeCompare(bKey); // 문자열 비교로 날짜순 정렬
    })
    .filter((item: any) => item.date + item.time >= currentFullKey)
    .slice(0, 24)
    .map((item) => {
      const temp = Math.round(Number(item.TMP));
      const sky = Number(item.SKY);
      const pty = Number(item.PTY);

      return {
        time: `${parseInt(item.time.substring(0, 2))}시`,
        temp,
        condition: getWeatherCondition(sky, pty),
      };
    });
};

export const getTodayMinMax = (rawItems: any[]) => {
  const now = new Date();
  const today = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;

  // 오늘 날짜 기온 데이터만 추출
  const todaytemps = rawItems
    .filter((item) => item.fcstDate === today && item.category === "TMP")
    .map((item) => Number(item.fcstValue));

  if (todaytemps.length === 0) return { min: "--", max: "--" };

  // 최대,최소값 계산
  return {
    min: Math.min(...todaytemps),
    max: Math.max(...todaytemps),
  };
};
