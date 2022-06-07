import { BarraDeFerramentas } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";

export const Dashboard = () => {
  return (
    <LayoutBaseDePaginas
      titulo="Página inicial"
      barraDeFerramentas={<BarraDeFerramentas />}
    >
      Testando
    </LayoutBaseDePaginas>
  );
};
