import React from 'react';
import { AdminPages } from 'Pages/Routes';
import { Link, Route, Switch } from 'react-router-dom';
import LogoutComponent from '../../Components/Logout';

function AdminAuthorities(): JSX.Element {
  return (
    <>
      <div className="header">
        <div className="left-block">
          {/* eslint-disable-next-line react/no-array-index-key */}
          {AdminPages.map((page) => <span key={page.link}><Link to={page.link}>{page.title}</Link></span>)}
        </div>
        <div className="right-block">
          <LogoutComponent />
        </div>
      </div>

      <Switch>
        {AdminPages.map(
          // eslint-disable-next-line react/no-array-index-key
          (page) => <Route exact path={page.link} component={page.component} key={page.link} />,
        )}
      </Switch>
    </>
  );
}

export default AdminAuthorities;
