import { Component, OnInit } from '@angular/core';
import { ForecastService } from './../../services/forecast.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  date : string = new Date().toDateString();
  weatherData : any
  constructor(private historyService: ForecastService) { }
  getWeatherDate(date: string){
    this.historyService.getHistoricalWeather('safaga',date).subscribe((data: any) =>{
    console.log(data)
    let x = data.data.weather[0].date
    this.date = new Date(x).toDateString()
    this.weatherData = data.data.weather[0]

    })
  }
  ngOnInit(): void {

  }

}
