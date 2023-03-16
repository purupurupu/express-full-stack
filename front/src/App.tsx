import React from "react";
import Index from "./pages/Index";
import { TodoStore } from "./stores/todo-store";
import { SnackbarProvider } from "notistack";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} hideIconVariant>
          <TodoStore.Provider>
            <Index />
          </TodoStore.Provider>
        </SnackbarProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
