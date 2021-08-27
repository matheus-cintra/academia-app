import React from 'react';
import { Switch } from 'react-router-dom';
import LoginComponent from '../pages/login';
import DashboardComponent from '../pages/dashboard';
import MembersList from '../pages/members/membersList';
import Route from './Route';
import MembersCreateEdit from '../pages/members/memberCreateEdit';
import AccountsCreateEdit from '../pages/accounts/accountsCreateEdit';
import SystemSettings from '../pages/settings/settings';
import NotImplementedYet from '../components/NotImplementedYet';

const Routes: React.FC = () => (
  <Switch>
    <Route path='/' isPrivate={false} exact component={LoginComponent} />
    <Route path='/dashboard' isPrivate={true} exact component={DashboardComponent} />
    <Route path='/members' isPrivate={true} exact component={MembersList} />
    <Route path='/payments' isPrivate={true} exact component={() => <NotImplementedYet pageName='pagamentos' />} />
    <Route path='/billing' isPrivate={true} exact component={() => <NotImplementedYet pageName='faturamento' />} />
    <Route path='/promotions' isPrivate={true} exact component={() => <NotImplementedYet pageName='promoções' />} />
    <Route path='/members/:id' isPrivate={true} exact component={(props: any) => <MembersCreateEdit {...props} />} />
    <Route path='/account/' isPrivate={true} exact component={(props: any) => <AccountsCreateEdit {...props} />} />
    <Route path='/settings' isPrivate={true} exact component={(props: any) => <SystemSettings {...props} />} />
  </Switch>
);

export default Routes;
