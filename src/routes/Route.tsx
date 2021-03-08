import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import ApplicationBar from '../components/AppBar';

export default function RouteWrapper({ component: Component, isPrivate, ...rest }: any) {
  const { signed } = useAuth();

  if (!signed && isPrivate) {
    return <Redirect to='/' />;
  }

  if (signed && !isPrivate) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Route
      {...rest}
      render={props =>
        signed ? (
          <React.Fragment>
            <ApplicationBar />
            <Component {...props} />
          </React.Fragment>
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
