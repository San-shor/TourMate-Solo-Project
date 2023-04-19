import React, { useEffect, useState } from "react";
import apiServiceJWT from "../../service/apiserviceJwt";

import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BookingInfo from "../admin/bookingInfo";

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
  let navigate = useNavigate();

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
        navigate("/");
      }
    };
    getProfile(accessToken);
  }, []);

  return (
    <section className="p-6 h-screen overflow-y-scroll">
      <div className=" w-full flex  justify-center flex-col items-center">
        <FaUserCircle fontSize={50} className=" text-gray-600" />
        <p>{fullName}</p>
        <p>{email}</p>
      </div>
      {fullName && <BookingInfo username={fullName} />}
    </section>
  );
};

export default Profile;
