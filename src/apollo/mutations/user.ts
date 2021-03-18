import { gql, useMutation } from '@apollo/client';
import { AUTH_TOKEN } from '../../config/constants';

export const LOGIN_MUTATION = gql`
  mutation loginMutation(
    $email: String!
    $password: String!
  ) {
    login(credentials: {email: $email, password: $password}) {
      id
      email
      firstName
      lastName
      role
      token
    }
  }
`;

export const useLoginMutation = () => useMutation(LOGIN_MUTATION, {
  onCompleted: (data) => {
    localStorage.setItem(AUTH_TOKEN, data.login.token);
  },
});
