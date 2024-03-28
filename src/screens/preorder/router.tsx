import { RouteObject } from "react-router-dom";
// import PreOrder from "./components/FormPreOrder";
// import AddOrder from "../orders/pages/AddOrder";
import PreOrders from "./pages/PreOrder";

const router: RouteObject[] = [
  {
    path: "/preOrder",
    element: <PreOrders/>,
  }
];

export default router;
