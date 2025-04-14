import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import ScrollToTop from "@/routes/ScrollToTop";
import { TUser } from "@/utils/types";
import { verifyToken } from "@/utils/verifyToken";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

function DashboardLayout() {
  const dispatch = useAppDispatch();

  // Auto-Login Using Stored Token
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (token) {
      const user = verifyToken(token);
      if (user) {
        dispatch(setUser({ user: user as TUser, token }));
      }
    }
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default DashboardLayout;
