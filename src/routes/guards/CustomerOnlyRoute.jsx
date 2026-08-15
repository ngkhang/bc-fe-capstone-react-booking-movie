import { selectIsLoggedIn, selectUserInfo } from "@/store/slices/authSlice";
import { USER_ROLE } from "@/utils/constant";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const CustomerOnlyRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userInfo = useSelector(selectUserInfo);

  if (isLoggedIn && userInfo?.maLoaiNguoiDung === USER_ROLE.ADMIN) {
    return <Navigate to="/admin" replace />;
  }
  return children;
};
