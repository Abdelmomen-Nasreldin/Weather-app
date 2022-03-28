import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CovertBackToFrontService } from './covert-back-to-front.service';
import { ForecastService } from './forecast.service';
export const MonthlyAvgTemperature = {
  chart: {
    type: 'spline',
  },
  title: {
    text: 'Monthly Average Temperature',
  },
  subtitle: {
    text: 'Source: world weather online',
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      // 'May',
      // 'Jun',
      // 'Jul',
      // 'Aug',
      // 'Sep',
      // 'Oct',
      // 'Nov',
      // 'Dec',
    ],
  },
  yAxis: {
    title: {
      text: 'Temperature',
    },
    labels: {
      // formatter: function () : any{
      //     return [] + '°';
      // }
    },
  },
  tooltip: {
    crosshairs: true,
    shared: true,
  },
  plotOptions: {
    spline: {
      marker: {
        radius: 4,
        lineColor: '#666666',
        lineWidth: 1,
      },
    },
  },
  series: [
    {
      name: 'Avg max Temp',
      marker: {
        symbol: 'square',
      },
      data: [10.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 23.3, 18.3, 13.9, 9.6],
    },
    {
      name: 'London',
      marker: {
        symbol: 'diamond',
      },
      data: [4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
    },
  ],
};
@Injectable({
  providedIn: 'root',
})
export class MonthlyAvgTempChartService {
  constructor(
    private getWeatherData: ForecastService,
    private getConvertedData: CovertBackToFrontService
  ) {}
  getAllWeatherData() {
    return this.getConvertedData.convertWeather().pipe(
      map((weather: any) => {
        return weather.monthlyWeather;
      })
    );
  }

  monthlyWeatherChart() {
    return this.getAllWeatherData().pipe(
      map((months: any, index) => {
        let names = months.map((month: { name: string }) => month.name);
        let absMaxTempArr = months
          .map((month: any) => month.absMaxTemp)
          .map((maxTemp: string | number) => +maxTemp); //.map((maxTemp: number)=> maxTemp.toFixed(2))
        let avgMinTempArr = months
          .map((month: any) => month.avgMinTemp)
          .map((maxTemp: string | number) => +maxTemp);
        return {
          MonthlyAvgTemperature: {
            ...MonthlyAvgTemperature,
            xAxis: { ...MonthlyAvgTemperature.xAxis, categories: names },
            series: [
              {
                name: 'Avg max Temp',
                marker: {
                  symbol: 'square',
                },
                data: [...absMaxTempArr],
              },
              {
                name: 'Avg min Temp',
                marker: {
                  symbol: 'diamond',
                },
                data: [...avgMinTempArr],
              },
            ],
          },
        };
      })
    );
  }
}
