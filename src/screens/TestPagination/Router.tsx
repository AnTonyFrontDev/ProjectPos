import {RouteObject} from "react-router-dom";
import PaginationParams from "@/screens/TestPagination/PaginationParams.tsx";

const router : RouteObject[] = [
    {
        path : '/Testing/testingParams',
        element : <PaginationParams/>
    }
]

export default router;