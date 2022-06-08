import { FerrametasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";

export const Dashboard: React.FC = () => {
  return (
    <LayoutBaseDePaginas
      titulo="Página inicial"
      barraDeFerramentas={
        <FerrametasDeDetalhe
          mostrarBotaoSalvarEFechar
          mostrarBotaoSalvarEFecharCarregando
        />
      }
    >
      Testando
    </LayoutBaseDePaginas>
  );
};
