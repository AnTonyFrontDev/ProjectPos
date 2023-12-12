import { RouteObject } from "react-router-dom";

import { MainLayout } from "./layouts/mainLayout";
// import { HeaderLayout } from "./layouts/header-layout";

import homeRouter from "./screens/home/router";
import invetoryRouter from "./screens/inventory/router";
// import dashboardRouter from "@/screens/dashboard/router";


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
    // path: "/in",
    // element: <HeaderLayout />,
    // children: [seetingsRouter].flat(),
  },
].flat();
