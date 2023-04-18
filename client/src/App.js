import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./App.css";
import Home from "./pages/home/home";
import Navbar from "./pages/navbar/nabar";
import auth from "./utils/auth";
import { Route, Routes } from "react-router-dom";
import TripList from "./componets/admin/addtrip/tripList";
import { BrowserRouter } from "react-router-dom";
import Logout from "./componets/logout/logout";
import AddTrip from "./componets/admin/addtrip/addTrip";
import Register from "./componets/register";
import Login from "./componets/login/login";
import RequestTrip from "./componets/RequestTRip/request";
import TripPackages from "./componets/trip/trippackages";
import TripDetails from "./componets/admin/addtrip/tripDetails";
import Admin from "./componets/admin/admin";
import Profile from "./componets/profile/profile";

import RequestedInfo from "./componets/admin/requestedTrip";
import BookingInfo from "./componets/admin/bookingInfo";

function App() {
  const [trip, setTrip] = useState([]);
  const [bookingTrip, setBookingTrip] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:4000/trip")
      .then((res) => res.json())
      .then((data) => {
        setTrip(data);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchBooking = () => {
    fetch("http://localhost:4000/booking")
      .then((res) => res.json())
      .then((data) => {
        setBookingTrip(data);
      });
  };
  useEffect(() => {
    fetchBooking();
  }, []);

  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar isAuthenticated={isAuthenticated} />
                <Home />
              </>
            }
          />
          <Route
            path="/request"
            element={
              <>
                <Navbar></Navbar>
                <RequestTrip FalseTrip={trip} />
              </>
            }
          />
          <Route
            path="/trip"
            element={
              <>
                <Navbar />
                <TripPackages TrueTrip={trip} />
              </>
            }
          />
          <Route
            path="/details/:id"
            element={
              <>
                <Navbar />
                <TripDetails tripid={trip} />
              </>
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          ></Route>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          ></Route>
          <Route
            path="/logout"
            element={<Logout setIsAuthenticated={setIsAuthenticated} />}
          />

          <Route path="/admin/*" element={<Admin />}>
            <Route path="triplist" element={<TripList trip={trip} />} />
            <Route path="addtrip" element={<AddTrip fetch={fetchData} />} />

            <Route path="requested" element={<RequestedInfo />} />
            <Route
              path="booking"
              element={<BookingInfo bookingtrip={bookingTrip} />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
