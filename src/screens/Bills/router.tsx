import { RouteObject } from "react-router-dom";
import Bill from "./pages/bill";
// import AddInventory from "./pages/AddInventory";


const router: RouteObject[] = [
  {
    path: "/billing",
    element: <Bill/>,
  },

];

export default router;