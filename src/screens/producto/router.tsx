import { RouteObject } from "react-router-dom";

import Product from "./pages/Product"

const router: RouteObject[] = [
  {
    path: "/product",
    element: <Product/>,
  },
];

export default router;
