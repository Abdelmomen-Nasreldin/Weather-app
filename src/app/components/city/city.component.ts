import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Area } from 'src/app/models/area';
import { Astronomy } from 'src/app/models/astronomy';
import { CurrentCondition } from 'src/app/models/current-condition';
import { DailyWeather } from 'src/app/models/daily-weather';
import { HourlyWeather } from 'src/app/models/hourly-weather';
import { CovertBackToFrontService } from 'src/app/services/covert-back-to-front.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
})
export class CityComponent implements OnInit {
  cityName: string | null = null;
  area!: Area;
  astronomy!: Astronomy[];
  hourlyWeather!: HourlyWeather[];
  currentCondition: CurrentCondition | null = null;
  dailyWeather!: DailyWeather[]
  hourNow = +new Date().getHours();
  constructor(
    private route: ActivatedRoute,
    private httpCityNameCoverted: CovertBackToFrontService
  ) {}

  ngOnInit(): void {
    this.cityName = this.route.snapshot.paramMap.get('cityName');
    if (this.cityName) {
      this.httpCityNameCoverted
        .convertWeatherByCityName(this.cityName)
        .subscribe((data) => {
          if (data) {
            console.log(data.area[0].areaName);
            console.log(data);
            this.hourlyWeather = data.hourlyWeather;
            this.currentCondition = data.currentCondition[0];
            this.astronomy = data.astronomy;
            this.area = data.area[0]
            this.dailyWeather = data.dailyWeather;
          }
        });
    }
  }
}
