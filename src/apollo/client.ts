import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import clientConfig from '../config/clientConfig';
import { useAuthToken } from '../App/Hooks/UseAuthToken';

const httpLink = createHttpLink({
  uri: `${clientConfig.APOLLO.HOST}:${clientConfig.APOLLO.PORT}`,
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

export default client;
