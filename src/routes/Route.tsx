import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import MenuAppBar from '../components/appBar';

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

  return (
    <Route
      {...rest}
      render={props =>
        signed ? (
          <React.Fragment>
            <MenuAppBar />
            <Component {...props} />
          </React.Fragment>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

//<Component {...props} />
