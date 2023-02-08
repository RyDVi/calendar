import React from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { dateUtils } from "../utils";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const eventTimeFormatter = (eventStart, eventEnd) =>
  `From ${dateUtils.toTime12String(eventStart)} to ${dateUtils.toTime12String(
    eventEnd
  )}`;

export const EventsList = ({ events, children, className }) => (
  <List className={className}>{events.map(children)}</List>
);

export const StandardEventListItem = ({ event, onDelete, buildLink }) => {
  const [eventFrom, eventTo] = React.useMemo(
    () => [
      new Date(`${event.date} ${event.from}`),
      new Date(`${event.date} ${event.to}`),
    ],
    [event]
  );
  return (
    <ListItem
      secondaryAction={
        onDelete && (
          <IconButton edge="end" onClick={() => onDelete(event)}>
            <DeleteIcon />
          </IconButton>
        )
      }
    >
      <ListItemButton
        component={Link}
        to={buildLink(event)}
        className="inverse-link-style"
      >
        <ListItemText
          primary={event.name}
          secondary={eventTimeFormatter(eventFrom, eventTo)}
        />
      </ListItemButton>
    </ListItem>
  );
};
