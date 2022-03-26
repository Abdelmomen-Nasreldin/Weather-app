export class HourlyWeather {
  constructor(
    public time: string,
    public FeelsLikeC: string,
    public humidity: string,
    public tempC: string,
    public weatherDesc: string,
    public weatherIconUrl?: string
  ) {}
  static getInstance(data: any): HourlyWeather {
    return new HourlyWeather(
      data.time,
      data.FeelsLikeC,
      data.humidity,
      data.tempC,
      data.weatherDesc[0]?.value || '',
      data.weatherIconUrl[0].value
    );
  }
}

