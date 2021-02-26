import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginComponent from '../pages/login';

export const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={LoginComponent} />
  </Switch>
);
