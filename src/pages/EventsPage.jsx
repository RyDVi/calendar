import React from "react";
import { Page } from "./Page";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as paths from "../paths";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { useEventsStore } from "../stores/EventsStore";
import { EventsList, StandardEventListItem } from "../events";
import { useSnackbar } from "notistack";
import { useIsActualDate } from "../features";

const DeleteAcceptModal = ({ open, onClose, onAccept }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogContent>Are you sure you want to delete the event?</DialogContent>
    <DialogActions>
      <Button onClick={onAccept} color="error">
        Delete
      </Button>
      <Button onClick={onClose}>Cancel</Button>
    </DialogActions>
  </Dialog>
);

const EventsPage = observer(() => {
  const { enqueueSnackbar } = useSnackbar();
  const { date } = useParams();
  const eventsStore = useEventsStore();
  const navigate = useNavigate();
  const [acceptAction, setAcceptAction] = React.useState(null);
  const handleDelete = React.useCallback(
    (event) =>
      setAcceptAction(() => () => {
        eventsStore.removeEvent(event);
        enqueueSnackbar("Event deleted!", { variant: "success" });
        setAcceptAction(null);
      }),
    [enqueueSnackbar, eventsStore]
  );

  const isActualDate = useIsActualDate(date);
  return (
    <Page
      header={`Events on ${date}`}
      onBack={() => navigate(paths.calendar({}), { replace: true })}
    >
      <div className="d-flex">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(paths.event({ date, eventId: "create" }))}
          disabled={!isActualDate}
        >
          New Event
        </Button>
      </div>
      <EventsList events={eventsStore.getEvents(date)} sx={{ maxWidth: 500 }}>
        {(event) => (
          <StandardEventListItem
            key={event.id}
            event={event}
            buildLink={(event) => paths.event({ date, eventId: event.id })}
            onDelete={isActualDate && handleDelete}
          />
        )}
      </EventsList>

      <DeleteAcceptModal
        open={!!acceptAction}
        onClose={() => setAcceptAction(null)}
        onAccept={acceptAction}
      />
    </Page>
  );
});

export default EventsPage;
