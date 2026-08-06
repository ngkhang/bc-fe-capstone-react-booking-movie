import { Outlet } from "react-router-dom";

const UserTemplate = () => {
  return (
    <div>
      <h1>UserTemplate</h1>
      <Outlet />
    </div>
  );
};

export default UserTemplate;
