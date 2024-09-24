import { RouteObject } from "react-router-dom";

import { MainLayout } from "./layouts/mainLayout";
// import { HeaderLayout } from "./layouts/header-layout";

import homeRouter from "./screens/home/router";
import buyInventoryRouter from "./screens/AddInventory/router";
import invetoryRouter from "./screens/inventory/router";
import customersRouter from "./screens/cliente/router";
import productRouter from "./screens/producto/router";
import preOrderRouter from "./screens/preorder/router"
import AtributosRouter from './screens/Atributos/router'
import OrderRouter from "./screens/Order/router";
import ReportRouter from "./screens/report/router";
import BillingRouter from "./screens/Bills/router";
import TestingRoutes from "./screens/TestPagination/Router";

export const publicRoutes = [].flat();

export const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout/>,
    children: [homeRouter].flat(),
  },
  {
    path: "/Inventario",
    element: <MainLayout />,
    children: [invetoryRouter].flat(),
  },
  {
    path: "/customers",
    element: <MainLayout />,
    children: [customersRouter].flat(),
  },
  {
    path: "/Inventario",
    element: <MainLayout />,
    children: [buyInventoryRouter].flat(),
  },
  {
    path: "/productos",
    element: <MainLayout />,
    children: [productRouter].flat(),
  },
  {
    path:"/preOrder",
    element:<MainLayout/>,
    children: [preOrderRouter].flat()
  },
  {
    path:"/atributos",
    element:<MainLayout/>,
    children: [AtributosRouter].flat()
  },
  {
    path:"/Order",
    element:<MainLayout/>,
    children: [OrderRouter].flat()
  },
  {
    path:"/billing",
    element:<MainLayout/>,
    children: [BillingRouter].flat()
  },
  {
     path:"/Reports",
     element:<MainLayout/>,
     children: [ReportRouter].flat()
  },
  {
    path:"/Testing",
    element:<MainLayout/>,
    children: [TestingRoutes].flat()
  }
].flat();
