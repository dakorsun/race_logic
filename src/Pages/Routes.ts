import { ComponentType } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Home from 'Pages/Home';

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
];

export default Pages;
