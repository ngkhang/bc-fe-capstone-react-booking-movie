import { Outlet } from "react-router-dom";

const AuthTemplate = () => {
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Outlet />
    </div>
  );
};

export default AuthTemplate;
