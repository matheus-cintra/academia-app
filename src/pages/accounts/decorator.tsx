import { add, format, parseISO } from 'date-fns';

export const decorateAccount = (account: any, initial: any) => {
  if (account.birthDate) {
    const finalDate = new Date(add(parseISO(account.birthDate), { hours: 9 }));
    Object.assign(account, { birthDate: format(finalDate, 'yyyy-MM-dd') });
  }

  const keys = Object.keys(initial);
  for (const key of keys) {
    if (!account[key]) account[key] = '';
  }
};
