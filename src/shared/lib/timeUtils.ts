export const getBaseTime = () => {
  const now = new Date();

  // 기상청 발표 시간 (단기예보 기준)
  const baseTimes = [2, 5, 8, 11, 14, 17, 20, 23];

  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minute = now.getMinutes();

  // 20분 전 시간을 기준
  if (minute < 20) {
    hour -= 1;
  }

  // 만약 00시라면 어제 날짜로
  if (hour < 0) {
    now.setDate(now.getDate() - 1);
    year = now.getFullYear();
    month = now.getMonth() + 1;
    day = now.getDate();
    hour = 23;
  }

  // 현재 시간보다 작거나 같은 가장 최근 발표 시각 찾기
  const closestBaseTime = baseTimes.filter((t) => t <= hour).pop() || 23; // 새벽 0~2시 사이라면 전날 23시 데이터 사용

  // 오늘 0~2시 사이
  if (hour < 2 && closestBaseTime === 23) {
    const yesterday = new Date(now.setDate(now.getDate() - 1));
    year = yesterday.getFullYear();
    month = yesterday.getMonth() + 1;
    day = yesterday.getDate();
  }

  // 포맷팅 (YYYYMMDD, HH00)
  const baseDate = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
  const baseTime = `${String(closestBaseTime).padStart(2, "0")}00`;

  return { baseDate, baseTime };
};
