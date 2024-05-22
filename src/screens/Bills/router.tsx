import { RouteObject } from "react-router-dom";
import Bill from "./pages/bill";
import BillDetailComponets from "./pages/BillDetail";
import BillDetail from "./pages/NewBill";
// import AddInventory from "./pages/AddInventory";


const router: RouteObject[] = [
  {
    path: "/billing",
    element: <Bill/>,
  },
  {
    path: "/billing/billDetail/:billId", // Ruta dinámica para el ID del producto
    element: <BillDetailComponets/>,
  },
  {
    path: "/billing/NewDetail/:preOrderId", // Ruta dinámica para el ID del producto
    element: <BillDetail/>,
  },

];

export default router;