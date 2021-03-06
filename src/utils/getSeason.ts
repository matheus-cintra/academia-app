import { getMonth } from 'date-fns';

export default function getSeason() {
  const month = getMonth(Date.now());
  if (month > 1 && month < 6) {
    return 'fall';
  } else if (month > 4 && month < 9) {
    return 'winter';
  } else if (month > 7 && month < 11) {
    return 'spring';
  } else {
    return 'summer';
  }
}
