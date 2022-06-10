import { useEffect, useState } from "react";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import { FerrametasDeDetalhe } from "../../shared/components";
import { VForm, VTextField, useVForm } from "../../shared/forms";
import { LayoutBaseDePaginas } from "../../shared/layouts";
import { PessoasService } from "../../shared/services/api/pessoas/PessoasService";

interface IFormData {
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

export const DetalhePessoa = () => {
  const { id } = useParams<"id">();
  const [isloading, setIsLoading] = useState(false);
  const [nome, setNome] = useState("");
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
    } else {
      formRef.current?.setData({
        nomeCompleto: "",
        email: "",
        cidadeId: null,
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
          if (isSaveAndClose()) {
            navigate("/pessoas");
          } else {
            navigate(`/pessoas/detalhe/${result}`);
          }
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
            if (isSaveAndClose()) {
              navigate("/pessoas");
            }
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
          aoClicarEmSalvar={save}
          aoClicarEmSalvarEFechar={saveAndClose}
          aoClicarEmApagar={() => handleDelete(Number(id))}
          aoClicarEmNovo={() => navigate("/pessoas/detalhe/nova")}
          aoClicarEmVoltar={() => navigate("/pessoas")}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box
          margin={1}
          display="flex"
          flexDirection="column"
          component={Paper}
          variant="outlined"
        >
          {isloading && (
            <Grid item>
              <LinearProgress variant="indeterminate" />
            </Grid>
          )}
          <Grid container direction="column" padding={2} spacing={2}>
            <Grid item>
              <Typography variant="h6">Geral</Typography>
            </Grid>

            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label="Nome completo"
                  name="nomeCompleto"
                  disabled={isloading}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  label="E-mail"
                  name="email"
                  fullWidth
                  disabled={isloading}
                />
              </Grid>
            </Grid>
            <Grid container item direction="row">
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  label="Cidade"
                  name="cidadeId"
                  fullWidth
                  disabled={isloading}
                />
              </Grid>
            </Grid>
          </Grid>
          {isloading && (
            <Grid item>
              <LinearProgress variant="indeterminate" />
            </Grid>
          )}
        </Box>
      </VForm>
    </LayoutBaseDePaginas>
  );
};
