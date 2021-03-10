import React from 'react';
import { Switch } from 'react-router-dom';
import LoginComponent from '../pages/login';
import DashboardComponent from '../pages/dashboard';
import MembersList from '../pages/members/membersList';
import Route from './Route';
import MembersCreateEdit from '../pages/members/memberCreateEdit';

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' isPrivate={false} exact component={LoginComponent} />
    <Route path='/dashboard' isPrivate={true} exact component={DashboardComponent} />
    <Route path='/members' isPrivate={true} exact component={MembersList} />
    <Route path='/members/:id' isPrivate={true} exact component={(props: any) => <MembersCreateEdit {...props} />} />
  </Switch>
);

export default Routes;
