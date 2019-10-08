import { GraphQLScalarType } from "graphql";

const resolvers = {
  Query: {
    trainsFromMalmo: async (_source, _args, { dataSources }) => {
      return dataSources.swedishTrainAPI.getSwedishTrains();
    },
    trainsFromCopenhagen: async (_source, _argsm, { dataSources }) => {
      return dataSources.danishTrainAPI.getDanishTrains();
    }
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
    }
  })
};

export default resolvers;
