import { RouteObject } from "react-router-dom";
import FormPreOrder from "./components/FormPreOrder";

const router: RouteObject[] = [
  {
    path: "/preOrder",
    element: <FormPreOrder/>,
  },
];

export default router;
