import { useMemo } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { privateRoutes } from "./routes";

function App() {
  const browserRouter = useMemo(
    () => createBrowserRouter([...privateRoutes, ...privateRoutes]),
    []
  );

  return (
    <>
      <RouterProvider router={browserRouter} />
    </>
  );
}

export default App;
