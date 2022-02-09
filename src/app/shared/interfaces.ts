export interface IHourly {
    city: string;
    coordinates: string;
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
    time_Mo: number;
    time_Tu: number;
    time_We: number;
    time_Th: number;
    time_Fr: number;
    time_Sa: number;
    time_Su: number;
  }