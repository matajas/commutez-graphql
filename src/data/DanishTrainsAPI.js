import { RESTDataSource } from "apollo-datasource-rest";

const knownSwedishDestinations = [
    "Hässleholm C",
    "Malmö C",
    "Karlskrona C",
    "Lund C",
    "Helsingborg C",
    "Växjö C",
    "Göteborg C",
    "Kalmar C",
    "Halmstad C",
    "Landskrona C",
];

export default class DanishTrainsAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.BASE_URL_DK;
    }

    async getDanishTrains(stationId = "008600856") {
        const result = await this.get(`${this.baseURL}/departureBoard?id=${stationId}&offsetTime=0&useBus=0&useMetro=0&format=json`);

        // Hard coded filtering on known swedish destinations
        const trainsToDenmark = result.DepartureBoard.Departure.filter((d) => knownSwedishDestinations.includes(d.finalStop));

        return trainsToDenmark;
    }
}
