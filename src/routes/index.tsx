import React from 'react';
import { Switch } from 'react-router-dom';
import LoginComponent from '../pages/login';
import DashboardComponent from '../pages/dashboard';
import Route from './Route';

export const Routes: React.FC = () => (
  <Switch>
    <Route path='/' isPrivate={false} exact component={LoginComponent} />
    <Route path='/dashboard' isPrivate={true} exact component={DashboardComponent} />
  </Switch>
);
