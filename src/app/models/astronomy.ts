export class Astronomy {
  constructor(
    public moonrise: string,
    public moonset: string,
    public sunrise: string,
    public sunset: string,

  ){}
  static getInstance(data: any): Astronomy {
    return new Astronomy(
      data.moonrise,
      data.moonset,
      data.sunrise,
      data.sunset,
    );
  }
}

