import React from "react";
import { dateUtils } from "../utils";

export function useIsActualDate(date) {
  return React.useMemo(() => {
    const today = new Date();
    const calendarDate = new Date(date);
    return dateUtils.isDateEqual(calendarDate, today) || calendarDate >= today;
  }, [date]);
}
