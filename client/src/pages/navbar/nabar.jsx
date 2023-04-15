import { Link } from "react-router-dom";

const Navbar = () => {
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
            <Link to="/trip">Ready-Book-Trip</Link>
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
    </div>
  );
};

export default Navbar;
