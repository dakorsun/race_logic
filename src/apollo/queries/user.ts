import { gql, useQuery } from '@apollo/client';

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

export const useMeQuery = () => useQuery(ME_QUERY);
