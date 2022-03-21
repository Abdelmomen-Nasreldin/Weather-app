import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  constructor(private http: HttpClient) {}

  getWeatherForecast() {
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
        console.log(value);

        return new HttpParams()
        .set('key', 'f9bd9c6b96b549b6aeb123850222003')
        .set('q', value.coords.longitude+','+value.coords.latitude)
        .set('includelocation', 'yes')
        .set('showlocaltime', 'yes')
        .set('units', 'metric')
        .set('format', 'json')
      }),
      switchMap(values =>{
        console.log(values);

        //  this.http.get('http://api.worldweatheronline.com/premium/v1/search.ashx', {params: values})
         return this.http.get('http://api.worldweatheronline.com/premium/v1/weather.ashx', {params: values})
      })
    );
  }
}


