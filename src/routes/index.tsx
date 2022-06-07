import { Button } from "@mui/material";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useAppThemeContext } from "../shared/contexts/ThemeContext";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen, setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        label: "Página inicial",
        icon: "home",
        path: "/pagina-inicial",
      },
      {
        label: "Cidades",
        icon: "star",
        path: "/cidades",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route
        path="/pagina-inicial"
        element={
          <>
            <Button variant="contained" color="primary" onClick={toggleTheme}>
              Theme
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={toggleDrawerOpen}
            >
              Menu
            </Button>
          </>
        }
      />
      <Route path="/cidades" element={<></>} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
