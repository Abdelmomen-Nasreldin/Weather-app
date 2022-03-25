import { Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Area } from '../models/area';
import { Astronomy } from '../models/astronomy';
import { CurrentCondition } from '../models/current-condition';
import { HourlyWeather } from '../models/hourly-weather';
import { ForecastService } from './forecast.service';
import { DailyWeather } from './../models/daily-weather';
import { MonthlyAverage } from '../models/monthly-average';

@Injectable({
  providedIn: 'root',
})
export class CovertBackToFrontService {
  hourlyWeather!: HourlyWeather[];
  dailyWeather!: DailyWeather[];
  monthlyWeather!: MonthlyAverage[];
  currentCondition!: CurrentCondition[];
  astronomy!: Astronomy[];
  area!: Area[];
  constructor(private forecastService: ForecastService) {}

  convertWeather() {
    return this.forecastService.getWeatherForecast().pipe(
      map((data: any) => {
        if (data) {
          let covertedHourlyWeather = [];
          let covertedCurrentCondition = [];
          let covertedAstronomy = [];
          let covertedArea = [];
          let covertedDailyWeather = [];
          let covertedMonthlyWeather = [];
          for (const area of data.data.nearest_area) {
            let areaScheme: Area = {
              areaName: area.areaName[0].value,
              region: area.region[0].value,
              country: area.country[0].value,
              // weatherUr: area.weatherUr[0].value, // there is a problem with all images in the app
            };
            covertedArea.push(areaScheme);
          }
          for (const hour of data.data.weather[0].hourly) {
            let v: HourlyWeather = {
              time: hour.time,
              FeelsLikeC: hour.FeelsLikeC,
              tempC: hour.tempC,
              humidity: hour.humidity,
              weatherDesc: hour.weatherDesc[0].value,
              // weatherIconUrl: hour.weatherIconUrl[0].value,
            };
            covertedHourlyWeather.push(v);
          }
          // for (const current of data.data.current_condition) {
          //   let currentConditionSchema: CurrentCondition = {
          //     FeelsLikeC: current.FeelsLikeC,
          //     cloudcover: current.cloudcover,
          //     temp_C: current.temp_C,
          //     humidity: current.humidity,
          //     weatherDesc: current.weatherDesc[0].value,
          //     // weatherIconUrl: current.weatherIconUrl[0].value,
          //   };
          //   covertedCurrentCondition.push(currentConditionSchema);
          // }
          if (data?.data?.current_condition) {
            this.currentCondition = data.data.current_condition.map((c: any) =>
              CurrentCondition.getInstance(c)
            );
          }
          for (const astronomy of data.data.weather[0].astronomy) {
            let astronomySchema: Astronomy = {
              moonrise: astronomy.moonrise,
              moonset: astronomy.moonset,
              sunrise: astronomy.sunrise,
              sunset: astronomy.sunset,
            };
            covertedAstronomy.push(astronomySchema);
          }

          for (const daily of data.data.weather) {
            let dailySchema: DailyWeather = {
              date: daily.date,
              avgtempC: daily.avgtempC,
              maxtempC: daily.maxtempC,
              mintempC: daily.mintempC,
              sunHour: daily.sunHour,
              astronomy: daily.astronomy,
              hourly: daily.hourly,
            };
            covertedDailyWeather.push(dailySchema);
          }
          for (const monthly of data.data.ClimateAverages[0].month) {
            let monthlySchema: MonthlyAverage = {
              name: monthly.name,
              absMaxTemp: monthly.absMaxTemp,
              avgMinTemp: monthly.avgMinTemp,
            };
            covertedMonthlyWeather.push(monthlySchema);
          }

          this.hourlyWeather = [...covertedHourlyWeather];
          // this.currentCondition = [...covertedCurrentCondition];
          this.astronomy = [...covertedAstronomy];
          this.area = [...covertedArea];
          this.dailyWeather = [...covertedDailyWeather];
          this.monthlyWeather = [...covertedMonthlyWeather];
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
