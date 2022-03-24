import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {}

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
          observer.next(error);
        }
      );
    }).pipe(
      map((value: any) => {
        return new HttpParams()
        .set('key', 'f9bd9c6b96b549b6aeb123850222003')
        // .set('q', '30.033333,31.233334')
        .set('q', '26.7333304,33.9333296')
        // .set('q', value.coords.longitude + ',' + value.coords.latitude)
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
  getHistoricalWeather(){
   return this.http.get('http://api.worldweatheronline.com/premium/v1/past-weather.ashx', {params: {
     'key' : 'f9bd9c6b96b549b6aeb123850222003',
     'q': 'safaga',
     'units': 'metric',
     'date': '2022-2-2',
     'format': 'json'
   }})
  }
}


