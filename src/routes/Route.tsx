import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ApplicationBar from '../components/AppBar';
import LoginComponent from '../pages/login';
import { useAuth } from '../contexts/auth';

const RouteWrapper = ({ component: Component, isPrivate, ...rest }: any) => {
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
          <>
            <Redirect to='/' />
            <LoginComponent />
          </>
        )
      }
    />
  );
};

export default RouteWrapper;
