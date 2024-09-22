import { RouteObject } from "react-router-dom";
import PreOrders from "./pages/PreOrder";
import ListPreOrder from "./pages/ListPreOrder";
import PreOrderDetail from "./pages/ViewDetail";
import NewOrder from "./pages/NewOrder";


const router: RouteObject[] = [
  {
    path: "/preOrder",
    element: <ListPreOrder />,
  },
  {
    path: "/preOrder/PreOrderDetail/:preorderId",
    element: <PreOrderDetail/>,
  },
  {
    path: "/preOrder/NuevaOrden/:preorderId",
    element: <NewOrder/>,
  },
  {
    path: "/preOrder/new",
    element: <PreOrders/>,
  }
];

export default router;
