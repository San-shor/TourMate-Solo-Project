import React from "react";
import auth from "../../utils/auth";
import apiServiceJWT from "../../service/apiserviceJwt";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  let navigate = useNavigate();
  const handleClick = () => {
    removeToken();
    handleAuth();
  };

  const removeToken = () => {
    apiServiceJWT.logout("accessToken");
  };

  const handleAuth = () => {
    props.setIsAuthenticated(false);
    auth.logout(() => navigate("/"));
  };

  return (
    <section className="w-10/12 mx-auto h-screen flex flex-col  items-center  mt-24 gap-5 ">
      <h2 className=" font-semibold text-xl">
        Are you sure you want to log out?
      </h2>
      <div className="flex gap-5">
        <Link to="/">
          <button className="btn btn-warning">No</button>
        </Link>
        <button className="btn btn-primary" onClick={() => handleClick()}>
          Yes
        </button>
      </div>
    </section>
  );
};

export default Logout;
