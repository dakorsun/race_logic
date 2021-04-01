import React from 'react';
import LoginComponent from '../../../App/Components/Login';

const LoginPage = (): JSX.Element =>
  // eslint-disable-next-line global-require
  (
    <section className="login">
      <LoginComponent />
    </section>
  );
export default LoginPage;
