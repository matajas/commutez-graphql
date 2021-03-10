import { GraphQLScalarType } from "graphql";

const resolvers = {
    Query: {
        trainsFromMalmo: async (_source, { stationId }, { dataSources }) => {
            return dataSources.swedishTrainsAPI.getSwedishTrains(stationId);
        },
        trainsFromCopenhagen: async (_source, { stationId }, { dataSources }) => {
            return dataSources.danishTrainsAPI.getDanishTrains(stationId);
        },
        bourbonPrice: async (_source, {}, { dataSources }) => {
            return dataSources.bourbonPriceAPI.getBourbonPrice();
        },
    },
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Date custom scalar type",
        parseValue(value) {
            return new Date(value); // value from the client
        },
        serialize(value) {
            return value && new Date(Date.parse(value));
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10); // ast value is always in string format
            }
            return null;
        },
    }),
};

export default resolvers;
