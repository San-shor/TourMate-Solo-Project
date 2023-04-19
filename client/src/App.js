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
import Footer from "./componets/footer";
import AdminHome from "./componets/admin/home/home";

function App() {
  const [trip, setTrip] = useState([]);

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
                <Navbar isAuthenticated={isAuthenticated}></Navbar>
                <RequestTrip FalseTrip={trip} />
              </>
            }
          />
          <Route
            path="/trip"
            element={
              <>
                <Navbar isAuthenticated={isAuthenticated} />
                <TripPackages TrueTrip={trip} />
              </>
            }
          />
          <Route
            path="/details/:id"
            element={
              <>
                <Navbar isAuthenticated={isAuthenticated} />
                <TripDetails tripid={trip} />
              </>
            }
          />
          <Route
            path="/profile"
            element={
              <>
                <Navbar isAuthenticated={isAuthenticated} />

                <Profile />
              </>
            }
          />
          <Route
            path="/register"
            element={
              <>
                <Navbar isAuthenticated={isAuthenticated} />

                <Register setIsAuthenticated={setIsAuthenticated} />
              </>
            }
          ></Route>
          <Route
            path="/login"
            element={
              <>
                <Navbar isAuthenticated={isAuthenticated} />
                <Login setIsAuthenticated={setIsAuthenticated} />
              </>
            }
          ></Route>
          <Route
            path="/logout"
            element={
              <>
                <Navbar isAuthenticated={isAuthenticated} />
                <Logout setIsAuthenticated={setIsAuthenticated} />
              </>
            }
          />

          <Route path="/admin/*" element={<Admin />}>
            <Route path="board" element={<AdminHome />}></Route>
            <Route
              path="triplist"
              element={<TripList trip={trip} fetchTrip={fetchData} />}
            />
            <Route path="addtrip" element={<AddTrip fetchTrip={fetchData} />} />

            <Route path="requested" element={<RequestedInfo />} />
            <Route path="booking" element={<BookingInfo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
