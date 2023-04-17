import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./App.css";
import Home from "./pages/home/home";
import Navbar from "./pages/navbar/nabar";
import auth from "./utils/auth";
import { Route, Routes } from "react-router-dom";
import TripList from "./componets/admin/addtrip/tripList";
import { BrowserRouter } from "react-router-dom";

import AddTrip from "./componets/admin/addtrip/addTrip";
import Register from "./componets/register";
import Login from "./componets/login/login";
import RequestTrip from "./componets/RequestTRip/request";
import TripPackages from "./componets/trip/trippackages";
import TripDetails from "./componets/admin/addtrip/tripDetails";
import Admin from "./componets/admin/admin";
import Profile from "./componets/profile/profile";

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
          <Route path="/request" element={<RequestTrip FalseTrip={trip} />} />
          <Route path="/trip" element={<TripPackages TrueTrip={trip} />} />
          <Route path="/details/:id" element={<TripDetails tripid={trip} />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/register"
            element={<Register setIsAuthenticated={setIsAuthenticated} />}
          ></Route>
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          ></Route>

          <Route path="/admin/*" element={<Admin />}>
            <Route path="triplist" element={<TripList trip={trip} />} />
            <Route path="addtrip" element={<AddTrip fetch={fetchData} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
