import React from "react";
import { MonthCalendar } from "../calendar";
import { MONTH_NAMES } from "../constants";

import {
  TextField,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { Page } from "./Page";
import { EventsCellContent } from "../features";

const months = Array.from({ length: 12 }, (_, index) => index + 1);

const CalendarSelectors = ({
  calendarRange,
  onChangeCalendarRange,
  className,
}) => {
  const lastDateRef = React.useRef();
  React.useEffect(() => {
    if (!!calendarRange.month) {
      lastDateRef.current = calendarRange.month;
    }
  }, [calendarRange.month]);

  const years = React.useMemo(() => {
    const today = new Date();
    return Array.from(
      { length: 20 },
      (_, index) => today.getFullYear() + 5 - index
    );
  }, []);

  const handleChangeMonth = React.useCallback(
    (event) => {
      let val = event.target.value;
      if (val === "none") {
        val = "";
      }
      onChangeCalendarRange({ ...calendarRange, month: val });
    },
    [calendarRange, onChangeCalendarRange]
  );
  const handleChangeYearMonth = React.useCallback(
    (_, variant) => {
      if (variant === "year") {
        onChangeCalendarRange({ ...calendarRange, month: null });
        return;
      }
      onChangeCalendarRange({ ...calendarRange, month: lastDateRef.current });
    },
    [calendarRange, onChangeCalendarRange]
  );
  return (
    <div className={className}>
      <TextField
        label="Year"
        value={calendarRange.year}
        onChange={(event) =>
          onChangeCalendarRange({ ...calendarRange, year: event.target.value })
        }
        size="small"
        select
      >
        {years.map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Month"
        className="ml-1"
        size="small"
        value={calendarRange.month || "none"}
        onChange={handleChangeMonth}
        select
      >
        <MenuItem value="none">--Select Month--</MenuItem>
        {months.map((month) => (
          <MenuItem key={month} value={month}>
            {MONTH_NAMES[month]}
          </MenuItem>
        ))}
      </TextField>
      <ToggleButtonGroup
        exclusive
        value={calendarRange.month ? "month" : "year"}
        onChange={handleChangeYearMonth}
        className="ml-1"
        size="small"
      >
        <ToggleButton value="year">Year</ToggleButton>
        <ToggleButton value="month">Month</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

const YearView = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, 600px)",
  gap: "1rem",
});

const MonthView = styled("div")({
  height: "400px",
});

const YearMonthCalendar = ({ calendarRange, injectCellContent }) => {
  if (!calendarRange.month) {
    return (
      <YearView>
        {months.map((month) => (
          <MonthCalendar
            key={month}
            year={calendarRange.year}
            month={month}
            onlyMonthDates
            injectCellContent={injectCellContent}
          />
        ))}
      </YearView>
    );
  }

  return (
    <MonthView>
      <MonthCalendar
        year={calendarRange.year}
        month={calendarRange.month}
        injectCellContent={injectCellContent}
      />
    </MonthView>
  );
};

const CalendarPage = () => {
  const today = React.useMemo(() => new Date(), []);
  const [calendarRange, setCalendarRange] = React.useState({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
  });
  return (
    <Page header="Calendar">
      <CalendarSelectors
        calendarRange={calendarRange}
        onChangeCalendarRange={setCalendarRange}
        className="d-flex flex-end"
      />
      <YearMonthCalendar
        calendarRange={calendarRange}
        injectCellContent={EventsCellContent}
      />
    </Page>
  );
};

export default CalendarPage;
