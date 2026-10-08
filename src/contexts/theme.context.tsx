import { createContext, useContext, useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ChildrenProps } from "../types/propes.types";

type ThemeMode = "light" | "dark";

const STORAGE_KEY = "seaspeed-theme-mode";

function getInitialMode(): ThemeMode {
  // Dark mode toggle is currently hidden; always start in light mode and clear
  // any previously persisted dark preference so returning users aren't left in dark mode.
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable
  }
  return "light";
}

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => {},
});

export const ThemeContextProvider = ({ children }: ChildrenProps) => {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // localStorage unavailable
    }
  }, [mode]);

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const muiTheme = createTheme({
    palette: {
      mode,
      ...(mode === "light" ? { background: { default: "#F8F9FD" } } : {}),
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
