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

  type Query {
    trainsFromMalmo: [TrainDepartureSE]
  }
`;

export default schemas;
