import React, { useEffect, useState } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import SharedAuthorities from './SharedAuthorities';
import { UserRoles } from '../../../config/types';
import { useMeQuery } from '../../../apollo/queries/user';
// eslint-disable-next-line import/no-cycle
import AdminAuthorities from './AdminAuthorities';
import { isLoggedInVar, userRoleVar } from '../../Hooks/UseAuthToken';

interface IAuthoritiesMapper {
  isLoggedIn: boolean;
  role: UserRoles | null
}
//
const AuthoritiesMapper = ({ isLoggedIn, role }: IAuthoritiesMapper): JSX.Element => {
  if (isLoggedIn) {
    console.log('mapper logged in');
    if (role === UserRoles.ROLE_ADMIN) {
      console.log('mapper role admin');
      return <AdminAuthorities />;
    }
  }
  return <SharedAuthorities />;
};

interface IAuthUserContext { update: () => Promise<ApolloQueryResult<any>> | Promise<void> }
const AuthUserContextDefaultValue: IAuthUserContext = { update: async () => {} };

export const AuthUserContext = React.createContext(AuthUserContextDefaultValue);

export const AuthGate = (): JSX.Element => {
  const {
    loading,
    data,
    called,
    refetch,
  } = useMeQuery();

  const [localUserRole, setLocalUserRole] = useState(userRoleVar());
  const [localIsLoggedIn, setLocalIsLoggedIn] = useState(isLoggedInVar());

  useEffect(() => {
    (async () => {
      if (called && !loading) {
        console.log('data?.me?.role: ', data?.me?.role);
        if (data?.me?.role) {
          await userRoleVar(data?.me?.role);
          await setLocalUserRole(data?.me?.role);
          await isLoggedInVar(!!data.me);
          await setLocalIsLoggedIn(!!data.me);
          await refetch();
        } else {
          await userRoleVar(null);
          await setLocalUserRole(null);
          await isLoggedInVar(false);
          await setLocalIsLoggedIn(false);
          await refetch();
        }
      }
    })();
  },
  [data]);

  useEffect(() => {
    console.log('userRoleVar(): ', userRoleVar());
  }, [userRoleVar(), isLoggedInVar()]);

  if (loading) {
    return null;
  }

  return (
    <AuthUserContext.Provider value={{ update: refetch }}>
      <AuthoritiesMapper isLoggedIn={localIsLoggedIn} role={localUserRole} />
    </AuthUserContext.Provider>
  );
};
