export const validDate = function (date) {
  return typeof date === 'object' && date.year && date.month + 1 && date.year;
};

export const stringifyDate = function (date) {
  if (typeof date !== 'object' && validDate(date)) return '';
  return `${date.year}/${date.month}/${date.date}`;
};

export const parseStrDate = function (str) {
  if (typeof str !== 'string') return {};
  const [year, month, date] = str.split('/');
  return { year, month, date };
};

export const getMonthList = function (y, m) {
  const firsDayInCurrentMonth = new Date(
    y,
    m,
    1
  );
  const firstDayInWeek = firsDayInCurrentMonth.getDay();
  const dayBeforeFirsDayInCurrentMonth = new Date(
    y,
    m,
    (1 - (firstDayInWeek || 7))
  );
  const year = dayBeforeFirsDayInCurrentMonth.getFullYear();
  const month = dayBeforeFirsDayInCurrentMonth.getMonth();
  const date = dayBeforeFirsDayInCurrentMonth.getDate();
  const ary = [];
  for (let i = 0; i < 42; i += 1) {
    const dateObj = new Date(
      year, month, date + i
    );
    ary.push({
      year: dateObj.getFullYear(),
      month: dateObj.getMonth(),
      date: dateObj.getDate(),
    });
  }
  return ary;
};

export const getNewDateByMonth = function (y, m, d, add) {
  const dateObj = new Date(
    y,
    m + add,
    d
  );
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth(),
    date: dateObj.getDate(),
  };
};

export const getNewDateByYear = function (y, m, d, add) {
  const dateObj = new Date(
    y + add,
    m,
    d
  );
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth(),
    date: dateObj.getDate(),
  };
};

export const getIsDateBeHindCompareDate = function (a, b) {
  return (
    new Date(a.year, a.month, a.date).getTime() > new Date(b.year, b.month, b.date).getTime()
  );
};

export default {
  getMonthList,
  getNewDateByMonth,
  getNewDateByYear,
  getIsDateBeHindCompareDate,
  stringifyDate,
  parseStrDate,
  validDate,
};
