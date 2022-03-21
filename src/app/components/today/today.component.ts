import { Component, OnInit } from '@angular/core';
import { ForecastService } from 'src/app/services/forecast.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  constructor(private httpGetWeather: ForecastService) {}

  ngOnInit(): void {
    this.httpGetWeather.getWeatherForecast().subscribe((weather:any) => {
      console.log(weather);

      // console.log(weather.search_api.result[0].country[0].value);
    });
  }
}
