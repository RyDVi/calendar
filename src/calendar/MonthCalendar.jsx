import React from "react";
import { Typography, Divider } from "@mui/material";
import { CalendarTable } from "./CalendarTable";
import { MONTH_NAMES } from "../constants";
import { calendarUtils } from "../utils";
import { CalendarProvider } from "./CalendarContext";

const monthYearFormatter = (year, month) => `${year}, ${month}`;

export const MonthCalendar = ({
  year,
  month,
  className,
  onlyMonthDates = false,
  injectCellContent,
}) => {
  const currentMonth = React.useMemo(() => new Date().getMonth(), []);
  const caledarDatesByWeek = React.useMemo(() => {
    const calendarDates = calendarUtils.buildCalendarDates(
      year,
      month,
      onlyMonthDates
    );
    return Array.from({ length: 7 }, (_, index) =>
      calendarDates.slice(index * 7, 7 * (index + 1))
    );
  }, [month, onlyMonthDates, year]);
  return (
    <CalendarProvider injectCellContent={injectCellContent}>
      <div className={className}>
        <div className="d-flex align-items-center p-1">
          <Typography
            component="h3"
            variant="h5"
            sx={(theme) =>
              currentMonth + 1 === month && {
                color: theme.palette.primary.main,
              }
            }
          >
            {monthYearFormatter(MONTH_NAMES[month], year)}
          </Typography>
        </div>
        <Divider />
        <CalendarTable
          className="w-100"
          caledarDatesByWeek={caledarDatesByWeek}
          month={month}
        />
      </div>
    </CalendarProvider>
  );
};
