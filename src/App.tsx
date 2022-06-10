import { BrowserRouter } from "react-router-dom";

import { AppRoutes } from "./routes";
import { MenuLateral } from "./shared/components";
import { AppThemeProvider, DrawerProvider } from "./shared/contexts";

import "./shared/forms/TraducoesYup";

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <MenuLateral>
            <AppRoutes />
          </MenuLateral>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
