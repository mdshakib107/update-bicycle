import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  useCurrentToken,
  useCurrentUser,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(useCurrentUser);
  const dispatch = useAppDispatch();
  //let user;

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
