import { ApolloClient, InMemoryCache } from '@apollo/client';
import appConfig from '../config/appConfig';

const client = new ApolloClient({
  uri: `${appConfig.HOST}:${appConfig.APOLLO_PORT}`,
  cache: new InMemoryCache(),
});

export default client;
