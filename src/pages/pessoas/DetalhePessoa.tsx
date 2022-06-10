import { useEffect, useRef, useState } from "react";
import { LinearProgress } from "@mui/material";
import { Form } from "@unform/web";
import { useNavigate, useParams } from "react-router-dom";

import { FerrametasDeDetalhe } from "../../shared/components";
import { VTextField } from "../../shared/forms";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";
import { FormHandles } from "@unform/core";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalhePessoa = () => {
  const { id } = useParams<"id">();
  const [isloading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const formRef = useRef<FormHandles>(null);

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
          formRef.current?.setData(result);
        }
      });
    }
  }, [id]);

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);
    if (id === "nova") {
      PessoasService.create(dados).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      PessoasService.updateById(Number(id), { id: Number(id), ...dados }).then(
        (result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert(result.message);
          } else {
            setNome(dados.nomeCompleto);
          }
        }
      );
    }
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
          aoClicarEmSalvar={() => formRef.current?.submitForm()}
          aoClicarEmSalvarEFechar={() => formRef.current?.submitForm()}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas")}
        />
      }
    >
      {isloading && <LinearProgress variant="indeterminate" />}
      <Form ref={formRef} onSubmit={handleSave}>
        <VTextField placeholder="Nome completo" name="nomeCompleto" />
        <VTextField placeholder="e-mail" name="email" />
        <VTextField placeholder="Cidade id" name="cidadeId" />
      </Form>
    </LayoutBaseDePaginas>
  );
};
