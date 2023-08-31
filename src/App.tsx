import React from "react";
// import logo from "./logo.svg";
import "./App.css";



import { GlobalProvider } from "./contexts/global.context";
import MainRoutes from "./Routes/Main.routes";
import ErrorBoundary from "./uiComponents/error_boundary";

function App() {
  // const [value, setValue] = useState("");

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setValue(event.target.value);
  // };

  return (
    <>
      <GlobalProvider>
        <ErrorBoundary>
          <MainRoutes />
        </ErrorBoundary>
      </GlobalProvider>
    </>
  );
}

export default App;
