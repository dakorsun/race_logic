import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Home from 'Pages/Home';
import Login from 'Pages/Login';

interface Route {
  link: string
  title: string
  component: ComponentType<RouteComponentProps> | ComponentType
}

export const SharedPages: Array<Route> = [
  {
    link: '/',
    title: 'Home',
    component: Home,
  },
  {
    link: '/login',
    title: 'Login',
    component: Login,
  },
];

// interface AdminPagesMapOptions {
//
// }
export const AdminPagesMap = (
  // options: AdminPagesMapOptions
): Array<Route> => {
  const result = [
    {
      link: '/',
      title: 'Admin Home',
      component: Home,
    },
  ];
  // result.push({
  //   link: '/logout',
  //   title: 'Logout',
  //   component: Logout,
  // });
  return result;
};
