import AboutusLayout from "@/layout/about/AboutusLayout";
import AllBicyclesLayout from "@/layout/AllBicycles/AllBicyclesLayout";
import BicycleDetailsLayout from "@/layout/BicycleDetailsLayout/BicycleDetailsLayout";
import CheckoutLayout from "@/layout/checkout/CheckoutLayout";
import AdminDashboardLayout from "@/layout/Dashboard/admin/AdminDashboardLayout";
import DashboardLayout from "@/layout/Dashboard/DashboardLayout";
import UserDashboardLayout from "@/layout/Dashboard/user/UserDashboardLayout";
import PolicyLayout from "@/layout/policy/PolicyLayout";
import ForgotPassword from "@/pages/authentication/ForgotPassword";
import Register from "@/pages/authentication/register";
import PrivacyPolicy from "@/pages/terms/PrivacyPolicy";
import TermsAndCondition from "@/pages/terms/TermsAndCondition";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import HomeLayout from "../layout/home/HomeLayout";
import Login from "../pages/authentication/Login";
import Checkout from "../pages/checkout/Checkout";
import Page404 from "../pages/shared/Page404";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import SuccessOrder from "@/pages/successOrder/SuccessOrder";
import FailedOrder from "@/pages/failedOrder/FailedOrder";

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
        path: "about",
        element: <AboutusLayout />,
      },
      {
        path: "successfull-order",
        element: <SuccessOrder/>
      },
      {
        path: "failed-order",
        element: <FailedOrder />,
      },
      {
        path: "terms",
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
        path: "checkout/:id",
        element: <CheckoutLayout />,
        children: [
          {
            index: true,
            element: <Checkout />,
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
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "admin",
        element: (
          <ProtectedRoute role="admin">
            <AdminDashboardLayout />
          </ProtectedRoute>
        ),

        children: routeGenerator(adminPaths),
      },
      {
        path: "customer",
        element: (
          <ProtectedRoute role="customer">
            <UserDashboardLayout />
          </ProtectedRoute>
        ),

        children: routeGenerator(userPaths),
      },
    ],
  },
]);

export default routes;
