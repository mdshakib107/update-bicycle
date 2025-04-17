import UserDashboard from "../layout/Dashboard/user/UserDashboard";
import ManageProfile from "../pages/dashboard/customer/manageProfile";
import UpdatePassword from "../pages/dashboard/customer/updatePassword";
import ViewOrders from "../pages/dashboard/customer/viewOrders";

export const userPaths = [
  {
    name: "My Dashboard",
    path: "my-dashboard",
    element: <UserDashboard />,
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
