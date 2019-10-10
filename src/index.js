import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import SwedishTrainsAPI from "./data/SwedishTrainsAPI";
import DanishTrainsAPI from "./data/DanishTrainsAPI";
import dotEnv from "dotenv";

dotEnv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      swedishTrainsAPI: new SwedishTrainsAPI(),
      danishTrainsAPI: new DanishTrainsAPI()
    };
  }
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
