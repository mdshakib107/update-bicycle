import AllBicyclesLayout from "@/layout/AllBicycles/AllBicyclesLayout";
import ForgotPassword from "@/pages/authentication/ForgotPassword";
import Register from "@/pages/authentication/register";
import BicyclesDetailes from "@/pages/bicycleDetailes/bicyclesDetailes";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../layout/home/HomeLayout";
import Login from "../pages/authentication/Login";
import Page404 from "../pages/shared/Page404";

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
      {
        path: "AllBicycles",
        element: <AllBicyclesLayout />,
      },
      {
        path: "bicycles/:id", // Dynamic Route for Product Details
        element: <BicyclesDetailes />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export default routes;
