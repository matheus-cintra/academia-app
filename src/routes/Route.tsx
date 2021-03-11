import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import ApplicationBar from '../components/AppBar';
import LoginComponent from '../pages/login';
import { useAuth } from '../contexts/auth';
import { CircularProgress } from '@material-ui/core';

const RouteWrapper = ({ component: Component, isPrivate, ...rest }: any) => {
  const { signed, isWaiting } = useAuth();

  if (isWaiting) {
    return <CircularProgress size={64} />;
  }

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
