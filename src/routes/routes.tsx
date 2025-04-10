import AllBicyclesLayout from "@/layout/AllBicycles/AllBicyclesLayout";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../layout/home/HomeLayout";
import Login from "../pages/authentication/Login";
import Page404 from "../pages/shared/Page404";
import Register from "@/pages/authentication/register";

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
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register/>
  }
]);

export default routes;
