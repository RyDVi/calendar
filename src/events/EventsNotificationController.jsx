import React from "react";
import { observer } from "mobx-react-lite";
import { useEventsStore } from "../stores/EventsStore";
import { useSnackbar } from "notistack";
import { IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { dateUtils } from "../utils";

const Reminder = ({ event }) => (
  <div>
    <Typography className="mb-1">Reminder</Typography>
    <span>
      Do you have a plan {event.name} from {event.from} to {event.to}
    </span>
  </div>
);

const Notification = ({ event }) => (
  <div>
    <Typography className="mb-1">Notification</Typography>
    <span>
      Started event {event.name} from {event.from} to {event.to}
    </span>
  </div>
);

function useEventSnackbar() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return React.useCallback(
    (startTime, content) =>
      setTimeout(() => {
        enqueueSnackbar(content, {
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          action: (key) => (
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => closeSnackbar(key)}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ),
        });
      }, startTime),
    [closeSnackbar, enqueueSnackbar]
  );
}

export const EventsNotificationsController = observer(() => {
  const createEvent = useEventSnackbar();

  const eventsStore = useEventsStore();
  const events = React.useMemo(
    () => eventsStore.getEvents(dateUtils.toOnlyDateString(new Date())),
    [eventsStore]
  );

  const remindersRef = React.useRef([]);
  React.useEffect(() => {
    remindersRef.current.forEach((reminder) => {
      // Clear previous reminders and events notifications
      if (!reminder) {
        return;
      }
      clearTimeout(reminder);
    });

    // Create new reminders and events notifications
    const newReminders = [];

    const now = new Date();
    events.forEach((event) => {
      const timeEventStart = new Date(`${event.date} ${event.from}`);
      
      // Creating new events
      const timeLeftBeforeStartEvent = timeEventStart - now;
      if (timeLeftBeforeStartEvent < 0) {
        return;
      }
      newReminders.push(
        createEvent(timeLeftBeforeStartEvent, <Notification event={event} />)
      );
      
      // Creating new reminders
      if (!event.remindFor) {
        return;
      }
      const timeReminderStart = timeEventStart - event.remindFor * 1000 * 60;
      const timeLeftBeforeStartReminder = timeReminderStart - now;
      if (timeLeftBeforeStartReminder < 0) {
        return;
      }
      newReminders.push(
        createEvent(timeLeftBeforeStartReminder, <Reminder event={event} />)
      );
    });

    remindersRef.current = newReminders;

    return () => {
      remindersRef.current.forEach((reminder) => {
        clearTimeout(reminder);
      });
    };
  }, [events, createEvent]);
  return null;
});
