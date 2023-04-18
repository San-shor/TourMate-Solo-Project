import React, { useState } from "react";
import "./login/login.css";
import apiServiceJWT from "../service/apiserviceJwt";
import { useNavigate } from "react-router-dom";
import auth from "../utils/auth";

const Register = (props) => {
  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    password: "",
  };
  let navigate = useNavigate();
  const [formValue, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, fullName, phone } = formValue;

    const user = { email, password, fullName, phone };
    try {
      const response = await apiServiceJWT.register(user);
      auth.login(() => {
        props.setIsAuthenticated(true);
      });
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const validateForm = () => {
    return (
      !formValue.email ||
      !formValue.password ||
      !formValue.fullName ||
      !formValue.phone
    );
  };

  return (
    <div className="login">
      <div className="form">
        <h1 className="heading">Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              name="fullName"
              type="text"
              className="text"
              placeholder="Enter your full name"
              value={formValue.fullName}
              onChange={handleChange}
            ></input>
            <br />
            <input
              type="email"
              name="email"
              className="text"
              placeholder="Enter
            your email"
              value={formValue.email}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              className="text"
              placeholder="Enter your password"
              value={formValue.password}
              onChange={handleChange}
            />
            <br />
            <input
              name="phone"
              type="tel"
              className="text"
              placeholder="Enter your phone number"
              value={formValue.phone}
              onChange={handleChange}
            ></input>
            <br />
            <input
              type="submit"
              value="Submit"
              className="button"
              disabled={validateForm()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
