import { Outlet } from "react-router-dom";

const AuthTemplate = () => {
  return (
    <div>
      <h1>AuthTemplate</h1>
      <Outlet />
    </div>
  );
};

export default AuthTemplate;
