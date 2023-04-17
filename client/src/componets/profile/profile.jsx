import React, { useEffect, useState } from "react";
import apiServiceJWT from "../../service/apiserviceJwt";
import "./profile.css";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  bookings: [],
};

const Profile = () => {
  const [profile, setProfile] = useState(initialState);
  const fullName = profile.fullName;
  const email = profile.email;
  const phone = profile.phone;
  const address = profile.address;
  const bookings = profile.bookings;

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const getProfile = async (accessToken) => {
      const userInfo = await apiServiceJWT.profile(accessToken);
      if (userInfo) {
        const { fullName, email, phone, address, bookings } = userInfo;
        setProfile((prevState) => {
          return {
            ...prevState,
            fullName,
            email,
            phone,
            address,
            bookings,
          };
        });
      } else {
        console.log("No user info found 😞");
      }
    };
    getProfile(accessToken);
  }, []);

  return (
    <section>
      <h2>My Profile</h2>
      <h3>Welcome back, {fullName}! Everything is fine.</h3>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>Address: {address}</p>
      {bookings.length > 0 && (
        <div>
          <h4>Bookings</h4>
          <ul>
            {bookings.map((booking) => (
              <li key={booking.id}>{booking.details}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Profile;
