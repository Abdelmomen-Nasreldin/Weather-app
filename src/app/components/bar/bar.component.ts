import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import { DailyWeather } from 'src/app/models/daily-weather';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
})
export class BarComponent implements OnInit, OnChanges {
  @Input('dailyWeather') dailyWeather! : DailyWeather[]
  // dailyWeather : DailyWeather[]
  currentRate = 8;
    title = 'D3 Barchart with Angular 10';
    width: number;
    height: number;
    margin = { top: 20, right: 20, bottom: 30, left: 40 };
    x: any;
    y: any;
    svg: any;
    g: any;

    constructor() {
      this.width = 900 - this.margin.left - this.margin.right;
      this.height = 500 - this.margin.top - this.margin.bottom;
      // this.dailyWeather = this.dailyWeather2?.slice(0 , 7)
    }
    ngOnChanges(changes: SimpleChanges): void {
      // this.initSvg();
      this.initAxis();
      this.drawAxis();
      this.drawBars();
     }

    ngOnInit() {

      this.initSvg();
      // this.initAxis();
      // this.drawAxis();
      // this.drawBars();
    }

    initSvg() {
      this.svg = d3.select('#barChart')
        .append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('viewBox', '0 0 900 500');
      this.g = this.svg.append('g')
        .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
    }

    initAxis() {
      this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
      this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
      this.x.domain(this.dailyWeather.map((d) => d.date));
      this.y.domain([0, d3Array.max(this.dailyWeather, (d) => d.avgtempC)]);
    }

    drawAxis() {
      this.g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + this.height + ')')
        .call(d3Axis.axisBottom(this.x));
      this.g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3Axis.axisLeft(this.y))
        .append('text')
        .attr('class', 'axis-title')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency');
    }

    drawBars() {
      this.g.selectAll('.bar')
        .data(this.dailyWeather)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', (d:any) => this.x(d.date))
        .attr('y', (d: any) => this.y(d.avgtempC))
        .attr('width', this.x.bandwidth())
        .attr('fill', '#498bfc')
        .attr('height', (d: any) => this.height - this.y(d.avgtempC));
    }
}
