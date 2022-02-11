import { Component } from '@angular/core';
import {
  IDaily,
  IHourly,
  ICity,
  IHourlyTemp,
  IDailyTemp,
} from './shared/table.interface';
import { FormControl } from '@angular/forms';
import { HttpService } from './shared/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private httpService: HttpService) {}

  title = 'Forecast';
  name = new FormControl('');
  API_KEY: string = '9535b10c858644b6a8d329b46a76ed98';
  currentDate = new Date();

  public hourlyTable: IHourly[] = [
    // {city: "New York", coordinates: "0", lat: "", lon: "", time_0300: 11, time_0600: 11, time_0900: 11, time_1200: 11, time_1500: 11, time_1800: 11, time_2100: 11, time_2400: 11},
    // {city: "London",   coordinates: "1", lat: "", lon: "", time_0300: 13, time_0600: 13, time_0900: 13, time_1200: 13, time_1500: 13, time_1800: 13, time_2100: 13, time_2400: 13},
    // {city: "Limassol", coordinates: "2", lat: "", lon: "", time_0300: 18, time_0600: 18, time_0900: 18, time_1200: 18, time_1500: 18, time_1800: 18, time_2100: 18, time_2400: 18},
    // {city: "Valencia", coordinates: "3", lat: "", lon: "", time_0300: 18, time_0600: 18, time_0900: 18, time_1200: 18, time_1500: 18, time_1800: 18, time_2100: 18, time_2400: 18},
  ];
  public dailyTable: IDaily[] = [
    // {city: "New York", coordinates: "0", time_Mo: 11, time_Tu: 11, time_We: 11, time_Th: 11, time_Fr: 11, time_Sa: 11, time_Su: 11 },
    // {city: "London",   coordinates: "1", lat: "", lon: "", time_Mo: 13, time_Tu: 13, time_We: 13, time_Th: 13, time_Fr: 13, time_Sa: 13, time_Su: 13 },
    // {city: "Limassol", coordinates: "2", lat: "", lon: "", time_Mo: 18, time_Tu: 18, time_We: 18, time_Th: 18, time_Fr: 18, time_Sa: 18, time_Su: 18 },
    // {city: "Valencia", coordinates: "3", lat: "", lon: "", time_Mo: 18, time_Tu: 18, time_We: 18, time_Th: 18, time_Fr: 18, time_Sa: 18, time_Su: 18 },
  ];

  // 0 - hourly
  // 1 - daily
  public modeToggle: number = 0;

  changeToggle() {
    this.modeToggle = this.modeToggle === 1 ? 0 : 1;
  }

  FindCity() {
    // console.log('Find City:', this.name.value, new Date().toString());

    let currentIndex: number = 0;

    if (this.name.value === '') {
      // alert('City name is Empty!');
      return;
    } else {
      this.httpService.getCity(this.name.value).subscribe((data: ICity[]) => {
        // console.log('data coordinates', JSON.stringify(data, null, 3));
        if (data.length) {
          // add new City to table
          if (this.modeToggle === 0) {
            if (this.isCityInTheTable(this.hourlyTable, this.name.value)) {
              console.log(
                'City [ ' + this.name.value + ' ] is alredy in array.'
              );
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
              console.log(
                'City [ ' + this.name.value + ' ] is alredy in array.'
              );
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
        for (let i = 0; i < dataHourly.hourly.length; i++) {
          // console.log('', dataHourly.hourly[i]);
          let hourlyItem = dataHourly.hourly[i];
          // let dateString = hourlyItem.dt.toString();
          // let yourDate: Date = new Date(hourlyItem.dt);
          let dateHourly = new Date(hourlyItem.dt * 1000);
          let hours = dateHourly.getHours().toString();
          let minutes = dateHourly.getMinutes().toString();
          let date = dateHourly.getDate().toString();
          hours = hours.length === 1 ? '0' + hours : hours;
          minutes = minutes.length === 1 ? '0' + minutes : minutes;
          let time_0000 = 'time_' + hours + minutes;
          if (currentDay === date) {
            switch (time_0000) {
              case 'time_0300':
                // console.log('Time: ', hours, ':', minutes, ' - ', date);
                temp_C = hourlyItem.temp - 273.15;
                // console.log('C: ', temp_C);
                vLine[time_0000] = temp_C;
                break;
              case 'time_0600':
                // console.log('Time: ', hours, ':', minutes, ' - ', date);
                temp_C = hourlyItem.temp - 273.15;
                // console.log('C: ', temp_C);
                vLine[time_0000] = temp_C;
                break;
              case 'time_0900':
                // console.log('Time: ', hours, ':', minutes, ' - ', date);
                temp_C = hourlyItem.temp - 273.15;
                // console.log('C: ', temp_C);
                vLine[time_0000] = temp_C;
                break;
              case 'time_1200':
                // console.log('Time: ', hours, ':', minutes, ' - ', date);
                temp_C = hourlyItem.temp - 273.15;
                // console.log('C: ', temp_C);
                vLine[time_0000] = temp_C;
                break;
              case 'time_1500':
                // console.log('Time: ', hours, ':', minutes, ' - ', date);
                temp_C = hourlyItem.temp - 273.15;
                // console.log('C: ', temp_C);
                vLine[time_0000] = temp_C;
                break;
              case 'time_1800':
                // console.log('Time: ', hours, ':', minutes, ' - ', date);
                temp_C = hourlyItem.temp - 273.15;
                // console.log('C: ', temp_C);
                vLine[time_0000] = temp_C;
                break;
              case 'time_2100':
                // console.log('Time: ', hours, ':', minutes, ' - ', date);
                temp_C = hourlyItem.temp - 273.15;
                // console.log('C: ', temp_C);
                vLine[time_0000] = temp_C;
                break;
              case 'time_2400':
                // console.log('Time: ', hours, ':', minutes, ' - ', date);
                temp_C = hourlyItem.temp - 273.15;
                // console.log('C: ', temp_C);
                vLine[time_0000] = temp_C;
                break;
              default:
              // console.log (“Not Zero, One or Two);
            }
          }
        }
      });
  }

  fillTempDailyByLine(vLine: IDaily): void {
    let temp_C: number = 0;
    let currentDate = new Date();
    // add filling fields
    this.httpService
      .getTempDaily(vLine.lat, vLine.lon)
      .subscribe((dataDaily: IDailyTemp) => {
        for (let i = 0; i < dataDaily.daily.length; i++) {
          // console.log('', dataHourly.hourly[i]);
          let dailyItem = dataDaily.daily[i];
          // let dateString = hourlyItem.dt.toString();
          // let yourDate: Date = new Date(hourlyItem.dt);
          let weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
          let dateDaily = new Date(dailyItem.dt * 1000);
          let day = dateDaily.getDay();
          // let hours = dateDaily.getHours().toString();
          // let minutes = dateDaily.getMinutes().toString();
          let date = dateDaily.getDate();
          // hours = hours.length === 1 ? '0' + hours : hours;
          // minutes = minutes.length === 1 ? '0' + minutes : minutes;
          // let dayOfWeek = 'time_' + hours + minutes;
          let weekDay: string = 'temp_' + weekDays[day];
          let dailyTemp = dailyItem.temp.day - 273.15;

          console.log('currentDate: ', currentDate, 'date: ', dateDaily);

          if (currentDate <= dateDaily && i < 7) {
            switch (weekDay) {
              case 'temp_Mo':
                vLine[weekDay] = dailyTemp;
                break;
              case 'temp_Tu':
                vLine[weekDay] = dailyTemp;
                break;
              case 'temp_We':
                vLine[weekDay] = dailyTemp;
                break;
              case 'temp_Th':
                vLine[weekDay] = dailyTemp;
                break;
              case 'temp_Fr':
                vLine[weekDay] = dailyTemp;
                break;
              case 'temp_Sa':
                vLine[weekDay] = dailyTemp;
                break;
              case 'temp_Su':
                vLine[weekDay] = dailyTemp;
                break;
              default:
              //
            }
          }
        }
      });
  }

  addLocationInHoutlyTable(vTable: IHourly[], vData: ICity[]) {
    vTable.push({
      city: vData[0].name,
      coordinates: vData[0].name,
      lat: vData[0].lat,
      lon: vData[0].lon,
      time_0300: 0,
      time_0600: 0,
      time_0900: 0,
      time_1200: 0,
      time_1500: 0,
      time_1800: 0,
      time_2100: 0,
      time_2400: 0,
    });
  }

  addLocationInDailyTable(vTable: IDaily[], vData: ICity[]) {
    vTable.push({
      city: vData[0].name,
      coordinates: vData[0].name,
      lat: vData[0].lat,
      lon: vData[0].lon,
      temp_Mo: 0,
      temp_Tu: 0,
      temp_We: 0,
      temp_Th: 0,
      temp_Fr: 0,
      temp_Sa: 0,
      temp_Su: 0,
    });
  }
}
