import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
    return (
      <div className="flex justify-center items-center w-full h-[calc(100vh-150px)]">
        <Outlet/>
      </div>
    );
  };
  
  export default AdminDashboard;