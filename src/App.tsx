import React from "react";
import "./App.css";

import { GlobalProvider } from "./contexts/global.context";
import { ThemeContextProvider } from "./contexts/theme.context";
import MainRoutes from "./Routes/Main.routes";
import ErrorBoundary from "./uiComponents/error_boundary";

function App() {
  return (
    <ThemeContextProvider>
      <GlobalProvider>
        <ErrorBoundary>
          <MainRoutes />
        </ErrorBoundary>
      </GlobalProvider>
    </ThemeContextProvider>
  );
}

export default App;
