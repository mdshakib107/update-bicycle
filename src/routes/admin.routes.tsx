import AdminDashboardLandingpage from "@/pages/dashboard/admin/landing/AdminDashboardLandingpage";
import AddBicycle from "@/pages/dashboard/admin/products/AddBicycle";
import Products from "../pages/dashboard/admin/products/prodsucts";

export const adminPaths = [
  {
    name: "My Dashboard",
    path: "my-dashboard",
    element: <AdminDashboardLandingpage />,
  },
  {
    name: "Manage Users",
    children: [
      {
        name: "All Products",
        path: "all-products",
        element: <Products />,
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
