import { Component, OnInit } from '@angular/core';
import {
  IDaily,
  IHourly,
  ICity,
  IHourlyTemp,
  IDailyTemp,
  ISevenDays,
  IEightHours,
} from './shared/table.interface';
import { FormControl } from '@angular/forms';
import { HttpService } from './shared/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private httpService: HttpService) {}

  title = 'Forecast';
  name = new FormControl('');
  API_KEY: string = '9535b10c858644b6a8d329b46a76ed98';
  currentDate = new Date();
  sevenDays: ISevenDays[] = [];
  eightHours: IEightHours[] = [];
  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  public hourlyTable: IHourly[] = [];
  public dailyTable: IDaily[] = [];

  // 0 - hourly
  // 1 - daily
  public modeToggle: number = 0;

  ngOnInit() {
    this.setVariables();
  }

  changeToggle() {
    this.modeToggle = this.modeToggle === 1 ? 0 : 1;
  }

  FindCity() {
    let currentIndex: number = 0;

    if (this.name.value === '') {
      // alert('City name is Empty!');
      return;
    } else {
      this.httpService.getCity(this.name.value).subscribe((data: ICity[]) => {
        if (data.length) {
          // add new City to table
          if (this.modeToggle === 0) {
            if (this.isCityInTheTable(this.hourlyTable, this.name.value)) {
              return;
            }

            // add to Hourly table
            this.addLocationInHoutlyTable(this.hourlyTable, data);

            currentIndex = this.hourlyTable.length - 1;

            // fill data fields
            this.fillTempHourlyByLine(this.hourlyTable[currentIndex]);
          } else {
            // add to Daily table

            if (this.isCityInTheTable(this.dailyTable, this.name.value)) {
              return;
            }

            this.addLocationInDailyTable(this.dailyTable, data);

            currentIndex = this.dailyTable.length - 1;

            // fill data fields
            this.fillTempDailyByLine(this.dailyTable[currentIndex]);
          }
        } else {
          alert('City [ ' + this.name.value + ' ] not found!');
        }
        this.name.setValue('');
      });
    }
  }

  isCityInTheTable(vTable: any[], vCityName: string): boolean {
    let rTable = vTable.filter((p) =>
      p.city.toUpperCase().includes(vCityName.toUpperCase())
    );
    return rTable.length > 0;
  }

  fillTempHourlyByLine(vLine: IHourly): void {
    let temp_C: number = 0;
    let currentDay = this.currentDate.getDate().toString();
    // add filling fields
    this.httpService
      .getTempHourly(vLine.lat, vLine.lon)
      .subscribe((dataHourly: IHourlyTemp) => {
        for (let i = 0; i < dataHourly.hourly.length; i = i + 3) {
          let hourlyItem = dataHourly.hourly[i];

          temp_C = hourlyItem.temp - 273.15;

          switch (i) {
            case 0:
              vLine.time_0 = temp_C;
              break;
            case 3:
              vLine.time_3 = temp_C;
              break;
            case 6:
              vLine.time_6 = temp_C;
              break;
            case 9:
              vLine.time_9 = temp_C;
              break;
            case 12:
              vLine.time_12 = temp_C;
              break;
            case 15:
              vLine.time_15 = temp_C;
              break;
            case 18:
              vLine.time_18 = temp_C;
              break;
            case 21:
              vLine.time_21 = temp_C;
              break;
            default:
          }
        }
      });
  }

  fillTempDailyByLine(vLine: IDaily): void {
    // add filling fields
    this.httpService
      .getTempDaily(vLine.lat, vLine.lon)
      .subscribe((dataDaily: IDailyTemp) => {
        for (let i = 0; i < 7; i++) {
          let dailyItem = dataDaily.daily[i];
          let dailyTemp = dailyItem.temp.day - 273.15;

          // if (currentDate <= dateDaily && i < 7) {
          switch (i) {
            case 0:
              vLine.temp_0 = dailyTemp;
              break;
            case 1:
              vLine.temp_1 = dailyTemp;
              break;
            case 2:
              vLine.temp_2 = dailyTemp;
              break;
            case 3:
              vLine.temp_3 = dailyTemp;
              break;
            case 4:
              vLine.temp_4 = dailyTemp;
              break;
            case 5:
              vLine.temp_5 = dailyTemp;
              break;
            case 6:
              vLine.temp_6 = dailyTemp;
              break;
            default:
            //
          }
          // }
        }
      });
  }

  addLocationInHoutlyTable(vTable: IHourly[], vData: ICity[]) {
    vTable.push({
      city: vData[0].name,
      coordinates: vData[0].name,
      lat: vData[0].lat,
      lon: vData[0].lon,
      time_0: 0,
      time_3: 0,
      time_6: 0,
      time_9: 0,
      time_12: 0,
      time_15: 0,
      time_18: 0,
      time_21: 0,
    });
  }

  addLocationInDailyTable(vTable: IDaily[], vData: ICity[]) {
    vTable.push({
      city: vData[0].name,
      coordinates: vData[0].name,
      lat: vData[0].lat,
      lon: vData[0].lon,
      temp_0: 0,
      temp_1: 0,
      temp_2: 0,
      temp_3: 0,
      temp_4: 0,
      temp_5: 0,
      temp_6: 0,
    });
  }

  CalculateTime() {}

  setVariables() {
    this.fillEightHours();
    this.fillSevenDays();
  }

  fillEightHours() {
    let dateNow: Date = new Date();
    let hours: number = 0;
    let hoursName: string = '';
    hours = dateNow.getHours();

    this.eightHours = [];

    for (let i = 0; i < 24; i = i + 3) {
      if (hours > 24) {
        hours = hours - 24;
      }
      hoursName = hours.toString();
      hoursName =
        hoursName.length === 1 ? '0' + hoursName + ':00' : hoursName + ':00';

      this.eightHours.push({ time: hoursName, name: hoursName });

      hours = hours + 3;
    }
  }

  fillSevenDays() {
    let dateNow: Date = new Date();
    dateNow = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      dateNow.getDate(),
      0,
      0,
      0
    );

    //

    for (let i = 0; i < 7; i++) {
      this.sevenDays.push({
        date: new Date(dateNow),
        name: this.weekDays[dateNow.getDay()],
      });

      dateNow.setDate(dateNow.getDate() + 1);
    }
  }
}
