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

export const AdminPages: Array<Route> = [
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
