import { RouteObject } from "react-router-dom";
import Report from "./components/Report";

const router: RouteObject[] = [
  {
    path: "/reporDiffItems",
    element: <Report idPreOrder={8}/>,
  }
];

export default router;