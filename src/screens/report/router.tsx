import { RouteObject } from "react-router-dom";
import InventoryReport from "./pages/InventoryReport";


const router: RouteObject[] = [
    {
        path: "/Reports",
        element: <InventoryReport/>,
    }
];

export default router;
