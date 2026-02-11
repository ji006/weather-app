export interface Region {
  id: string; // "서울특별시-강남구-신사동"
  address: string; // "서울특별시 강남구 신사동"
  displayName: string; // "강남구 신사동"
  keywords: string[]; // ["서울특별시", "강남구", "신사동"]
}

const convertRegionData = (regionLine: string): Region => {
  const parsedData = regionLine.split("-").filter(Boolean);

  return {
    id: regionLine,
    address: parsedData.join(" "),
    displayName:
      parsedData.length > 1 ? parsedData.slice(1).join(" ") : parsedData[0],
    keywords: parsedData,
  };
};

export default convertRegionData;
