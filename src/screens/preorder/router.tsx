import { RouteObject } from "react-router-dom";
import FormPreOrder from "./components/FormPreOrder";
import AddOrder from "../orders/pages/AddOrder";

const router: RouteObject[] = [
  {
    path: "/preOrder",
    element: <FormPreOrder/>,
  }
];

export default router;
