import { Component, Input, OnInit } from '@angular/core';
import { ForecastService } from './../../services/forecast.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @Input() cityName: string | null = null;
  date: string = new Date().toDateString();
  weatherData: any;
  constructor(private historyService: ForecastService) {}
getDayBefore(){
  let date = new Date();
  let yesterday = new Date();
   yesterday.setDate(date.getDate() - 1);
}


  getWeatherDate(date: string) {
    this.getDayBefore()
    if (this.cityName) {
      this.historyService
        .getHistoricalWeather(this.cityName, date)
        .subscribe((data: any) => {
          let x = data.data.weather[0].date;
          this.date = new Date(x).toDateString();
          this.weatherData = data.data.weather[0];
        });
    }
  }
  ngOnInit(): void {}
}
