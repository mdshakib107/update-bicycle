import Sidebar from "@/components/layout/sidebar";
import Loading from "@/components/shared/Loading";
import { verifyToken } from "@/utils/verifyToken";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function DashboardLayout() {


  // navigation
  const navigate = useNavigate();

  // loading effect state
  const [redirecting, setRedirecting] = useState(false);


  // Check if the user is already logged in when the component is mounted
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (token) {
      const user = verifyToken(token); // You can verify if the token is valid here
      if (!user) {
        setRedirecting(true); // Trigger Loading state

        // Delay the navigation by 1 second (1000 ms)
        const timeout = setTimeout(() => {
          toast.info("You are not logged in!");
          // If the token is valid, redirect to home
          navigate("/login");
        }, 1000);

        // Optional: clear timeout if the component unmounts before it completes
        return () => clearTimeout(timeout);
      }
    }
  }, [navigate]); // Empty dependency array to run once when the component is mounted

  // loading
  if (redirecting) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
}

export default DashboardLayout;
