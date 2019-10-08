import { RESTDataSource } from "apollo-datasource-rest";

export default class DanishTrainAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BASE_URL_DK;
  }

  async getDanishTrains(stationId = "008600856") {
    const result = await this.get(
      `${this.baseURL}/departureBoard?id=${stationId}&offsetTime=0&useBus=0&useMetro=0&format=json`
    );

    const trainsToSweden = result.DepartureBoard.Departure.filter(
      d => d.track === "1" && d.finalStop !== "CPH Lufthavn"
    );

    return trainsToSweden;
  }
}
