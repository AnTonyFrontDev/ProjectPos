import { RouteObject } from "react-router-dom";

import Product from "./pages/Product"
import ProductDetail from "./pages/ProductDetail";

const router: RouteObject[] = [
  {
    path: "/product",
    element: <Product/>,
  },
  {
    path: "/product/ProductDetail/:productId", // Ruta dinámica para el ID del producto
    element: <ProductDetail/>,
  },
];

export default router;
