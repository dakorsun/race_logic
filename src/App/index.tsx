import React from 'react';
import {
  Link,
  Switch,
  Route,
} from 'react-router-dom';
import Pages from 'Pages/Routes';
import './index.sass';

function App(): JSX.Element {
  return (
    <>
      <div className="menu">
        {/* eslint-disable-next-line react/no-array-index-key */}
        {Pages.map((page, index) => <Link to={page.link} key={index}>{page.title}</Link>)}
      </div>

      <Switch>
        {Pages.map(
          // eslint-disable-next-line react/no-array-index-key
          (page, index) => <Route exact path={page.link} component={page.component} key={index} />,
        )}
      </Switch>
    </>
  );
}

export default App;
