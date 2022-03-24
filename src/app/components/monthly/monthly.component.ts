import { Component, OnInit } from '@angular/core';
import { MonthlyAverage } from 'src/app/models/monthly-average';
import { CovertBackToFrontService } from 'src/app/services/covert-back-to-front.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { MonthlyAvgTempChartService } from 'src/app/services/monthly-avg-temp-chart.service';
// import { error } from 'highcharts';

export const yearlyConsumption = {
  title: {
    text: '',
  },

  subtitle: {
    text: '',
  },

  yAxis: {
    title: {
      text: 'Number of Employees',
    },
  },

  xAxis: {
    accessibility: {
      rangeDescription: 'Range: 2010 to 2017',
    },
  },

  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
  },

  plotOptions: {
    series: {
      label: {
        connectorAllowed: false,
      },
      pointStart: 2010,
    },
  },

  series: [
    {
      name: 'Installation',
      data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175],
    },
    {
      name: 'Manufacturing',
      data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434],
    },
    {
      name: 'Sales & Distribution',
      data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387],
    },
    {
      name: 'Project Development',
      data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227],
    },
    {
      name: 'Other',
      data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111],
    },
  ],

  responsive: {
    rules: [
      {
        condition: {
          maxWidth: 500,
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom',
          },
        },
      },
    ],
  },
};
@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})

export class MonthlyComponent implements OnInit {
  monthlyWeather : MonthlyAverage[] =[]
  Highcharts = Highcharts;
  MonthlyAvgTemperature = {};
  yearlyConsumption = {}
  isHighcharts = typeof Highcharts === 'object';
  loading: boolean = true;
  constructor( private hourlyWeatherService: CovertBackToFrontService, private MonthlyAvgTempChart : MonthlyAvgTempChartService ) {
    this.yearlyConsumption = yearlyConsumption
   }

  ngOnInit(): void {
    this.hourlyWeatherService.convertHourlyWeather().subscribe((data) => {
      if (data) {
        this.monthlyWeather = data.monthlyWeather;
        console.log(this.monthlyWeather);

      }
    });
    this.MonthlyAvgTempChart.monthlyWeatherChart().subscribe({
      next: (data) => {
        this.MonthlyAvgTemperature = data.MonthlyAvgTemperature
        this.loading = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loading = false;
      }

      // console.log(this.MonthlyAvgTemperature);

    })
    // this.MonthlyAvgTemperature = this.MonthlyAvgTempChart.monthlyWeatherChart()
    // console.log(this.MonthlyAvgTemperature);
    HC_exporting(Highcharts);
    }
    // this.MonthlyAvgTempChart.monthlyWeatherChart().subscribe((data)=>){
    //   console.log(data);
    // }
    // HC_exporting(Highcharts);


}
