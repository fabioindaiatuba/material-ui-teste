import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Dashboard, DetalhePessoa, ListagemPessoa } from "../pages";
import { useDrawerContext } from "../shared/contexts";

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: "home",
        path: "/pagina-inicial",
        label: "Página inicial",
      },
      {
        icon: "people",
        path: "/pessoas",
        label: "Pessoas",
      },
      {
        icon: "location_city",
        path: "/cidades",
        label: "Cidades",
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pessoas" element={<ListagemPessoa />} />
      <Route path="/pessoas/detalhe/:id" element={<DetalhePessoa />} />

      <Route path="/cidades" element={<></>} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};
