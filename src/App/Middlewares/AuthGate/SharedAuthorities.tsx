import React from 'react';
import { SharedPages } from 'Pages/Routes';
import { Link, Route, Switch } from 'react-router-dom';

function SharedAuthorities(): JSX.Element {
  return (
    <>
      <div className="header">
        <div className="left_block">
          {/* eslint-disable-next-line react/no-array-index-key */}
          {SharedPages.map((page) => <span key={page.link}><Link to={page.link}>{page.title}</Link></span>)}
        </div>
      </div>

      <Switch>
        {SharedPages.map(
          // eslint-disable-next-line react/no-array-index-key
          (page) => <Route exact path={page.link} component={page.component} key={page.link} />,
        )}
      </Switch>
    </>
  );
}

export default SharedAuthorities;
