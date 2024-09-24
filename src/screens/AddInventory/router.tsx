import { RouteObject } from "react-router-dom";
import AddInventory from "./pages/AddInventory";
import InventoryMenu from "./pages/MenuInventario";
import BuyList from "./pages/BuysList";
import BuyDetail from "./pages/BuyDetail";



const router: RouteObject[] = [
  {
    path: "/Inventario",
    element: <InventoryMenu/>,
  },
  {
    path: "/Inventario/NuevaCompra",
    element: <AddInventory/>,
  },
  {
    path: "/Inventario/Compras",
    element: <BuyList/>,
  },
  {
    path: "/Inventario/Compras/Detail/:id",
    element: <BuyDetail/>,
  },

];

export default router;