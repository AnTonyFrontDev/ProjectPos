import { RouteObject } from "react-router-dom";

import Product from "./pages/Product"
import ProductDetail from "./pages/ProductDetail";

const router: RouteObject[] = [
  {
    path: "/productos",
    element: <Product/>,
  },
  {
    path: "/productos/ProductDetail/:productId", 
    element: <ProductDetail/>,
  },
];

export default router;
