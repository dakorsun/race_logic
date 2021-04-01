import React, { ComponentType } from 'react';
import { RouteComponentProps, Route, Link } from 'react-router-dom';

import Home from 'Pages/Shared/Home';
import Login from 'Pages/Shared/Login';

import AdminHome from 'Pages/Admin/Home';
import AdminEventsPage from 'Pages/Admin/Events';
// import RedirectToRoot from '../App/Components/RedirectToRoot';
import NotFound from '../App/Components/NotFound';

interface Page {
  link: string
  title: string | null
  component: ComponentType<RouteComponentProps> | ComponentType
}

export const PagesToNavigationMapper = (pages: Page[]) => pages
  .reduce((accum: Page[], page: Page) => {
    if (page.title) accum.push(page);
    return accum;
  }, [])
  .map((page: Page) => <span key={page.link}><Link to={page.link}>{page.title}</Link></span>);

export const PagesToRoutesMapper = (pages: Page[]) => pages
  .map(
  // eslint-disable-next-line react/no-array-index-key
    (page) => <Route exact path={page.link} component={page.component} key={page.link} />,
  );

export const SharedPages: Array<Page> = [
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
  {
    link: '*',
    title: null,
    component: NotFound,
  },
];

export const AdminPages = [
  {
    link: '/',
    title: 'Admin',
    component: AdminHome,
  },
  {
    link: '/events',
    title: 'Events',
    component: AdminEventsPage,
  },
  {
    link: '*',
    title: null,
    component: NotFound,
  },
];
