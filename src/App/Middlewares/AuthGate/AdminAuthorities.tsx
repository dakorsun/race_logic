import React from 'react';
import { AdminPagesMap } from 'Pages/Routes';
import { Link, Route, Switch } from 'react-router-dom';

function AdminAuthorities(): JSX.Element {
  const AdminPages = AdminPagesMap();
  return (
    <>
      <div className="menu">
        {/* eslint-disable-next-line react/no-array-index-key */}
        {AdminPages.map((page, index) => <Link to={page.link} key={index}>{page.title}</Link>)}
      </div>

      <Switch>
        {AdminPages.map(
          // eslint-disable-next-line react/no-array-index-key
          (page, index) => <Route exact path={page.link} component={page.component} key={index} />,
        )}
      </Switch>
    </>
  );
}

export default AdminAuthorities;
