import AllBicyclesLayout from "@/layout/AllBicycles/AllBicyclesLayout";
import BicycleDetailsLayout from "@/layout/BicycleDetailsLayout/BicycleDetailsLayout";
import ForgotPassword from "@/pages/authentication/ForgotPassword";
import Register from "@/pages/authentication/register";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Sidebar from "../components/layout/sidebar";
import HomeLayout from "../layout/home/HomeLayout";
import Login from "../pages/authentication/Login";
import Page404 from "../pages/shared/Page404";
import AboutusLayout from "@/layout/about/AboutusLayout";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import TermsAndCondition from "@/pages/terms/TermsAndCondition";
import PrivacyPolicy from "@/pages/terms/PrivacyPolicy";
import PolicyLayout from "@/layout/policy/PolicyLayout";

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
        path: "/about",
        element: <AboutusLayout />,
      },
      {
        path: "/terms",
        element: <PolicyLayout />,
        children: [
          {
            index: true,
            element: <TermsAndCondition />,
          },
          {
            path: "policies",
            element: <PrivacyPolicy />,
          },
        ],
      },
      {
        path: "bicycles/:id", // Dynamic Route for Product Details
        element: <BicycleDetailsLayout />,
      },
    ],
  },
  {
    path: "/sidebar",
    element: <Sidebar />,
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
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        {" "}
        <App />
      </ProtectedRoute>
    ),

    children: routeGenerator(adminPaths),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute role="customer">
        {" "}
        <App />{" "}
      </ProtectedRoute>
    ),

    children: routeGenerator(userPaths),
  },
]);

export default routes;
