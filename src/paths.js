import { path } from "static-path";

export const home = path("/");
export const calendar = path("/calendar");
export const events = path("/events/:date");
export const event = events.path("/:eventId");
