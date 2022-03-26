import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Area } from '../models/area';
import { Astronomy } from '../models/astronomy';
import { CurrentCondition } from '../models/current-condition';
import { HourlyWeather } from '../models/hourly-weather';
import { ForecastService } from './forecast.service';
import { DailyWeather } from './../models/daily-weather';
import { MonthlyAverage } from '../models/monthly-average';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CovertBackToFrontService implements OnInit {
  hourlyWeather!: HourlyWeather[];
  dailyWeather!: DailyWeather[];
  monthlyWeather!: MonthlyAverage[];
  currentCondition!: CurrentCondition[];
  astronomy!: Astronomy[];
  area!: Area[];
  // cityName: string | null = null;
  constructor(
    private forecastService: ForecastService,
    // private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this.cityName = this.route.snapshot.paramMap.get('cityName');
  }

  convertWeather() {
    return this.forecastService.getWeatherForecast().pipe(
      map((data: any) => {
        if (data) {
          if (data?.data?.nearest_area) {
            this.area = data.data.nearest_area.map((c: any) =>
              Area.getInstance(c)
            );
          }
          if (data?.data?.weather[0]?.hourly) {
            this.hourlyWeather = data.data.weather[0].hourly.map((c: any) =>
              HourlyWeather.getInstance(c)
            );
          }

          if (data?.data?.current_condition) {
            this.currentCondition = data.data.current_condition.map((c: any) =>
              CurrentCondition.getInstance(c)
            );
          }
          if (data?.data.weather[0]?.astronomy) {
            this.astronomy = data.data.weather[0].astronomy.map((c: any) =>
              Astronomy.getInstance(c)
            );
          }
          if (data?.data?.ClimateAverages[0]?.month) {
            this.monthlyWeather = data.data.ClimateAverages[0].month.map(
              (c: any) => MonthlyAverage.getInstance(c)
            );
          }
          if (data?.data?.weather) {
            this.dailyWeather = data.data.weather.map((c: any) =>
              DailyWeather.getInstance(c)
            );
          }
          return {
            hourlyWeather: this.hourlyWeather,
            currentCondition: this.currentCondition,
            astronomy: this.astronomy,
            area: this.area,
            dailyWeather: this.dailyWeather,
            monthlyWeather: this.monthlyWeather,
          };
        }
        return;
      })
    );
  }

  convertWeatherByCityName(cityName: string) {
    let hourlyWeather!: HourlyWeather[];
    let dailyWeather!: DailyWeather[];
    let monthlyWeather!: MonthlyAverage[];
    let currentCondition!: CurrentCondition[];
    let astronomy!: Astronomy[];
    let area!: Area[];
      return this.forecastService.getWeatherByCity(cityName).pipe(
        map((data: any) => {
          if (data) {
            if (data?.data?.nearest_area) {
              area = data.data.nearest_area.map((c: any) =>
                Area.getInstance(c)
              );
            }
            if (data?.data?.weather[0]?.hourly) {
              hourlyWeather = data.data.weather[0].hourly.map((c: any) =>
                HourlyWeather.getInstance(c)
              );
            }

            if (data?.data?.current_condition) {
              currentCondition = data.data.current_condition.map(
                (c: any) => CurrentCondition.getInstance(c)
              );
            }
            if (data?.data.weather[0]?.astronomy) {
              astronomy = data.data.weather[0].astronomy.map((c: any) =>
                Astronomy.getInstance(c)
              );
            }
            if (data?.data?.ClimateAverages[0]?.month) {
              monthlyWeather = data.data.ClimateAverages[0].month.map(
                (c: any) => MonthlyAverage.getInstance(c)
              );
            }
            if (data?.data?.weather) {
              dailyWeather = data.data.weather.map((c: any) =>
                DailyWeather.getInstance(c)
              );
            }
            return {
              hourlyWeather: hourlyWeather,
              currentCondition: currentCondition,
              astronomy: astronomy,
              area: area,
              dailyWeather: dailyWeather,
              monthlyWeather: monthlyWeather,
            };
          }
          return ;
        })
      );
  }
}
interface BackendData {
  data: {
    ClimateAverages: {
      months: {
        absMaxTemp: string;
        absMaxTemp_F: string;
        avgDailyRainfall: string;
        avgMinTemp: string;
        avgMinTemp_F: string;
        index: string;
        name: string;
      }[];
    }[];
  };
}
class ClimateAverages {
  constructor(
    public name: string,
    public absMaxTemp?: string,
    public avgMinTemp?: string
  ) {}
  static getInstance(data: {
    // months: {
    absMaxTemp: string;
    absMaxTemp_F: string;
    avgDailyRainfall: string;
    avgMinTemp: string;
    avgMinTemp_F: string;
    index: string;
    name: string;
    // };
  }): ClimateAverages {
    return new ClimateAverages(data.name, data.absMaxTemp, data.avgMinTemp);
  }
}
class Data {
  constructor(public ClimateAverages: any[]) {}
  static getInstance(backendData: BackendData): Data {
    const climateAverages = backendData.data.ClimateAverages.map(
      (c: any) => new ClimateAverages(c.month)
    );
    return new Data(climateAverages);
  }
}
