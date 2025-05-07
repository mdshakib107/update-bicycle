import AdminDashboardLandingpage from "@/pages/dashboard/admin/landing/AdminDashboardLandingpage";
import AddBicycle from "@/pages/dashboard/admin/products/AddBicycle";
import UserManagement from "@/pages/dashboard/admin/userManage/userManagement";
import AllProductsPage from "../pages/dashboard/admin/products/AllProductsPage";
import ManageProfile from "../pages/dashboard/shared/profile/manageProfile";
import UpdatePassword from "../pages/dashboard/shared/profile/updatePassword";
import ManageOrders from "../pages/dashboard/admin/orders/ManageOrders.js"
import AdminProfile from "@/pages/dashboard/admin/profile/AdminProfile.js";

export const adminPaths = [
  {
    name: "My Dashboard",
    path: "my-dashboard",
    element: <AdminDashboardLandingpage />,
  },
  {
    name: "Profile",
    path: "profile",
    element: <AdminProfile />,
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
    name: "Manage Users",
    path: "manage-users",
    element: <UserManagement />,
  },
  {
    name: "Manage Orders",
    path: "manage-orders",
    element: <ManageOrders/>
  },
  {
    name: "Manage Products",
    children: [
      {
        name: "All Products",
        path: "all-products",
        element: <AllProductsPage />,
      },
      {
        name: "Add Bicycle",
        path: "add-bicycle",
        element: <AddBicycle />,
      },
    ],
  },
  // {
  //   name: 'Products',
  //  children: [
  //    {
  //      name: '',
  //      path: '',
  //  element: < />,
  //    },],
  // }
];
