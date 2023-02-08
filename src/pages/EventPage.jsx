import React from "react";
import { SaveEditForm } from "../events/SaveEditForm";
import { EventForm } from "../events/EventForm";
import { Page } from "./Page";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEventsStore } from "../stores/EventsStore";
import { Typography } from "@mui/material";
import * as paths from "../paths";
import { useSnackbar } from "notistack";
import { useIsActualDate } from "../features";

const EventPage = observer(() => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { eventId, date } = useParams();
  const eventsStore = useEventsStore();
  const [event, setEvent] = React.useState(
    eventId === "create"
      ? eventsStore.buildEvent(date)
      : eventsStore.getEvent(date, eventId)
  );
  const [errors, setErrors] = React.useState({});

  const handleSubmit = React.useCallback(() => {
    eventsStore.saveEvent(event).then(
      () => {
        navigate(paths.events({ date }), "replace");
        enqueueSnackbar(
          eventId === "create" ? "Event added!" : "Event updated!",
          { variant: "success" }
        );
      },
      (errors) => {
        setErrors(errors);
      }
    );
  }, [date, enqueueSnackbar, event, eventId, eventsStore, navigate]);

  const isActualDate = useIsActualDate(date);

  if (!event) {
    return (
      <Page>
        <Typography component="h1">Event not exists</Typography>
      </Page>
    );
  }
  return (
    <Page
      header={`${
        eventId === "create" ? "Create event" : "Update event"
      } at ${date}`}
      onBack={() => navigate(paths.events({ date }), "replace")}
    >
      <SaveEditForm
        onCancel={() => navigate(-1)}
        onSubmit={isActualDate && handleSubmit}
      >
        <EventForm
          data={event}
          onChange={setEvent}
          errors={errors}
          disabled={!isActualDate}
        />
      </SaveEditForm>
    </Page>
  );
});

export default EventPage;
