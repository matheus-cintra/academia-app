import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

// interface IRouteWrapper {
//   component: any;
//   isPrivate: boolean;
// }

export default function RouteWrapper({ component: Component, isPrivate, ...rest }: any) {
  const { signed } = useAuth();

  if (!signed && isPrivate) {
    return <Redirect to='/' />;
  }

  if (signed && !isPrivate) {
    return <Redirect to='/dashboard' />;
  }

  // const Layout = signed ? DefaultLayout : AuthLayout;

  return <Route {...rest} render={props => <Component {...props} />} />;
}
