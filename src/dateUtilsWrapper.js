import { addMonths as addMonthsFn, format, isValid } from 'date-fns';

export function getSafeDate(date) {
  if (date instanceof Date && isValid(date)) return date;
  if (typeof date === 'string') {
    const parsed = parseISO(date);
    if (isValid(parsed)) return parsed;
  }
  return new Date();
}

export function addMonths(date, amount) {
  const d = date instanceof Date && isValid(date) ? date : new Date();
  const result = addMonthsFn(d, amount);
  return isValid(result) ? result : new Date();
}

export function customFormat(date, dateFormat) {
  const safeDate = getSafeDate(date);
  return format(safeDate, dateFormat);
}

export default {
  addMonths,
  customFormat,
  getSafeDate,
};

