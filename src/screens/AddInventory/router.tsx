import { RouteObject } from "react-router-dom";
import AddInventory from "./pages/AddInventory";
import InventoryMenu from "./pages/MenuInventario";



const router: RouteObject[] = [
  {
    path: "/Inventario",
    element: <InventoryMenu/>,
  },
  {
    path: "/Inventario/NuevaCompra",
    element: <AddInventory/>,
  },

];

export default router;