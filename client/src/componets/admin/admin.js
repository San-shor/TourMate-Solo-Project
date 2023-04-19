import { Outlet } from "react-router-dom";
import Dashboard from "./dashboard/dashboard";
import "./admin.css";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Admin = () => {
  let location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location);

    if (location.pathname === "/admin/" || location.pathname === "/admin") {
      navigate("/admin/board");
    }
  }, [location]);
  return (
    <div className="flex flex-row">
      <div className="w-[200px]">
        <Dashboard />
      </div>
      <div className="flex-grow h-[100vh] overflow-y-scroll">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Admin;
