import { RESTDataSource } from "apollo-datasource-rest";

export default class SwedishTrainsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.BASE_URL_SE;
  }

  async getSwedishTrains(stationId = "M") {
    const body = `
    <REQUEST>
	    <LOGIN authenticationkey="${process.env.AUTHKEY_SE}" />
	    <QUERY objecttype="TrainAnnouncement" schemaversion="1.3" orderby="AdvertisedTimeAtLocation">
            <FILTER>
                <AND>
                    <EQ name="ActivityType" value="Avgang" />
                    <EQ name="LocationSignature" value="${stationId}" />
                    <EQ name="ToLocation.LocationName" value="Dk.Kh" />
                    <EQ name="InformationOwner" value="Öresundståg" />
                    <EXISTS name="TimeAtLocation" value="false" />
                    <OR>
                        <AND>
                            <GT name="AdvertisedTimeAtLocation" value="$dateadd(-00:15:00)" />
                            <LT name="AdvertisedTimeAtLocation" value="$dateadd(03:00:00)" />
                        </AND>
                        <AND>
                            <LT name="AdvertisedTimeAtLocation" value="$dateadd(00:30:00)" />
                            <GT name="EstimatedTimeAtLocation" value="$dateadd(-00:15:00)" />
                        </AND>
                    </OR>
                </AND>
            </FILTER>
		    <INCLUDE>AdvertisedTrainIdent</INCLUDE>
		    <INCLUDE>AdvertisedTimeAtLocation</INCLUDE>
        <INCLUDE>EstimatedTimeAtLocation</INCLUDE>
        <INCLUDE>TimeAtLocation</INCLUDE>
        <INCLUDE>OtherInformation</INCLUDE>
		    <INCLUDE>TrackAtLocation</INCLUDE>
		    <INCLUDE>Deviation</INCLUDE>
		    <INCLUDE>Canceled</INCLUDE>
	    </QUERY>
    </REQUEST>`;

    const result = await this.post(this.baseURL, body);
    return result.RESPONSE.RESULT[0].TrainAnnouncement;
  }
}
