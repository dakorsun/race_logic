import React from 'react';
import { AuthGate } from './Middlewares/AuthGate';
import './index.sass';

function App(): JSX.Element {
  return (
    <AuthGate />
  );
}

export default App;
