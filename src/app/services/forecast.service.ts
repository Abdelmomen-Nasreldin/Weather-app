import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

let weatherKey = 'f9bd9c6b96b549b6aeb123850222003';
let lat  , lon
let qq = `${lon},${lat}`.toString()
@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {
    // this.getLocation()
  }
  getWeatherForecast() {
   console.log('====================================');
   console.log('ForecastService');
   console.log('====================================');
    return new Observable((observer) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          observer.next(position);
        },
        (error) => {
          observer.error(error);
        }
      );
    }).pipe(
      map((value: any) => {
        return new HttpParams()
        .set('key', weatherKey)
        // .set('q', '30.033333,31.233334')
        // .set('q', '26.7333304,33.9333296')
        .set('q', value.coords.longitude + ',' + value.coords.latitude)
        .set('includelocation', 'yes')
        .set('showlocaltime', 'yes')
        .set('units', 'metric')
        .set('format', 'json')

      }),
      switchMap(values =>{
         return this.http.get('http://api.worldweatheronline.com/premium/v1/weather.ashx', {params: values})
      })
    );
  }
  getHistoricalWeather(city: string, date: string) {
    let params = new HttpParams()
      .set('key', weatherKey)
      .set('q', city)
      .set('date', date)
      .set('units', 'metric')
      .set('format', 'json');
    return this.http.get(
      'http://api.worldweatheronline.com/premium/v1/past-weather.ashx',
      { params: params }
    );
  }
  getWeatherByCity(city: string) {
    let params = new HttpParams()
      .set('key', weatherKey)
      .set('q', city)
      .set('includelocation', 'yes')
      .set('showlocaltime', 'yes')
      .set('units', 'metric')
      .set('format', 'json');
    return this.http.get(
      'http://api.worldweatheronline.com/premium/v1/weather.ashx',
      { params: params }
    );
  }
}
