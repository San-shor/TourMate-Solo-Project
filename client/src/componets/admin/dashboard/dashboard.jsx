import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import {
  faClipboardCheck,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";

import "./dashboard.css";
import {
  faHome,
  faSuitcase,
  faUsers,
  faCog,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  return (
    <div>
      <div className="h-screen flex flex-col justify-between py-6 shadow-lg sidebar">
        <nav>
          <ul>
            <li>
              <Link
                to="/admin"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white nav-link"
              >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                <span className="nav-text">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/triplist"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white  nav-link"
              >
                <FontAwesomeIcon icon={faSuitcase} className="mr-2" />
                <span className="nav-text">Trip Packages</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/addTrip"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white  nav-link"
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                <span className="nav-text">Add Trip</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/requested"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white  nav-link"
              >
                <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                <span className="nav-text">Requested Trip</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/booking"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white  nav-link"
              >
                <FontAwesomeIcon icon={faClipboardCheck} className="mr-2" />
                <span className="nav-text">Booking Trip</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin/users"
                className="flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white  nav-link"
              >
                <FontAwesomeIcon icon={faUserCheck} className="mr-2" />
                <span className="nav-text">Travel User</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
