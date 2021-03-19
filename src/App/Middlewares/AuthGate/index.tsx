import React from 'react';
import { useApolloClient } from '@apollo/client';
import SharedAuthorities from './SharedAuthorities';
import { UserRoles } from '../../../config/types';
import { useMeQuery } from '../../../apollo/queries/user';
import { AUTH_TOKEN_NAME } from '../../../config/constants';
import AdminAuthorities from './AdminAuthorities';

export const useAuthToken = (): [string, (authToken: string) => void, () => void] => {
  const setAuthToken = (authToken: string) => localStorage.setItem(AUTH_TOKEN_NAME, authToken);
  const removeAuthToken = () => localStorage.setItem(AUTH_TOKEN_NAME, '');
  return [localStorage.getItem(AUTH_TOKEN_NAME), setAuthToken, removeAuthToken];
};

export const useLogout = () => {
  const [, , removeAuthToken] = useAuthToken();
  const apolloClient = useApolloClient();

  const logout = async () => {
    await apolloClient.clearStore();
    removeAuthToken();
  };
  return logout;
};

export const AuthGate = (): JSX.Element => {
  const userData = useMeQuery();
  if (userData.data && userData.data.me.role === UserRoles.ROLE_ADMIN) {
    return <AdminAuthorities />;
  }
  return <SharedAuthorities />;
};
