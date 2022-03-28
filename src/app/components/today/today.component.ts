import { Component, Input, OnInit } from '@angular/core';
import { Astronomy } from 'src/app/models/astronomy';
import { CurrentCondition } from 'src/app/models/current-condition';
import { HourlyWeather } from 'src/app/models/hourly-weather';
import { Area } from './../../models/area';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
})
export class TodayComponent implements OnInit {
  @Input() area!: Area;
  @Input()astronomy!: Astronomy[];
  @Input() hourlyWeather!: HourlyWeather[];
  @Input() currentCondition: CurrentCondition | null = null;
   hourNow = +new Date().getHours();
  constructor(
  ) {}

  ngOnInit(): void {
  }
}
