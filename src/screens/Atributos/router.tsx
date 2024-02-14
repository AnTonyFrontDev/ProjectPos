import { RouteObject } from "react-router-dom";

import Atributos from "./pages/Atributos"
import Bank from "./pages/Bank";
import CategorySize from "./pages/CategorySize";
import Size from "./pages/Size";
import Payment from "./pages/Payment";
import PaymentType from "./pages/PaymentType";
import TypeProd from "./pages/TypeProd";
import Color from "./pages/Color";
import Expenses from "./pages/Expenses";

const router: RouteObject[] = [
  {
    path: "/atributos",
    element: <Atributos/>,
  },
  {
    path: "/atributos/Bank", 
    element: <Bank/>,
  },
  {
    path: "/atributos/Color", 
    element: <Color/>,
  },
  {
    path: "/atributos/Size", 
    element: <Size/>,
  },
  {
    path: "/atributos/Payment", 
    element: <Payment/>,
  },
  {
    path: "/atributos/PaymentType", 
    element: <PaymentType/>,
  },
  {
    path: "/atributos/TypeProd", 
    element: <TypeProd/>,
  },
  {
    path: "/atributos/CategorySize", 
    element: <CategorySize/>,
  },
  {
    path: "/atributos/CategorySize", 
    element: <CategorySize/>,
  },
  {
    path: "/atributos/Expenses", 
    element: <Expenses/>,
  },
];

export default router;
