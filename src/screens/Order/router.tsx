import { RouteObject } from "react-router-dom";
import Order from "./pages/Order";
import ListOrders from "./pages/ListOrder";

const router: RouteObject[] = [
  {
    path: "/Order",
    element: <ListOrders/>,
  },
  {
    path: "/Order/new",
    element: <Order/>,
  }
];

export default router;
