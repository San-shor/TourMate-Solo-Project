import { Link, Routes, Route } from "react-router-dom";
import Register from "../../componets/register";
import Login from "../../componets/login/login";
import RequestTrip from "../../componets/RequestTRip/request";
import TripPackages from "../../componets/trip/trippackages";

const Navbar = ({ setIsAuthenticated }) => {
  return (
    <div className="container">
      <div className="navbar">
        <div className="header-logo">
          <img
            src="https://img.freepik.com/free-vector/road-trip-concept-with-kids-driving-classic-convertible-car_1308-111250.jpg?size=626&ext=jpg&ga=GA1.1.274511546.1680940767&semt=ais"
            alt="logo"
          />
          <span className="header-title">Tour Mate</span>
        </div>
        <nav>
          <li>
            <Link to="/">Ready-Book-Trip</Link>
          </li>
          <li>
            <Link to="/">Request Trip</Link>
          </li>

          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </nav>
      </div>
      <Routes>
        <Route path="/request" element={<RequestTrip />} />
        <Route path="/trip" element={<TripPackages />} />
        <Route
          path="/register"
          element={<Register setIsAuthenticated={setIsAuthenticated} />}
        ></Route>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default Navbar;
