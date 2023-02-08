import React, { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import * as paths from "./paths";

const CalendarPage = React.lazy(() => import("./pages/CalendarPage"));
const EventsPage = React.lazy(() => import("./pages/EventsPage"));
const EventPage = React.lazy(() => import("./pages/EventPage"));

const appRouter = createBrowserRouter([
  {
    path: paths.home.pattern,
    element: <Navigate to={paths.calendar({})} replace />,
  },
  {
    path: paths.calendar.pattern,
    element: (
      <Suspense fallback="Loading...">
        <CalendarPage />
      </Suspense>
    ),
  },
  {
    path: paths.events.pattern,
    element: (
      <Suspense fallback="Loading...">
        <EventsPage />
      </Suspense>
    ),
  },
  {
    path: paths.event.pattern,
    element: (
      <Suspense fallback="Loading...">
        <EventPage />
      </Suspense>
    ),
  },
]);

export const AppRouter = () => <RouterProvider router={appRouter} />;
