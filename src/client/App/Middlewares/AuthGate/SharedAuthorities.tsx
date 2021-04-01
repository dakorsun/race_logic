import React from 'react';
import { SharedPages, PagesToNavigationMapper, PagesToRoutesMapper } from '../../../Pages/Routes';
import { Switch } from 'react-router-dom';

function SharedAuthorities(): JSX.Element {
  return (
    <>
      <div className="header">
        <div className="left_block">
          {PagesToNavigationMapper(SharedPages)}
        </div>
      </div>

      <Switch>
        {PagesToRoutesMapper(SharedPages)}
      </Switch>
    </>
  );
}

export default SharedAuthorities;
