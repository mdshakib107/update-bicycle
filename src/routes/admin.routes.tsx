import AdminDashboardLandingpage from "@/pages/dashboard/admin/landing/AdminDashboardLandingpage";
import AddBicycle from "@/pages/dashboard/admin/products/AddBicycle";
import AllProductsPage from "../pages/dashboard/admin/products/AllProductsPage";
import ManageProfile from "../pages/dashboard/shared/profile/manageProfile";
import UpdatePassword from "../pages/dashboard/shared/profile/updatePassword";

export const adminPaths = [
  {
    name: "My Dashboard",
    path: "my-dashboard",
    element: <AdminDashboardLandingpage />,
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
