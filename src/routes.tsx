import { RouteObject } from "react-router-dom";

import { MainLayout } from "./layouts/mainLayout";
// import { HeaderLayout } from "./layouts/header-layout";

import homeRouter from "./screens/home/router";
import invetoryRouter from "./screens/inventory/router";
import customersRouter from "./screens/cliente/router";
import productRouter from "./screens/producto/router";
import preOrderRouter from "./screens/preorder/router"
import AtributosRouter from './screens/Atributos/router'
import OrderRouter from "./screens/orders/router";

export const publicRoutes = [].flat();

export const privateRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout/>,
    children: [homeRouter].flat(),
  },
  {
    path: "/inventory",
    element: <MainLayout />,
    children: [invetoryRouter].flat(),
  },
  {
    path: "/customers",
    element: <MainLayout />,
    children: [customersRouter].flat(),
  },
  {
    path: "/product",
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
    path:"/AddOrder",
    element:<MainLayout/>,
    children: [OrderRouter].flat()
  },

].flat();
