import { FunctionComponent } from 'react';
import {
  ApolloClient, ApolloProvider, createHttpLink, InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import fetch from 'cross-fetch';
import { ApolloProviderProps } from '@apollo/client/react/context';
import clientConfig from '../../config/clientConfig';
import { useAuthToken } from '../App/Hooks/UseAuthToken';

const httpLink = createHttpLink({
  uri: `${clientConfig.APOLLO.HOST}:${clientConfig.APOLLO.PORT}`,
  fetch,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const [token] = useAuthToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || '',
    },
  };
});
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const useApollo = (): [FunctionComponent<ApolloProviderProps<any>>, ApolloClient<any>] => ([
  ApolloProvider,
  client,
]);

export default useApollo;
