import { Component, OnInit } from '@angular/core';
import { CovertBackToFrontService } from 'src/app/services/covert-back-to-front.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  defaultCityName: string = 'cairo';
  constructor(private dataWeatherService: CovertBackToFrontService) { }

  ngOnInit(): void {
    this.dataWeatherService.convertWeather().subscribe((data) => {
      if (data) {
        this.defaultCityName = data.area[0].areaName;
      }
    });
  }
}
