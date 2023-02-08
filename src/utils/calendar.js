const lastDayOfMonth = (year, month) => new Date(year, month, 0);
const getDaysInMonth = (year, month) => lastDayOfMonth(year, month).getDate();

export const getMonthDates = (year, month) =>
  Array.from(
    { length: getDaysInMonth(year, month) },
    (_, index) => new Date(`${year}-${month}-${index + 1}`)
  );

export const getCalendarMonthStartDates = (year, month) => {
  const prevYear = month === 1 ? year - 1 : year;
  const prevMonth = month === 1 ? 12 : month - 1;
  const lastDayOfPrevMonth = lastDayOfMonth(prevYear, prevMonth);
  return Array.from(
    { length: lastDayOfPrevMonth.getDay() },
    (_, index) =>
      new Date(
        `${prevYear}-${prevMonth}-${lastDayOfPrevMonth.getDate() - index}`
      )
  ).reverse();
};

export const getDatesToTheEndOfCalendarMonth = (year, month) => {
  const lastDay = lastDayOfMonth(year, month);
  const nextYear = month === 12 ? year + 1 : year;
  const nextMonth = month === 12 ? 1 : month + 1;
  return Array.from(
    { length: 7 - lastDay.getDay() },
    (_, index) => new Date(`${nextYear}-${nextMonth}-${index + 1}`)
  );
};

/**
 * Calendar builder by year and month
 * @param {Number} year
 * @param {Number} month
 * @returns {Array[Date]}
 */
export const buildCalendarDates = (year, month, onlyMonthDates = false) => {
  const monthDates = getMonthDates(year, month);
  const datesToStartMonth = getCalendarMonthStartDates(year, month);
  const datesToEndMonth = getDatesToTheEndOfCalendarMonth(year, month);
  if (onlyMonthDates) {
    return [
      ...datesToStartMonth.map(() => null),
      ...monthDates,
      ...datesToEndMonth.map(() => null),
    ];
  }
  return [...datesToStartMonth, ...monthDates, ...datesToEndMonth];
};
