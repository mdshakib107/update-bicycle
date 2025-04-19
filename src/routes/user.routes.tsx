import CustomerDashboardLandingpage from "@/pages/dashboard/customer/landing/CustomerDashboardLandingpage";
import ViewOrders from "../pages/dashboard/customer/orders/viewOrders";
import ManageProfile from "../pages/dashboard/shared/profile/manageProfile";
import UpdatePassword from "../pages/dashboard/shared/profile/updatePassword";

export const userPaths = [
  {
    name: "My Dashboard",
    path: "my-dashboard",
    element: <CustomerDashboardLandingpage />,
  },
  {
    name: "Manage Profile",
    path: "manage-profile",
    element: <ManageProfile />,
  },
  {
    name: "Update Password",
    path: "change-password",
    element: <UpdatePassword />,
  },
  {
    name: "View Orders",
    path: "view-order",
    element: <ViewOrders />,
  },
];
