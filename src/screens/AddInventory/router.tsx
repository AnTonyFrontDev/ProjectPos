import { RouteObject } from "react-router-dom";
import AddInventory from "./pages/AddInventory";



const router: RouteObject[] = [
  {
    path: "/NewInventory",
    element: <AddInventory/>,
  },

];

export default router;