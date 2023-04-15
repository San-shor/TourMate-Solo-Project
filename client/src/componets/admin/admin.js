import { Outlet } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";

const Admin = () => {
  return (
    <div className="flex ">
      <div className="w-[200px]">
        <Dashboard />
      </div>
      <div className="flex-grow">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Admin;
