import { add, format, parseISO } from 'date-fns';

export const decorateMember = (member: any) => {
  if (member.birthDate) {
    const finalDate = new Date(add(parseISO(member.birthDate), { hours: 9 }));
    Object.assign(member, { birthDate: format(finalDate, 'yyyy-MM-dd') });
  }
};
