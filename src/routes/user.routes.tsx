import ManageProfile from "../layout/Dashboard/user/manageProfile";
import UpdatePassword from "../layout/Dashboard/user/UpdatePassword";
import UserDashboard from "../layout/Dashboard/user/UserDashboard";
import ViewOrders from "../layout/Dashboard/user/viewOrders";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Manage Profile",
    path: "manage-profile",
    element: <ManageProfile />,
  },
  {
    name: "Update Password",
    path: "update-password",
    element: <UpdatePassword />,
  },
  {
    name: "View Orders",
    children: [
      {
        path: "view-order",
        element: <ViewOrders />,
      },
    ],
  },
];
