import { AccountBalance, AccountCircle, LocalOffer, Receipt, Dashboard, Settings } from '@material-ui/icons';
import React, { ReactElement } from 'react';

interface IRoute {
  key: string;
  name: string;
  icon: ReactElement;
  path: string;
}

const sidenavRoutes: IRoute[] = [
  {
    key: 'dashboard',
    name: 'Home',
    icon: <Dashboard fontSize={'medium'} />,
    path: '/dashboard',
  },
  {
    key: 'members',
    name: 'Alunos',
    icon: <AccountCircle fontSize={'medium'} />,
    path: '/members',
  },
  {
    key: 'payments',
    name: 'Pagamentos',
    icon: <Receipt fontSize={'medium'} />,
    path: '/payments',
  },
  // {
  //   key: 'plans',
  //   name: 'Planos',
  //   icon: <ShoppingCart fontSize={'medium'} />,
  //   path: '/plans',
  // },
  {
    key: 'billing',
    name: 'Faturamento',
    icon: <AccountBalance fontSize={'medium'} />,
    path: '/billing',
  },
  {
    key: 'promotions',
    name: 'Promoções',
    icon: <LocalOffer fontSize={'medium'} />,
    path: '/promotions',
  },
  {
    key: 'management',
    name: 'Configurações',
    icon: <Settings fontSize={'medium'} />,
    path: '/settings',
  },
];

export default sidenavRoutes;
