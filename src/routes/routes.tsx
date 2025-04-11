import AllBicyclesLayout from "@/layout/AllBicycles/AllBicyclesLayout";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomeLayout from "../layout/home/HomeLayout";
import Sidebar from "../components/layout/sidebar";
import Login from "../pages/authentication/Login";
import Page404 from "../pages/shared/Page404";
import Register from "@/pages/authentication/register";
import AboutusLayout from "@/layout/about/AboutusLayout";
import { adminPaths } from './admin.routes';
import { userPaths } from './user.routes';
import { routeGenerator } from '../utils/routesGenerator';
import ProtectedRoute from '../components/layout/ProtectedRoute';

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
        path: "/about",
        element: <AboutusLayout />,
      },
    
    ],
  },
  {
    path: '/sidebar',
    element: <Sidebar />,

  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register/>
  },
{
  path: '/admin',
  element: (<ProtectedRoute role="admin"> <App /></ProtectedRoute>  ),
 
  children: routeGenerator(adminPaths),
},
{
  path: '/user',
  element: ( <ProtectedRoute role="customer"> <App /> </ProtectedRoute>),

 children: routeGenerator(userPaths),
},


  
]);

export default routes;
