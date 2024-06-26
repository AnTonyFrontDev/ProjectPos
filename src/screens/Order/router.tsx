import { RouteObject } from "react-router-dom";
import Order from "./pages/Order";
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
  },
  {
    path: "/Order/new",
    element: <Order preOrderMap={[]} preOrderInProgress={[]} client={[]} preId={0}/>,
  }
];

export default router;
