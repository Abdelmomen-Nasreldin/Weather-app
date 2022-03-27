import { Component, OnInit, ViewChild } from '@angular/core';
import { DailyWeather } from 'src/app/models/daily-weather';
import { CovertBackToFrontService } from 'src/app/services/covert-back-to-front.service';
import * as d3 from 'd3';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss'],
})
export class DailyComponent implements OnInit {
  dailyWeather!: DailyWeather[];
  constructor(private getWeatherData: CovertBackToFrontService) {}

  ngOnInit(): void {
    this.getWeatherData.convertWeather().subscribe((data) => {
      if (data) {
        this.dailyWeather = data.dailyWeather;
        console.log(this.dailyWeather);
      }
    });
  }
}
// astronomy: [{…}]
// avgtempC: "18"
// date: "2022-03-26"
// hourly: (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// maxtempC: "21"
// mintempC: "14"
// sunHour: "12.0"
