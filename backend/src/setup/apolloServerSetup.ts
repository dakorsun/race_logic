import { buildSchemaSync } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { ApolloServer } from 'apollo-server';
import path from 'path';
import { ApolloServerExpressConfig } from 'apollo-server-express';
// eslint-disable-next-line import/no-cycle
import AuthResolver, { AuthorizedUser } from '../resolvers/Auth.resolver';
import UserService from '../services/User';
import AuthService from '../services/Auth';
import EventResolver from '../resolvers/Event.resolver';
import UserResolver from '../resolvers/User.resolver';

export interface Context {
  req: Request
  user: AuthorizedUser;
}

export default async (): Promise<ApolloServer> => {
  const schema = buildSchemaSync({
    resolvers: [
      AuthResolver,
      EventResolver,
      UserResolver,
    ],
    emitSchemaFile: process.env.NODE_ENV === 'development'
      ? {
        path: path.resolve(__dirname, '../../schema.gql'),
      }
      : false,
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
