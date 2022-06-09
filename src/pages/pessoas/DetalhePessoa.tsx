import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FerrametasDeDetalhe } from "../../shared/components";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

export const DetalhePessoa = () => {
  const { id } = useParams<"id">();
  const [isloading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id !== "nova") {
      setIsLoading(true);
      PessoasService.getById(Number(id)).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          navigate("/pessoas");
        } else {
          setNome(result.nomeCompleto);
          console.log(result);
        }
      });
    }
  }, [id]);

  const handleSave = () => {
    console.log("save");
  };

  const handleDelete = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert("Registro apagado com sucesso");
          navigate("/pessoas");
        }
      });
    }
  };

  return (
    <LayoutBaseDePaginas
      titulo={id === "nova" ? "Nova pessoa" : nome}
      barraDeFerramentas={
        <FerrametasDeDetalhe
          textoBotaoNovo="Nova"
          mostrarBotaoSalvarEFechar
          mostrarBotaoApagar={id !== "nova"}
          mostrarBotaoNovo={id !== "nova"}
          aoClicarEmSalvar={() => handleSave()}
          aoClicarEmSalvarEFechar={() => handleSave()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas")}
        />
      }
    >
      {isloading && <LinearProgress variant="indeterminate" />}
      Detalhe de pessoa {id}
    </LayoutBaseDePaginas>
  );
};
