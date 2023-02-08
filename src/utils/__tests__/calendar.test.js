import {
  getCalendarMonthStartDates,
  getDatesToTheEndOfCalendarMonth,
  getMonthDates,
} from "../calendar";
import { isDateEqual } from "../date";

const arraysEqual = (arr1, arr2, compare) => {
  if (arr1.length !== arr2.length) {
    return false;
  }
  arr1.forEach((el, index) => {
    if (!compare(el, arr2[index])) {
      return false;
    }
  });
  return true;
};

describe("calendar utils", () => {
  test("getCalendarMonthStartDates must return dates of calendar before start of needed month", () => {
    const forJanuary = getCalendarMonthStartDates(2023, 1);
    const forJanuaryTest = Array.from(
      { length: 6 },
      (_, index) => new Date(`2022-12-${26 + index}`)
    );
    expect(arraysEqual(forJanuary, forJanuaryTest, isDateEqual)).toBe(true);

    const forFebruary = getCalendarMonthStartDates(2023, 2);
    const forFebruaryTest = Array.from(
      { length: 2 },
      (_, index) => new Date(`2022-01-${30 + index}`)
    );
    expect(arraysEqual(forFebruary, forFebruaryTest, isDateEqual)).toBe(true);

    const forDecember = getCalendarMonthStartDates(2022, 12);
    const forDecemberTest = Array.from(
      { length: 3 },
      (_, index) => new Date(`2022-11-${28 + index}`)
    );
    expect(arraysEqual(forDecember, forDecemberTest, isDateEqual)).toBe(true);
  });

  test("getDatesToTheEndOfCalendarMonth must return dates of calendar after end of needed month", () => {
    const forJanuary = getDatesToTheEndOfCalendarMonth(2023, 1);
    const forJanuaryTest = Array.from(
      { length: 5 },
      (_, index) => new Date(`2023-02-${1 + index}`)
    );
    expect(arraysEqual(forJanuary, forJanuaryTest, isDateEqual)).toBe(true);

    const forFebruary = getDatesToTheEndOfCalendarMonth(2023, 2);
    const forFebruaryTest = Array.from(
      { length: 5 },
      (_, index) => new Date(`2022-03-${1 + index}`)
    );
    expect(arraysEqual(forFebruary, forFebruaryTest, isDateEqual)).toBe(true);

    const forDecember = getDatesToTheEndOfCalendarMonth(2022, 12);
    const forDecemberTest = Array.from(
      { length: 1 },
      (_, index) => new Date(`2023-01-${1 + index}`)
    );
    expect(arraysEqual(forDecember, forDecemberTest, isDateEqual)).toBe(true);
  });

  test("getMonthDates must return dates of calendar of needed month", () => {
    const forJanuary = getMonthDates(2023, 1);
    const forJanuaryTest = Array.from(
      { length: 31 },
      (_, index) => new Date(`2023-01-${1 + index}`)
    );
    expect(arraysEqual(forJanuary, forJanuaryTest, isDateEqual)).toBe(true);

    const forFebruary = getMonthDates(2023, 2);
    const forFebruaryTest = Array.from(
      { length: 28 },
      (_, index) => new Date(`2023-02-${1 + index}`)
    );
    expect(arraysEqual(forFebruary, forFebruaryTest, isDateEqual)).toBe(true);

    const forDecember = getMonthDates(2022, 12);
    const forDecemberTest = Array.from(
      { length: 31 },
      (_, index) => new Date(`2022-12-${1 + index}`)
    );
    expect(arraysEqual(forDecember, forDecemberTest, isDateEqual)).toBe(true);
  });
});
