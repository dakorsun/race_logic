import { gql } from '@apollo/client/core';
import { useQuery } from '@apollo/client';
import clientConfig from '../../../config/clientConfig';

const GET_EVENTS_QUERY = gql`
  query getEvents {
    events (parameters: {}) {
      id 
      name
      dateFrom
      dateTo
      createdAt
      updatedAt
    }
  }
`;

export const useGetEventsQuery = () => useQuery(GET_EVENTS_QUERY, { pollInterval: clientConfig.APOLLO.QUERY.POLL_INTERVAL });
