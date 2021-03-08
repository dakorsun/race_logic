import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Home from 'Pages/Home';
import Login from 'Pages/Login';

interface Route {
  link: string
  title: string
  component: ComponentType<RouteComponentProps> | ComponentType
}

const Pages: Array<Route> = [
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

export default Pages;
