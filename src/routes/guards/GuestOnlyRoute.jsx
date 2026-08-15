import { selectIsLoggedIn } from "@/store/slices/authSlice";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const GuestOnlyRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  if (isLoggedIn) return <Navigate to="/user/dashboard" replace />;
  return children;
};
