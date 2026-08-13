import { selectIsLoggedIn, selectUserInfo } from "@/store/slices/authSlice";
import { USER_ROLE } from "@/utils/constant";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AdminRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userInfo = useSelector(selectUserInfo);

  if (!isLoggedIn) return <Navigate to="/auth/login" replace />;

  if (userInfo?.maLoaiNguoiDung !== USER_ROLE.ADMIN) {
    return <Navigate to="/" replace />;
  }
  return children;
};
