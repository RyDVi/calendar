import React from "react";
import { styled } from "@mui/system";
import { dateUtils } from "../utils";
import { DAY_NAMES_SHORT } from "../constants";
import { useCalendarContext } from "./CalendarContext";

const CalendarCellTd = styled("td")(
  ({ isCurrentDay, isCurrentMonth, theme, disabled }) => [
    {
      minHeight: "100%",
      padding: "0.2rem",
      verticalAlign: "top",
      "tbody &": {
        borderTop: `2px solid ${theme.palette.text.disabled}`,
      },
    },
    isCurrentDay && {
      "tbody &": {
        backgroundColor: theme.palette.primary.extraLight,
        borderTopColor: theme.palette.primary.main,
        color: theme.palette.primary.dark,
      },
    },
    !isCurrentMonth && {
      color: theme.palette.text.disabled,
    },
    !disabled &&
      {
        // cursor: "pointer",
      },
  ]
);

/**
 *
 * @param {Date} date
 * @param {Number} month
 */
const CalendarCell = ({ date, month }) => {
  const isCurrentMonth = React.useMemo(
    () => date.getMonth() + 1 === month,
    [date, month]
  );
  const isCurrentDay = React.useMemo(
    () => dateUtils.isDateEqual(new Date(), date),
    [date]
  );

  const { injectCellContent } = useCalendarContext();

  return (
    <CalendarCellTd
      isCurrentDay={isCurrentDay}
      isCurrentMonth={isCurrentMonth}
      tabIndex={date.getMonth() * 100 + date.getDate()}
    >
      {injectCellContent ? injectCellContent({ date, month }) : null}
    </CalendarCellTd>
  );
};

const CalendarHeadRow = () => (
  <tr>
    {Array.from({ length: 7 }, (_, index) => (
      <td key={index}>
        <div className="text-end">{DAY_NAMES_SHORT[index + 1]}</div>
      </td>
    ))}
  </tr>
);

const CalendarTableContainer = styled("table")({
  borderSpacing: "1rem",
  minHeight: "1rem",
  tableLayout: "fixed",
  aspectRatio: "16/9",
});

/**
 *
 * @param {Number} year
 * @param {Number} month
 */
export const CalendarTable = ({ caledarDatesByWeek, className, month }) => {
  return (
    <CalendarTableContainer className={className}>
      <thead>
        <CalendarHeadRow />
      </thead>
      <tbody>
        {caledarDatesByWeek.map((weekDates, index) => (
          <tr key={index}>
            {weekDates.map((date, index) => {
              if (!date) {
                return <td key={index} disabled />;
              }
              return (
                <CalendarCell key={date.toString()} date={date} month={month} />
              );
            })}
          </tr>
        ))}
      </tbody>
    </CalendarTableContainer>
  );
};
