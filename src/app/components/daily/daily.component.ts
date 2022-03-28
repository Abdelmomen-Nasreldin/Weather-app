import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DailyWeather } from 'src/app/models/daily-weather';
import { CovertBackToFrontService } from 'src/app/services/covert-back-to-front.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
})
export class DailyComponent implements OnInit {
  @Input('dailyWeather') dailyWeather!: DailyWeather[]

  constructor(private getWeatherData: CovertBackToFrontService) {}

  ngOnInit(): void {

  }
}
