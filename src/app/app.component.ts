import { Component } from '@angular/core';
import { IDaily, IHourly } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Forecast';
  
  public hourlyTable: IHourly[] = [
    {city: "New York", coordinates: "0", time_0300: 11, time_0600: 11, time_0900: 11, time_1200: 11, time_1500: 11, time_1800: 11, time_2100: 11, time_2400: 11},
    {city: "London",   coordinates: "1", time_0300: 13, time_0600: 13, time_0900: 13, time_1200: 13, time_1500: 13, time_1800: 13, time_2100: 13, time_2400: 13},
    {city: "Limassol", coordinates: "2", time_0300: 18, time_0600: 18, time_0900: 18, time_1200: 18, time_1500: 18, time_1800: 18, time_2100: 18, time_2400: 18},
    {city: "Valencia", coordinates: "3", time_0300: 18, time_0600: 18, time_0900: 18, time_1200: 18, time_1500: 18, time_1800: 18, time_2100: 18, time_2400: 18},
  ];
  public dailyTable:  IDaily[] = [
    {city: "New York", coordinates: "0", time_Mo: 11, time_Tu: 11, time_We: 11, time_Th: 11, time_Fr: 11, time_Sa: 11, time_Su: 11 },
    {city: "London",   coordinates: "1", time_Mo: 13, time_Tu: 13, time_We: 13, time_Th: 13, time_Fr: 13, time_Sa: 13, time_Su: 13 },
    {city: "Limassol", coordinates: "2", time_Mo: 18, time_Tu: 18, time_We: 18, time_Th: 18, time_Fr: 18, time_Sa: 18, time_Su: 18 },
    {city: "Valencia", coordinates: "2", time_Mo: 18, time_Tu: 18, time_We: 18, time_Th: 18, time_Fr: 18, time_Sa: 18, time_Su: 18 },
  ];

  // 0 - hourly
  // 1 - daily
  public modeToggle: number = 0;

  changeToggle() {
    this.modeToggle = this.modeToggle === 1  ? 0 : 1;
  }

}
