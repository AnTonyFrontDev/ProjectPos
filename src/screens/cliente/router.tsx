import { RouteObject } from "react-router-dom";

import Customers from "./pages/Customers"
import ClientDetail from './pages/ClientDetail'

const router: RouteObject[] = [
  {
    path: "/customers",
    element: <Customers/>,
  },
  {
    path: "/customers/ClientDetail/:clientId", // Ruta dinámica para el ID del producto
    element: <ClientDetail/>,
  },
];

export default router;
