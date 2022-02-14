export interface IHourly {
  city: string;
  coordinates: string;
  lat: number;
  lon: number;
  time_0: number;
  time_3: number;
  time_6: number;
  time_9: number;
  time_12: number;
  time_15: number;
  time_18: number;
  time_21: number;
}

export interface IDaily {
  city: string;
  coordinates: string;
  lat: number;
  lon: number;
  temp_0: number;
  temp_1: number;
  temp_2: number;
  temp_3: number;
  temp_4: number;
  temp_5: number;
  temp_6: number;
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

export interface ISevenDays {
  date: Date;
  name: string;
}

export interface IEightHours {
  time: string;
  name: string;
}
