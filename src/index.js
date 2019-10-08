import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import SwedishTrainAPI from "./data/SwedishTrainAPI";
import DanishTrainAPI from "./data/DanishTrainAPI";
import dotEnv from "dotenv";

dotEnv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      swedishTrainAPI: new SwedishTrainAPI(),
      danishTrainAPI: new DanishTrainAPI()
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
