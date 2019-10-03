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

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    trainsFromMalmo: [TrainDepartureSE]
  }
`;

export default schemas;
