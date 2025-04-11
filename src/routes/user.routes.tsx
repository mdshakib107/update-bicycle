import UserDashboard from '../layout/Dashboard/user/UserDashboard';
import ManageProfile from '../layout/Dashboard/user/manageProfile'
import UpdatePassword from '../layout/Dashboard/user/updatePassword'
import ViewOrders from '../layout/Dashboard/user/viewOrders'

export const userPaths = [
    {
      name: 'Dashboard',
      path: 'dashboard',
      element: <UserDashboard />,
    },
    {
      name: 'Manage Profile',
      children: [
        {
          path: '/:userId',
          element: <ManageProfile/>,
        },],
    },
    {
        name: 'Update Password',
        children: [
            {
            path: '/change-password',
           element: <UpdatePassword />,
          },],
      },
      {
        name: 'View Orders',
        children: [
          {
            path: '/:userId',
           element: <ViewOrders/>,
          },],
      }



]