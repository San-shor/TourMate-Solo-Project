import React, { useState, useEffect } from "react";
import "./App.css";
import Home from "./pages/home/home";
import Navbar from "./pages/navbar/nabar";
import auth from "./utils/auth";
import { Route, Routes } from "react-router-dom";
import TripList from "./componets/admin/addtrip/tripList";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./componets/admin/dashboard/dashboard";
import AddTrip from "./componets/admin/addtrip/addTrip";

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
                <Navbar />
                <Home />
              </>
            }
          />
          <Route path="/admin/*" element={<Dashboard />} />
          <Route path="/triplist" element={<TripList trip={trip} />} />
          <Route path="/addtrip" element={<AddTrip fetch={fetchData} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
