import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import AuthResolver from '../apollo/resolvers/Auth.resolver';
import EventResolver from '../apollo/resolvers/Event.resolver';
import LapResolver from '../apollo/resolvers/Lap.resolver';
import RaceResolver from '../apollo/resolvers/Race.resolver';
import RacerResolver from '../apollo/resolvers/Racer.resolver';
import RacerAtEventResolver from '../apollo/resolvers/RacerAtEvent.resolver';
import RacerAtRaceResolver from '../apollo/resolvers/RacerAtRace.resolver';
import UserResolver from '../apollo/resolvers/User.resolver';

export default async () => {
  const schema = await buildSchema({
    resolvers: [
      AuthResolver,
      EventResolver,
      LapResolver,
      RaceResolver,
      RacerResolver,
      RacerAtEventResolver,
      RacerAtRaceResolver,
      UserResolver,
    ],
  }) as GraphQLSchema;
  return new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        req,
        user: req.user, // `req.user` comes from `express-jwt`
      };
      return context;
    },
  } as ApolloServerExpressConfig);
};
