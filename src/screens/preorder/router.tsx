import { RouteObject } from "react-router-dom";
// import PreOrder from "./components/FormPreOrder";
// import AddOrder from "../orders/pages/AddOrder";
import PreOrders from "./pages/PreOrder";
import ListPreOrder from "./pages/ListPreOrder";


const router: RouteObject[] = [
  {
    path: "/preOrder",
    element: <ListPreOrder/>,
  },
  {
    path: "/preOrder/new",
    element: <PreOrders/>,
  }
];

export default router;
