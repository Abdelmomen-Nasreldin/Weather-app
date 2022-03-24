import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { HighchartsChartModule } from 'highcharts-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodayComponent } from './components/today/today.component';
import { DailyComponent } from './components/daily/daily.component';
import { MonthlyComponent } from './components/monthly/monthly.component';

@NgModule({
  declarations: [
    AppComponent,
    TodayComponent,
    DailyComponent,
    MonthlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HighchartsChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
