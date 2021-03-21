import { makeVar, useApolloClient } from '@apollo/client';
// import { makeVar } from '@apollo/client';
import { AUTH_TOKEN_NAME } from '../../../config/constants';
import { UserRoles } from '../../../config/types';

export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem(AUTH_TOKEN_NAME));
export const userRoleVar = makeVar<UserRoles | null>(null);

export const useAuthToken = (): [string, (authToken: string) => void, () => void] => {
  const setAuthToken = async (authToken: string) => {
    await localStorage.setItem(AUTH_TOKEN_NAME, authToken);
    await isLoggedInVar(!!authToken);
  };
  const removeAuthToken = async () => {
    await localStorage.setItem(AUTH_TOKEN_NAME, '');
    await isLoggedInVar(false);
    await userRoleVar(null);
  };
  return [localStorage.getItem(AUTH_TOKEN_NAME), setAuthToken, removeAuthToken];
};

export const useLogout = () => {
  const [, , removeAuthToken] = useAuthToken();
  const apolloClient = useApolloClient();

  return async () => {
    await apolloClient.resetStore();
    removeAuthToken();
  };
};
