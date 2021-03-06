import { gql } from "apollo-server";

const schemas = gql`
  scalar Date

  type TrainDepartureSE {
    AdvertisedTimeAtLocation: Date
    AdvertisedTrainIdent: String
    EstimatedTimeAtLocation: Date
    TimeAtLocation: Date
    TrackAtLocation: String
    Deviation: [String]
    OtherInformation: [String]
    Canceled: Boolean
  }

  type TrainDepartureDK {
    time: String
    rtTime: String
    track: String
    rtTrack: String
    finalStop: String
    direction: String
  }

  type Query {
    trainsFromMalmo(stationId: String): [TrainDepartureSE]
    trainsFromCopenhagen(stationId: String): [TrainDepartureDK]
    bourbonPrice: String
  }
`;

export default schemas;
