import { RouteObject } from "react-router-dom";

import Inventory from "./pages/Inventory"
import InventoryDetail from "./pages/InventoryDetail";

const router: RouteObject[] = [
  {
    path: "/Inventario/Listado",
    element: <Inventory/>,
  },
  {
    path: "/Inventario/inventoryDetail/:productId", // Ruta dinámica para el ID del producto
    element: <InventoryDetail/>,
  },
];

export default router;
