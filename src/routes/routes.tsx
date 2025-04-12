import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../layout/home/HomeLayout";
import Login from "../pages/authentication/Login";
import Page404 from "../pages/shared/Page404";
import Checkout from "../pages/checkout/Checkout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Page404 />,
    children: [
      {
        index: true,
        element: <HomeLayout />,
        // element: <ProtectedRoute><Home /></ProtectedRoute>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/checkout/:id",
    element: <Checkout/>
  },
]);

export default routes;
