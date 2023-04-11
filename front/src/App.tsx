import React from "react";
import Todo from "./pages/Todo";
import { TodoStore } from "./stores/todo-store";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3} hideIconVariant>
        <TodoStore.Provider>
          <Todo />
        </TodoStore.Provider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
