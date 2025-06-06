import { Home } from "../components/pages/Home";
import { KnowledgePage } from "../components/pages/KnowledgePage";

export const homeRoutes = [
  {
    path: "/home",
    exact: true,
    children: <Home />,
  },
  {
    path: "/knowledgePage",
    exact: false,
    children: <KnowledgePage />,
  },
];
