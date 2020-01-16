import { RESTDataSource } from "apollo-datasource-rest";

export default class MalmoBusAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BASE_URL_BUS;
  }

  async getMalmoBuses(stopId = "80046") {
    const result = await this.get(`${this.baseURL}?selPointFrKey=${stopId}`);
  }
}
