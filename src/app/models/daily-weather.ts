import { Astronomy } from "./astronomy";
import { HourlyWeather } from "./hourly-weather";

export class DailyWeather {
  constructor(
    public date: string,
    public avgtempC: string,
    public maxtempC: string,
    public mintempC: string,
    public sunHour: string,
    public hourly: HourlyWeather[],
    public astronomy: Astronomy[],
  ) {}
  static getInstance(data: any): DailyWeather {
    return new DailyWeather(
      data.date,
      data.avgtempC,
      data.maxtempC,
      data.mintempC,
      data.sunHour,
      data.hourly,
      data.astronomy,
    );
  }
}
