import { RouteObject } from "react-router-dom";
import ListOrders from "./pages/ListOrder";
import OrderDetail from "./pages/ViewDetail";

const router: RouteObject[] = [
  {
    path: "/Order",
    element: <ListOrders/>,
  },
  {
    path: "/Order/OrderDetail/:orderId",
    element: <OrderDetail/>,
  }
];

export default router;
