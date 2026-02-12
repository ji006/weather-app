import { CurrentWeather } from "../../../entities/weather/ui/CurrentWeather";
import { HourlyWeather } from "../../../entities/weather/ui/HourlyWeather";

export const MainWeather = () => {
    const mockRawData = [
        { fcstTime: "2000", category: "TMP", fcstValue: "6", fcstDate: "20260212" },
        { fcstTime: "2000", category: "SKY", fcstValue: "3", fcstDate: "20260212" },
        { fcstTime: "2000", category: "PTY", fcstValue: "0", fcstDate: "20260212" },
        
        { fcstTime: "2100", category: "TMP", fcstValue: "5", fcstDate: "20260212" },
        { fcstTime: "2100", category: "SKY", fcstValue: "4", fcstDate: "20260212" },
        { fcstTime: "2100", category: "PTY", fcstValue: "1", fcstDate: "20260212" },
    
        { fcstTime: "2200", category: "TMP", fcstValue: "4", fcstDate: "20260212" },
        { fcstTime: "2200", category: "SKY", fcstValue: "4", fcstDate: "20260212" },
        { fcstTime: "2200", category: "PTY", fcstValue: "3", fcstDate: "20260212" },

        { fcstTime: "2300", category: "TMP", fcstValue: "6", fcstDate: "20260212" },
        { fcstTime: "2300", category: "SKY", fcstValue: "3", fcstDate: "20260212" },
        { fcstTime: "2300", category: "PTY", fcstValue: "0", fcstDate: "20260212" },
        
        { fcstTime: "2400", category: "TMP", fcstValue: "5", fcstDate: "20260212" },
        { fcstTime: "2400", category: "SKY", fcstValue: "4", fcstDate: "20260212" },
        { fcstTime: "2400", category: "PTY", fcstValue: "1", fcstDate: "20260212" },
    
        { fcstTime: "0100", category: "TMP", fcstValue: "4", fcstDate: "20260213" },
        { fcstTime: "0100", category: "SKY", fcstValue: "2", fcstDate: "20260213" },
        { fcstTime: "0100", category: "PTY", fcstValue: "0", fcstDate: "20260213" },
    
        { fcstTime: "0200", category: "TMP", fcstValue: "4", fcstDate: "20260213" },
        { fcstTime: "0200", category: "SKY", fcstValue: "1", fcstDate: "20260213" },
        { fcstTime: "0200", category: "PTY", fcstValue: "0", fcstDate: "20260213" },
      ];
  return (
    <section className="w-full">
      <CurrentWeather />
        
      <HourlyWeather rawData={mockRawData}/>
    </section>
  );
};
