import React from "react";
import useLocalStorage from "react-use-localstorage";
import { makeAutoObservable } from "mobx";
import { generateUUID, keyBy } from "../utils";

const eventValidator = (event) => {
  const errors = {};
  if (!event.name) {
    errors.name = "This field is required";
  }
  if (!event.from) {
    errors.from = "This field is required";
  }
  if (!event.to) {
    errors.to = "This field is required";
  }
  if (event.from > event.to) {
    return {
      from: 'The "From" time cannot be greater than the "To" time.',
    };
  }
  if (new Date(`${event.date} ${event.from}`) < new Date()) {
    errors.from = [errors.from, "Out of date"].filter(Boolean).join("\n");
  }
  if (Object.values(errors).length) {
    return errors;
  }
  return null;
};

class EventsStore {
  /**
   * As object instead of array for optimize access by date.
   * Something as {
   * '2023-01-01':{
   *    '873aa1ba-1043-48e9-8d7a-4e20d23c314b':{
   *        id: '873aa1ba-1043-48e9-8d7a-4e20d23c314b',
   *        name: 'Event Name,
   *        from: '15:00',
   *        to: '16:00',
   *        remindFor: 60
   *      }
   *  }
   * }
   */
  events = {};
  saveEventsToStorage = () => null;
  constructor(events = {}, saveEventsToStorage) {
    this.events = events;
    this.saveEventsToStorage = saveEventsToStorage;
    makeAutoObservable(this);
  }

  saveEvent(event) {
    const errors = eventValidator(event);
    if (errors) {
      return Promise.reject(errors);
    }
    if (event.id) {
      return this.updateEvent(event);
    } else {
      return this.addEvent(event);
    }
  }

  addEvent(event) {
    const newEvent = { ...event, id: generateUUID() };
    this.updateEvent(newEvent);
    return Promise.resolve(newEvent);
  }

  updateEvent(event) {
    this.events = {
      ...this.events,
      [event.date]: { ...this.events[event.date], [event.id]: event },
    };
    this.saveEventsToStorage(JSON.stringify(this.events));
    return Promise.resolve(event);
  }

  removeEvent(event) {
    this.events = {
      ...this.events,
      [event.date]: keyBy(
        Object.values(this.events[event.date]).filter((e) => e.id !== event.id),
        "id"
      ),
    };
    this.saveEventsToStorage(JSON.stringify(this.events));
  }

  buildEvent(date) {
    return { id: "", name: "", from: "", to: "", date };
  }
  getEvent(date, id) {
    const dateEvents = this.events[date];
    if (!dateEvents) {
      return null;
    }
    return dateEvents[id];
  }
  getEvents(date) {
    const dateEvents = this.events[date];
    if (!dateEvents) {
      return [];
    }
    return Object.values(dateEvents).sort((e1, e2) => e1.from < e2.from);
  }
}

const EventsContext = React.createContext(null);

export const EventsStoreProvider = ({ children }) => {
  const [eventsInLocalStorage, setEventsInLocalStorage] = useLocalStorage(
    "events",
    "{}"
  );
  const contextValue = React.useMemo(() => {
    const events = JSON.parse(eventsInLocalStorage);
    return new EventsStore(events, setEventsInLocalStorage);
  }, [eventsInLocalStorage, setEventsInLocalStorage]);
  return (
    <EventsContext.Provider value={contextValue}>
      {children}
    </EventsContext.Provider>
  );
};

export function useEventsStore() {
  const eventsStore = React.useContext(EventsContext);
  if (!eventsStore) {
    throw new Error("EventsContext is not provided");
  }
  return eventsStore;
}
