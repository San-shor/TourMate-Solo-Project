import React, { useEffect, useState } from "react";
import apiServiceJWT from "../../service/apiserviceJwt";
import "./profile.css";
import { FaUserCircle } from "react-icons/fa";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
};

const Profile = () => {
  const [profile, setProfile] = useState(initialState);
  const fullName = profile.fullName;
  const email = profile.email;
  const phone = profile.phone;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const getProfile = async (accessToken) => {
      const userInfo = await apiServiceJWT.profile(accessToken);
      if (userInfo) {
        const { fullName, email, phone } = userInfo;
        setProfile((prevState) => {
          return {
            ...prevState,
            fullName,
            email,
            phone,
          };
        });
      } else {
        console.log("No user info found 😞");
      }
    };
    getProfile(accessToken);
  }, []);

  return (
    <section className="p-6 flex justify-between items-center">
      <div>
        <h2 className="text-2xl font-bold mb-2">My Profile</h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Welcome back, {fullName}! Everything is fine.
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Email:</span> {email}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-bold">Phone:</span> {phone}
            </p>
          </div>
        </div>
      </div>
      <div>
        <FaUserCircle className="text-3xl text-gray-600" />
      </div>
    </section>
  );
};

export default Profile;
