export const Footer = () => {
  return (
    <footer className="w-full max-w-[912px] px-6 py-8">
      <div className="border-t border-white/20 pt-6 text-center text-[10px] text-white/60 md:text-xs">
        <p>데이터 출처: 기상청 (공공데이터포털 단기예보 서비스)</p>
        <p className="mt-1">위치 정보: Kakao 로컬 API</p>
        <p className="mt-1">© 2026 WeatherView. Designed by minji.</p>
      </div>
    </footer>
  );
};
