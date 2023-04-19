import { NavLink } from "react-router-dom";
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
  const nav_items = [
    {
      label: "Dashbord",
      link_to: "/admin/board",
      icon: faHome,
    },
    {
      label: "Trip Packages",
      link_to: "/admin/triplist",
      icon: faSuitcase,
    },
    {
      label: "Add Trip",
      link_to: "/admin/addTrip",
      icon: faPlus,
    },
    {
      label: "Requested Trip",
      link_to: "/admin/requested",
      icon: faPaperPlane,
    },
    {
      label: "Trips Booked",
      link_to: "/admin/booking",
      icon: faClipboardCheck,
    },
  ];

  return (
    <div className="w-[200px]">
      <div className="h-screen flex flex-col justify-between py-6 shadow-lg sidebar">
        <nav>
          <ul>
            {nav_items.map((nav_item) => {
              return (
                <li key={nav_item.label}>
                  <NavLink
                    to={nav_item.link_to}
                    className={({ isActive }) => {
                      let cls =
                        "nav-link px-2 text-gray-300 hover:bg-gray-400 hover:text-white rounded-md";
                      if (isActive) {
                        return cls + " bg-gray-400 text-white";
                      }
                      return cls;
                    }}
                  >
                    <div className="px-2">
                      <FontAwesomeIcon icon={nav_item.icon} className="mr-2" />
                      <span className="nav-text">{nav_item.label}</span>
                    </div>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;
