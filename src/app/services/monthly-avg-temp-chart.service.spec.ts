import { TestBed } from '@angular/core/testing';

import { MonthlyAvgTempChartService } from './monthly-avg-temp-chart.service';

describe('MonthlyAvgTempChartService', () => {
  let service: MonthlyAvgTempChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyAvgTempChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
