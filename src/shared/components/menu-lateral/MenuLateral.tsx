import { Drawer, useTheme } from "@mui/material";
import { Box } from "@mui/system";

interface IMenuLateralProps {
  children?: React.ReactNode;
}

export const MenuLateral: React.FC<IMenuLateralProps> = ({ children }) => {
  const theme = useTheme();
  return (
    <>
      <Drawer variant="permanent">
        <Box width={theme.spacing(28)}>Teste</Box>
      </Drawer>
      <Box height="100vh" marginLeft={theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};
