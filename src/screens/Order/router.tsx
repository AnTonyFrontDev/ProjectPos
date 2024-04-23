import { RouteObject } from "react-router-dom";
import Order from "./pages/Order";
import ListOrders from "./pages/ListOrder";
import OrderDetail from "./pages/OrderDetail";

const router: RouteObject[] = [
  {
    path: "/Order",
    element: <ListOrders/>,
  },
  {
    path: "/Order/OrderDetail/:orderId",
    element: <OrderDetail/>,
  },
  {
    path: "/Order/new",
    element: <Order/>,
  }
];

export default router;
