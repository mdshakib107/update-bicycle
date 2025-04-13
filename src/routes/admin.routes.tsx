import AdminDashboard from '../layout/Dashboard/admin/AdminDashboard';
import Products from '../layout/Dashboard/admin/products/prodsucts';

export const adminPaths = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      element: <AdminDashboard />,
    },
    {
      name: 'Manage Users',
      children: [
        {
          name: '',
          path: '',
          element: <Products/>,
        },],
    },
    //{
     //   name: 'Orderd',
     //   children: [
     //     {
     //       name: '',
      //      path: '',
          //  element: < />,
      //    },],
     // },
     // {
     //   name: 'Products',
      //  children: [
      //    {
      //      name: '',
      //      path: '',
          //  element: < />,
      //    },],
     // }



]