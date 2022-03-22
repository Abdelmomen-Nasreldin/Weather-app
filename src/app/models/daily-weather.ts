import { Astronomy } from "./astronomy";
import { HourlyWeather } from "./hourly-weather";

export interface DailyWeather {
  date: Date,
  avgtempC: string,
  maxtempC: string,
  mintempC: string,
  sunHour: string,
  hourly: HourlyWeather[],
  astronomy : Astronomy[]
}
