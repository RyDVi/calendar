import React from "react";

const CalendarContext = React.createContext({
  injectCellContent: () => null,
});

export function useCalendarContext() {
  const calendarContext = React.useContext(CalendarContext);
  if (!calendarContext) {
    throw new Error("CalendarContext is not provided");
  }
  return calendarContext;
}

export const CalendarProvider = ({ children, injectCellContent }) => {
  const contextValue = React.useMemo(
    () => ({ injectCellContent }),
    [injectCellContent]
  );
  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
