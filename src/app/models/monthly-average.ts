export class MonthlyAverage {
  constructor(
    public name: string,
    public absMaxTemp: string,
    public avgMinTemp: string
  ) {}
  static getInstance(data: any): MonthlyAverage {
    return new MonthlyAverage(data.name, data.absMaxTemp, data.avgMinTemp);
  }
}
