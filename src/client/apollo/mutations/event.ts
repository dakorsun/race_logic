import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client/core';

const CREATE_EVENT_MUTATION = gql`
  mutation createEvent(
    $name: String!
    $dateFrom: DateTime!
    $dateTo: DateTime!
  ) {
    createEvent (data: {
      name: $name,
      dateFrom: $dateFrom,
      dateTo: $dateTo
    }) {
      id
    }
  }
`;

export const useCreateEventMutation = () => useMutation(CREATE_EVENT_MUTATION);
