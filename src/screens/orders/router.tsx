import { RouteObject } from "react-router-dom";
import AddOrder from "./pages/AddOrder";

const router: RouteObject[] = [
  {
    path: "/AddOrder",
    element: <AddOrder/>,
  }
];

export default router;
