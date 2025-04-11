import { Outlet } from "react-router-dom";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { verifyToken } from "./utils/verifyToken";
import { setUser, TUser } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useAppDispatch();

  // Auto-Login Using Stored Token
  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    if (token) {
      const user = verifyToken(token);
      if (user) {
        dispatch(setUser({ user: user as TUser, token }));
      }
    }
  }, [dispatch]);

  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
