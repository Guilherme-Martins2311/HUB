import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Companies } from "./pages/Companies";
import { CompanyProfile } from "./pages/CompanyProfile";
import { Engagement } from "./pages/Engagement";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "empresas", Component: Companies },
      { path: "empresas/:id", Component: CompanyProfile },
      { path: "engajamento", Component: Engagement },
      { path: "relatorios", Component: Reports },
      { path: "configuracoes", Component: Settings },
    ],
  },
]);
