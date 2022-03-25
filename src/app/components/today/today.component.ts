import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Astronomy } from 'src/app/models/astronomy';
import { CurrentCondition } from 'src/app/models/current-condition';
import { DailyWeather } from 'src/app/models/daily-weather';
import { HourlyWeather } from 'src/app/models/hourly-weather';
import { CovertBackToFrontService } from 'src/app/services/covert-back-to-front.service';
import { ForecastService } from 'src/app/services/forecast.service';
import { Area } from './../../models/area';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  area!: Area;
  astronomy!: Astronomy[];
  hourlyWeather!: HourlyWeather[];
  currentCondition: CurrentCondition | null = null;
  // currentCondition: CurrentCondition | null = null;
  hourNow = +new Date().getHours();
  constructor(
    private httpGetWeather: ForecastService,
    private dataWeatherService: CovertBackToFrontService
  ) {}
  showCityWeather(city: string): void {
    this.httpGetWeather.getWeatherByCity(city).subscribe((cityWeather: any) => {
      console.log(cityWeather.data);
      this.currentCondition = cityWeather.data.current_condition[0]
      // this.hourlyWeather = cityWeather.hourlyWeather;
      // this.astronomy = cityWeather.astronomy;
      // this.area = cityWeather.area[0];
    });
  }
  ngOnInit(): void {
    this.dataWeatherService.convertWeather().subscribe((data) => {
      if (data) {
        this.hourlyWeather = data.hourlyWeather;
        this.currentCondition = data.currentCondition[0];
        this.astronomy = data.astronomy;
        this.area = data.area[0];
      }
    });
    this.httpGetWeather.getWeatherForecast().subscribe((data: any) => {
      console.log(data);
    });
    this.httpGetWeather
      .getHistoricalWeather('safaga', '2013-2-2')
      .subscribe((data) => {
        console.log(data);
      });
    this.httpGetWeather.getWeatherByCity('esna').subscribe((data) => {
      console.log(data);
    });
  }
}
