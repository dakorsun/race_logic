import React from 'react';
import { AdminPages, PagesToNavigationMapper, PagesToRoutesMapper } from 'Pages/Routes';
import { Switch } from 'react-router-dom';
// eslint-disable-next-line import/no-cycle
import LogoutComponent from '../../Components/Logout';

function AdminAuthorities(): JSX.Element {
  return (
    <>
      <div className="header">
        <div className="left-block">
          {PagesToNavigationMapper(AdminPages)}
        </div>
        <div className="right-block">
          <LogoutComponent />
        </div>
      </div>

      <Switch>
        {PagesToRoutesMapper(AdminPages)}
      </Switch>
    </>
  );
}

export default AdminAuthorities;
