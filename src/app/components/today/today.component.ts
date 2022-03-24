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
  area!:Area ;
  astronomy!: Astronomy[];
  hourlyWeather!: HourlyWeather[];
  currentCondition: CurrentCondition | null = null;
  // currentCondition: CurrentCondition | null = null;
  hourNow = +new Date().getHours();
  constructor(
    private httpGetWeather: ForecastService,
    private hourlyWeatherService: CovertBackToFrontService
  ) {}

  ngOnInit(): void {
    this.hourlyWeatherService.convertHourlyWeather().subscribe((data) => {
      if (data) {
        this.hourlyWeather = data.hourlyWeather;
        this.currentCondition = data.currentCondition[0]
        this.astronomy = data.astronomy
        this.area = data.area[0]
      }
    });
    this.httpGetWeather.getWeatherForecast().subscribe((data: any) => {
      console.log(data);
    });
    this.httpGetWeather.getHistoricalWeather().subscribe((data)=>{
      console.log(data);
    })


  }
}
