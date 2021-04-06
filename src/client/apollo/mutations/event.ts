import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client/core';

const CREATE_EVENT_MUTATION = gql`
  mutation createEvent(
    $name: String!
    $type: String!
    $dateFrom: DateTime!
    $dateTo: DateTime!
  ) {
    createEvent (data: {
      name: $name,
      type: $type,
      dateFrom: $dateFrom,
      dateTo: $dateTo
    }) {
      id
    }
  }
`;

export const useCreateEventMutation = () => useMutation(CREATE_EVENT_MUTATION);
