import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Page404 from "../pages/shared/Page404";
import HomeLayout from "../layout/home/HomeLayout";

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
]);

export default routes;
