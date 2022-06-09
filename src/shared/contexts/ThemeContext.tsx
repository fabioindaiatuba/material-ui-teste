import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Box, ThemeProvider } from "@mui/material";

import { DarkTheme, LightTheme } from "./../themes";
import { IPropsChildren } from "../IPropsChildren";

interface IThemeContextData {
  themeName: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<IPropsChildren> = ({ children }) => {
  const [themeName, setThemeName] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => {
      const toggle = oldThemeName === "light" ? "dark" : "light";
      localStorage.setItem("theme", toggle);
      return toggle;
    });
  }, []);

  const theme = useMemo(() => {
    if (themeName === "light") return LightTheme;
    return DarkTheme;
  }, [themeName]);

  useEffect(() => {
    const storageTheme = localStorage.getItem("theme");
    if (storageTheme) {
      setThemeName(storageTheme === "light" ? "light" : "dark");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box
          width="100vw"
          height="100vh"
          bgcolor={theme.palette.background.default}
        >
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
