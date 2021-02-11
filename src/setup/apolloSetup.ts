import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import { EventResolver } from '../resolvers/Event.resolver';
import { LapResolver } from '../resolvers/Lap.resolver';
import { RaceResolver } from '../resolvers/Race.resolver';
import { RacerResolver } from '../resolvers/Racer.resolver';
import { RacerAtEventResolver } from '../resolvers/RacerAtEvent.resolver';
import { RacerAtRaceResolver } from '../resolvers/RacerAtRace.resolver';

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
