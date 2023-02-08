export const isDateEqual = (date1, date2) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export const toOnlyDateString = (date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

const time12Formatter = new Intl.DateTimeFormat("ru-RU", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

export const toTime12String = (date) => time12Formatter.format(date);
