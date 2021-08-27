import { add, format, parseISO, getMonth } from 'date-fns';

export const decorateMember = (member: any) => {
  if (member.birthDate) {
    const finalDate = new Date(add(parseISO(member.birthDate), { hours: 9 }));
    Object.assign(member, { birthDate: format(finalDate, 'yyyy-MM-dd') });
  }
};

export const decorateMemberList = (memberList: any[]) => {
  memberList.map(member => {
    const actualMonth = getMonth(new Date());
    const lastPayment = member.payments[0];
    Object.assign(member, { isPaid: lastPayment.monthReference === actualMonth });
  });
};
