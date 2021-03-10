import { ApolloServer } from "apollo-server";
import resolvers from "./resolvers";
import typeDefs from "./schema";
import SwedishTrainsAPI from "./data/SwedishTrainsAPI";
import DanishTrainsAPI from "./data/DanishTrainsAPI";
import dotEnv from "dotenv";
import BourbonPriceAPI from "./data/BourbonPriceAPI";

dotEnv.config();

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => {
        return {
            swedishTrainsAPI: new SwedishTrainsAPI(),
            danishTrainsAPI: new DanishTrainsAPI(),
            bourbonPriceAPI: new BourbonPriceAPI(),
        };
    },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
