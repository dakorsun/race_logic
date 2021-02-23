import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { EventResolver } from '../apollo/resolvers/Event.resolver';
import { LapResolver } from '../apollo/resolvers/Lap.resolver';
import { RaceResolver } from '../apollo/resolvers/Race.resolver';
import { RacerResolver } from '../apollo/resolvers/Racer.resolver';
import { RacerAtEventResolver } from '../apollo/resolvers/RacerAtEvent.resolver';
import { RacerAtRaceResolver } from '../apollo/resolvers/RacerAtRace.resolver';

export default async () => {
  const schema = await buildSchema({
    resolvers: [
      EventResolver,
      LapResolver,
      RaceResolver,
      RacerResolver,
      RacerAtEventResolver,
      RacerAtRaceResolver,
    ],
  }) as GraphQLSchema;
  return new ApolloServer({ schema } as ApolloServerExpressConfig);
};
