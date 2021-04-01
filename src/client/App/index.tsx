import React from 'react';
import { AuthGate } from './Middlewares/AuthGate';

function App(): JSX.Element {
  // eslint-disable-next-line global-require
  require('./index.sass');
  return (
    <AuthGate />
  );
}

export default App;
