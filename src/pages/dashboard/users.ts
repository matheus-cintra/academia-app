const alunos: any[] = [
  {
    id: 1,
    name: 'Matheus Cintra',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '13/03/2021',
    status: 'PENDING',
  },
  {
    id: 2,
    name: 'Jean Sido',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '02/03/2021',
    status: 'PAID',
  },
  {
    id: 3,
    name: 'Marcio Junior',
    plano: 'Trimestral',
    valor: 'R$180,00',
    vencimento: '09/03/2021',
    status: 'PENDING',
  },
  {
    id: 4,
    name: 'Murilo Rabelo',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '05/03/2021',
    status: 'PAID',
  },
  {
    id: 5,
    name: 'Lucas Romão',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '12/03/2021',
    status: 'PENDING',
  },
  {
    id: 6,
    name: 'Matheus Cintra',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '13/03/2021',
    status: 'PENDING',
  },
  {
    id: 7,
    name: 'Jean Sido',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '02/03/2021',
    status: 'PAID',
  },
  {
    id: 8,
    name: 'Marcio Junior',
    plano: 'Trimestral',
    valor: 'R$180,00',
    vencimento: '09/03/2021',
    status: 'PENDING',
  },
  {
    id: 9,
    name: 'Murilo Rabelo',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '05/03/2021',
    status: 'PAID',
  },
  {
    id: 10,
    name: 'Lucas Romão',
    plano: 'Mensal',
    valor: 'R$75,00',
    vencimento: '12/03/2021',
    status: 'PENDING',
  },
];

export const getUser = async (): Promise<any> => {
  return await new Promise(resolve => {
    setTimeout(() => resolve(alunos), 2000);
  });
};
