import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation loginMutation(
    $email: String!
    $password: String!
  ) {
    login(credentials: {email: $email, password: $password}) {
      token
    }
  }
`;
