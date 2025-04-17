import AddBicycle from "@/pages/dashboard/admin/products/AddBicycle";
import AdminDashboard from "../layout/Dashboard/admin/AdminDashboard";
import Products from "../pages/dashboard/admin/products/prodsucts";

export const adminPaths = [
  {
    name: "My Dashboard",
    path: "my-dashboard",
    element: <AdminDashboard />,
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
        element: <AddBicycle/>,
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
