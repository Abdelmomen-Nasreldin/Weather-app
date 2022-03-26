export class CurrentCondition {
  constructor(
    public temp_C: string,
    public FeelsLikeC: string,
    public cloudcover: string,
    public humidity: string,
    public weatherDesc: string,
    public weatherIconUrl: string
  ) {}
  static getInstance(data: any): CurrentCondition {
    return new CurrentCondition(
      data.temp_C,
      data.FeelsLikeC,
      data.cloudcover,
      data.humidity,
      data.weatherDesc[0]?.value || '',
      data.weatherIconUrl
    );
  }
}
