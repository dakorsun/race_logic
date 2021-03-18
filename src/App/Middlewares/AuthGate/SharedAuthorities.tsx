import React from 'react';
import { SharedPages } from 'Pages/Routes';
import { Link, Route, Switch } from 'react-router-dom';

function SharedAuthorities(): JSX.Element {
  return (
    <>
      <div className="menu">
        {/* eslint-disable-next-line react/no-array-index-key */}
        {SharedPages.map((page, index) => <Link to={page.link} key={index}>{page.title}</Link>)}
      </div>

      <Switch>
        {SharedPages.map(
          // eslint-disable-next-line react/no-array-index-key
          (page, index) => <Route exact path={page.link} component={page.component} key={index} />,
        )}
      </Switch>
    </>
  );
}

export default SharedAuthorities;
