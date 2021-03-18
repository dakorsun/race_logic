import React from 'react';
import SharedAuthorities from './SharedAuthorities';
import { UserRoles } from '../../../config/types';
import { useMeQuery } from '../../../apollo/queries/user';

export const AuthGate = (): JSX.Element => {
  const userData = useMeQuery();
  if (userData.data && userData.data.me.role === UserRoles.ROLE_ADMIN) {
    return <SharedAuthorities />;
  }
  return <SharedAuthorities />;
};
