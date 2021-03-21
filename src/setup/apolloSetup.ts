import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { GraphQLSchema } from 'graphql';
import { ApolloServerExpressConfig } from 'apollo-server-express';
// eslint-disable-next-line import/no-cycle
import AuthResolver from '../apollo/resolvers/Auth.resolver';
import EventResolver from '../apollo/resolvers/Event.resolver';
import LapResolver from '../apollo/resolvers/Lap.resolver';
import RaceResolver from '../apollo/resolvers/Race.resolver';
import RacerResolver from '../apollo/resolvers/Racer.resolver';
import RacerAtEventResolver from '../apollo/resolvers/RacerAtEvent.resolver';
import RacerAtRaceResolver from '../apollo/resolvers/RacerAtRace.resolver';
import UserResolver from '../apollo/resolvers/User.resolver';
import AuthService, { AuthorizedUser } from '../services/Auth';
import UserService from '../services/User';

export interface Context {
  req: Request
  user: AuthorizedUser;
}

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
    context: async ({ req }) => {
      try {
        let user = null;
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          const decoded = AuthService.decodeUserToken(req.headers.authorization.split(' ')[1]);
          if (decoded) {
            user = await UserService.getAuthorizedUserById(decoded.id);
          }
        }

        const context = {
          req,
          user, // `req.user` comes from `express-jwt`
        };
        return context;
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
  } as ApolloServerExpressConfig);
};
