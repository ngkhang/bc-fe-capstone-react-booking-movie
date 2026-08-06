import { Outlet } from "react-router-dom";

const AdminTemplate = () => {
  return (
    <div>
      <h1>AdminTemplate</h1>
      <Outlet />
    </div>
  );
};

export default AdminTemplate;
