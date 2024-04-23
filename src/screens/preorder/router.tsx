import { RouteObject } from "react-router-dom";
// import PreOrder from "./components/FormPreOrder";
// import AddOrder from "../orders/pages/AddOrder";
import PreOrders from "./pages/PreOrder";
import ListPreOrder from "./pages/ListPreOrder";
import PreOrderDetail from "./pages/ViewDetail";


const router: RouteObject[] = [
  {
    path: "/preOrder",
    element: <ListPreOrder/>,
  },
  {
    path: "/preOrder/PreOrderDetail/:preorderId",
    element: <PreOrderDetail/>,
  },
  {
    path: "/preOrder/new",
    element: <PreOrders/>,
  }
];

export default router;
