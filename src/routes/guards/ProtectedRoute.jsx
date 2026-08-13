import { selectIsLoggedIn } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  if (!isLoggedIn)
    return <Navigate to="/auth/login" state={{ from: location }} replace />;

  return children;
};
