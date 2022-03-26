import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Area } from 'src/app/models/area';
import { Astronomy } from 'src/app/models/astronomy';
import { CurrentCondition } from 'src/app/models/current-condition';
import { HourlyWeather } from 'src/app/models/hourly-weather';
import { CovertBackToFrontService } from 'src/app/services/covert-back-to-front.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  area!: Area;
  astronomy!: Astronomy[];
  hourlyWeather!: HourlyWeather[];
  currentCondition: CurrentCondition | null = null;
  // hourNow = +new Date().getHours();
  constructor(private dataWeatherService: CovertBackToFrontService,
    private router: Router) {}
  showCityWeather(cityName: string): void {
    this.router.navigate(['/city', cityName]);
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
  }
}
