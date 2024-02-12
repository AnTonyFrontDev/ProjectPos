import { RouteObject } from "react-router-dom";

import Inventory from "./pages/Inventory"
import InventoryDetail from "./pages/InventoryDetail";

const router: RouteObject[] = [
  {
    path: "/inventory",
    element: <Inventory/>,
  },
  {
    path: "/inventory/inventorDetail/:productId", // Ruta dinámica para el ID del producto
    element: <InventoryDetail/>,
  },
];

export default router;
