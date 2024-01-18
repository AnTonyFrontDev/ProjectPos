import { RouteObject } from "react-router-dom";

import Customers from "./pages/Customers"

const router: RouteObject[] = [
  {
    path: "/customers",
    element: <Customers/>,
  },
];

export default router;
