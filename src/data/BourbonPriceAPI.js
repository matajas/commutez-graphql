import { RESTDataSource } from "apollo-datasource-rest";

export default class BourbonPriceAPI extends RESTDataSource {
    constructor() {
        super();
        this.bourbonURL = process.env.BOURBON_URL;
    }

    async getBourbonPrice() {
        const bourbonPriceResult = await this.get(this.bourbonURL);
        const salesPrice = bourbonPriceResult && bourbonPriceResult.doc ? bourbonPriceResult.doc.display_sales_price : "N/A";
        return salesPrice;
    }
}
