import { Outlet } from "react-router-dom";

const DefaultTemplate = () => {
  return (
    <div>
      <h1>DefaultTemplate</h1>
      <Outlet />
    </div>
  );
};

export default DefaultTemplate;
