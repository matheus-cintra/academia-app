import {
  AccountBalance,
  AccountCircle,
  LocalOffer,
  Receipt,
  ShoppingCart,
  Dashboard,
  Settings,
} from '@material-ui/icons';
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
    icon: <Dashboard fontSize={'default'} />,
    path: '/dashboard',
  },
  {
    key: 'members',
    name: 'Alunos',
    icon: <AccountCircle fontSize={'default'} />,
    path: '/members',
  },
  {
    key: 'payments',
    name: 'Pagamentos',
    icon: <Receipt fontSize={'default'} />,
    path: '/payments',
  },
  // {
  //   key: 'plans',
  //   name: 'Planos',
  //   icon: <ShoppingCart fontSize={'default'} />,
  //   path: '/plans',
  // },
  {
    key: 'billing',
    name: 'Faturamento',
    icon: <AccountBalance fontSize={'default'} />,
    path: '/billing',
  },
  {
    key: 'promotions',
    name: 'Promoções',
    icon: <LocalOffer fontSize={'default'} />,
    path: '/promotions',
  },
  {
    key: 'management',
    name: 'Gerenciamento',
    icon: <Settings fontSize={'default'} />,
    path: '/accounts',
  },
];

export default sidenavRoutes;
