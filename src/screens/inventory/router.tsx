import { RouteObject } from "react-router-dom";

import Inventory from "./pages/Inventory"

const router: RouteObject[] = [
  {
    path: "/inventory",
    element: <Inventory/>,
  },
];

export default router;
