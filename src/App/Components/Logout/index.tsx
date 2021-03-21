import React, { useContext } from 'react';
/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
import { useHistory } from 'react-router-dom';
import { useLogout } from '../../Hooks/UseAuthToken';
// eslint-disable-next-line import/no-cycle
import { AuthUserContext } from '../../Middlewares/AuthGate';

const LogoutComponent = (): JSX.Element => {
  const history = useHistory();
  const logout = useLogout();
  const { update } = useContext(AuthUserContext);

  const handleCLick = async () => {
    await logout();
    await update();
    history.push('/login');
  };

  return (
    <div onClick={async (e) => {
      e.preventDefault();
      await handleCLick();
    }}
    >
      Logout
    </div>
  );
};

export default LogoutComponent;
