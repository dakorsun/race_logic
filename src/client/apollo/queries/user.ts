import { gql, useQuery } from '@apollo/client';
import clientConfig from '../../../config/clientConfig';

const ME_QUERY = gql`
  query meQuery {
    me {
      id
      email
      role
      firstName
      lastName
    }
  }   
`;

export const useMeQuery = () => useQuery(ME_QUERY, { pollInterval: clientConfig.APOLLO.QUERY.POLL_INTERVAL });
