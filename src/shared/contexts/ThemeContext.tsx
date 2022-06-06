import { createContext } from "react";
import { ThemeProvider } from "@mui/material";
import { DarkTheme, LightTheme } from "./../themes";

interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const AppThemeProvider: React.ReactNode = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={DarkTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
