import { Component, OnInit } from '@angular/core';
import { DailyWeather } from 'src/app/models/daily-weather';
import { CovertBackToFrontService } from 'src/app/services/covert-back-to-front.service';

@Component({
  selector: 'app-daily',
  templateUrl: './daily.component.html',
  styleUrls: ['./daily.component.scss']
})
export class DailyComponent implements OnInit {
dailyWeather! : DailyWeather[]
  constructor(private hourlyWeatherService: CovertBackToFrontService) { }

  ngOnInit(): void {
    this.hourlyWeatherService.convertWeather().subscribe((data) => {
      if (data) {
          this.dailyWeather = data.dailyWeather
      }
    });
  }

}
