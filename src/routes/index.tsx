import { Button } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDrawerContext } from "../shared/contexts";
import { useAppThemeContext } from "../shared/contexts/ThemeContext";

export const AppRoutes = () => {
  const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen } = useDrawerContext();
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

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
