export interface IHourly {
  city: string;
  coordinates: string;
  lat: number;
  lon: number;
  time_0300: number;
  time_0600: number;
  time_0900: number;
  time_1200: number;
  time_1500: number;
  time_1800: number;
  time_2100: number;
  time_2400: number;
}

export interface IDaily {
  city: string;
  coordinates: string;
  lat: number;
  lon: number;
  temp_Mo: number;
  temp_Tu: number;
  temp_We: number;
  temp_Th: number;
  temp_Fr: number;
  temp_Sa: number;
  temp_Su: number;
}

export interface ICity {
  name: string;
  lat: number; //	50.3115386
  lon: number; //	34.8868923
  country: string; //	"UA"
  state: string; //	"Sumy Oblast"
}

export interface IHourlyTemp {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  hourly: [
    {
      dt: number;
      temp: number;
    }
  ];
}

export interface IDailyTemp {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  daily: [
    {
      dt: number;
      temp: {
        day: number;
      };
    }
  ];
}
