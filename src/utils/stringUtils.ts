import moment from 'moment-timezone';

export const capitalizeString = (str: string): string => (
  `${str.slice(0, 1)
    .toUpperCase()}${str.slice(1)}`
);

export const formatDateToResultString = (str: null | Date): string => {
  if (str) {
    const mom = moment(new Date(str));
    return mom.format('YYYY-MM-DD');
  }
  return null;
};
