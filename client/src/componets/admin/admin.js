import { Outlet } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import "./admin.css";

const Admin = () => {
  return (
    <div className="flex ">
      <div className="w-[200px]">
        <Dashboard />
      </div>
      <div className="admin-image"></div>

      <Outlet></Outlet>
    </div>
  );
};

export default Admin;
