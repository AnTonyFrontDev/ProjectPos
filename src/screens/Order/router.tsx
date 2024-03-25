import { RouteObject } from "react-router-dom";
import Order from "./pages/Order";

const router: RouteObject[] = [
  {
    path: "/Order",
    element: <Order/>,
  }
];

export default router;
