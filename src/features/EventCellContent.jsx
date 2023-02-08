import React from "react";
import { Link } from "react-router-dom";
import * as paths from "../paths";
import { dateUtils } from "../utils";

import { useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { useEventsStore } from "../stores/EventsStore";
import { observer } from "mobx-react-lite";
import CircleIcon from "@mui/icons-material/Circle";

const EventText = styled("span")({
  display: "inline-block",
});

const InlineListItem = styled("span")(({ theme }) => ({
  display: "block",
  whiteSpace: "nowrap",
  ":hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const CellEventsContainer = styled("div")({
  overflow: "hidden",
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
});

const InlineEventListItem = ({ event, className }) => {
  const today = React.useMemo(() => new Date(), []);
  const theme = useTheme();
  const color = React.useMemo(() => {
    if (new Date(event.date) < today) {
      return theme.palette.error.main;
    }
    return theme.palette.success.main;
  }, [event.date, theme.palette.error.main, theme.palette.success.main, today]);
  return (
    <Link
      to={paths.event({ date: event.date, eventId: event.id })}
      className="inverse-link-style"
    >
      <InlineListItem className={className}>
        <CircleIcon sx={{ fontSize: "8px", marginRight: "6px", color }} />
        <EventText>{event.name}</EventText>
      </InlineListItem>
    </Link>
  );
};

const CellEvents = observer(({ date }) => {
  const eventsStore = useEventsStore();
  return (
    <CellEventsContainer>
      {eventsStore.getEvents(date).map((event) => (
        <InlineEventListItem key={event.id} event={event} />
      ))}
    </CellEventsContainer>
  );
});

const DateContent = styled("div")({
  width: "100%",
  textAlign: "end",
  a: {
    color: "black",
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
});

export const EventsCellContent = ({ date }) => {
  const dateStr = dateUtils.toOnlyDateString(date);
  return (
    <div>
      <DateContent>
        <Link to={paths.events({ date: dateStr })}>{date.getDate()}</Link>
      </DateContent>
      <CellEvents date={dateStr} />
    </div>
  );
};
