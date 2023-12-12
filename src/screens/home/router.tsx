import { RouteObject } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

const router: RouteObject[] = [
  {
    path: "/",
    element: <Dashboard/>,
  },
];

export default router;
