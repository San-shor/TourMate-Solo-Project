import React, { useState } from "react";
import "./login.css";
import auth from "../../utils/auth";
import apiServiceJWT from "../../service/apiserviceJwt";
import { useNavigate } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

const Login = (props) => {
  let navigate = useNavigate();
  const [loginState, loginSetState] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    loginSetState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginState;
    const user = { email, password };
    const res = await apiServiceJWT.login(user);

    if (res.error) {
      alert(`${res.message}`);
      loginSetState(initialState);
    } else {
      const { accessToken } = res;
      localStorage.setItem("accessToken", accessToken);
      if (props.setIsAuthenticated) {
        props.setIsAuthenticated(true);
      }
      auth.login(() => navigate("/"));
    }
  };

  const validateForm = () => {
    return !loginState.email || !loginState.password;
  };

  return (
    <>
      <div className="login">
        <h1 className="heading">Login</h1>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <label className="label">Email:</label>

              <input
                type="email"
                className="text"
                placeholder="Enter your email"
                name="email"
                value={loginState.email}
                onChange={handleChange}
              />

              <label className="label">Password:</label>

              <input
                type="password"
                className="text"
                placeholder="Enter your password"
                name="password"
                value={loginState.password}
                onChange={handleChange}
              />

              <input
                type="submit"
                value="Login"
                className="button"
                disabled={validateForm()}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
