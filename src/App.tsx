import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { setUser } from "./redux/features/auth/authSlice";
import { useAppDispatch } from "./redux/hooks";
import ScrollToTop from "./routes/ScrollToTop";

function App() {
  const dispatch = useAppDispatch();

  // Auto-Login Using Stored Token
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const userData =
      localStorage.getItem("userData") || sessionStorage.getItem("userData");

    if (token && userData) {
      const parsedUser = JSON.parse(userData);
      dispatch(setUser({ user: parsedUser, token }));
    }
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default App;
