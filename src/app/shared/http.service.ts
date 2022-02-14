import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import UrlsDictionary from './urls.dictionary';
import { HttpClient } from '@angular/common/http';
import { ICity, IDailyTemp, IHourlyTemp } from './table.interface';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  // "http://api.openweathermap.org/geo/1.0/direct? q={city name}&limit=1&appid={API key} ",
  getCity(name: string = ''): Observable<ICity[]> {
    return this.http.get<ICity[]>(
      UrlsDictionary['URL_GET_COORDINATES'] +
        'q=' +
        name +
        '&limit=1' +
        '&appid=' +
        environment.openweathermap_org_KEY
    );
  }

  // "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely,daily,alerts&appid={API key}",
  getTempHourly(lat: number, lon: number): Observable<IHourlyTemp> {
    return this.http.get<IHourlyTemp>(
      UrlsDictionary['URL_GET_HOURLY'] +
        'lat=' +
        lat +
        '&lon=' +
        lon +
        '&exclude=current,minutely,daily,alerts' +
        '&appid=' +
        environment.openweathermap_org_KEY
    );
  }

  // "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=current,minutely,hourly,alerts&appid={API key}"
  getTempDaily(lat: number, lon: number): Observable<IDailyTemp> {
    return this.http.get<IDailyTemp>(
      UrlsDictionary['URL_GET_DAILY'] +
        'lat=' +
        lat +
        '&lon=' +
        lon +
        '&exclude=current,minutely,hourly,alerts' +
        '&appid=' +
        environment.openweathermap_org_KEY
    );
  }
}
