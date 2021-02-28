import {
  PersonOutline,
  ReceiptOutlined,
  AssignmentLateOutlined,
  LocalAtmOutlined,
  MonetizationOnOutlined,
} from '@material-ui/icons';
import React from 'react';

export const getMembershipTypes = () => [
  {
    key: 'free',
    name: 'Gratuito',
    price: 'R$0,00',
    enabled: true,
    hasMembership: true,
    hasNotification: true,
    hasInvoicing: false,
    hasCosts: false,
    membersIcon: <PersonOutline />,
    membersText: '100 Alunos',
    membershipIcon: <ReceiptOutlined />,
    membershipText: 'Mensalidades',
    notifyLateIcon: <AssignmentLateOutlined />,
    notifyLateText: 'Notificação de Atraso',
    invoicingIcon: <LocalAtmOutlined />,
    invoicingText: 'Faturamento',
    costsIcon: <MonetizationOnOutlined />,
    costsText: 'Controle de Custos',
  },
  {
    key: 'professional',
    enabled: false,
    name: 'Profissional',
    price: 'R$49,90',
    hasMembership: true,
    hasNotification: true,
    hasInvoicing: true,
    hasCosts: true,
    membersIcon: <PersonOutline />,
    membersText: '1000 Alunos',
    membershipIcon: <ReceiptOutlined />,
    membershipText: 'Mensalidades',
    notifyLateIcon: <AssignmentLateOutlined />,
    notifyLateText: 'Notificação de Atraso',
    invoicingIcon: <LocalAtmOutlined />,
    invoicingText: 'Faturamento',
    costsIcon: <MonetizationOnOutlined />,
    costsText: 'Controle de Custos',
  },
  {
    key: 'custom',
    enabled: false,
    name: 'Ilimitado',
    price: 'Verificar',
    hasMembership: true,
    hasNotification: true,
    hasInvoicing: true,
    hasCosts: true,
    membersIcon: <PersonOutline />,
    membersText: 'Alunos Ilimitados',
    membershipIcon: <ReceiptOutlined />,
    membershipText: 'Mensalidades',
    notifyLateIcon: <AssignmentLateOutlined />,
    notifyLateText: 'Notificação de Atraso',
    invoicingIcon: <LocalAtmOutlined />,
    invoicingText: 'Faturamento',
    costsIcon: <MonetizationOnOutlined />,
    costsText: 'Controle de Custos',
  },
];
