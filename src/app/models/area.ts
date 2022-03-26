export class Area {
  constructor(
    public areaName: string,
    public region: string,
    public country: string,
    public weatherUrl?: string,

  ){}
  static getInstance(data: any): Area {
    return new Area(
      data.areaName[0].value,
      data.region[0].value,
      data.country[0].value,
      // data.weatherUrl[0]?.value,
    );
  }
}
