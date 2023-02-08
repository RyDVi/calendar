import React from "react";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import { AppRouter } from "./AppRouter";
import { Container } from "@mui/material";
import { EventsStoreProvider } from "./stores/EventsStore";
import { SnackbarProvider } from "notistack";
import { EventsNotificationsController } from "./events";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={10}>
        <EventsStoreProvider>
          <EventsNotificationsController />
          <Container maxWidth="xl">
            <AppRouter />
          </Container>
        </EventsStoreProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
