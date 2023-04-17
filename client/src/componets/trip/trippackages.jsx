import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./trip.css";
const TripPackages = ({ TrueTrip }) => {
  const availableTrips = TrueTrip.filter((trip) => trip.available === true);
  return (
    <div className="flex flex-col items-center justify-center">
      <span className="span">Check Our Best Promotional Trip</span>
      <h2 className="block mb-22 ">Upcoming Events</h2>
      <div className="trip-container">
        {availableTrips.map((list, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center bg-white rounded-lg shadow-lg p-4 trip-card"
            >
              <div className="image-container h-52 overflow-hidden">
                <img src={list.images} className="w-full rounded-lg" />
              </div>
              <div className="flex justify-between w-full mb-2">
                <h3 className="text-xl font-bold place-name">
                  {list.placeName}
                </h3>
                <span className="text-lg font-medium price">{list.price}</span>
              </div>
              <p className="date">
                <a href="#">
                  {new Date(list.startdate).toLocaleDateString("en-US")}
                  {" - "}
                  {new Date(list.enddate).toLocaleDateString("en-US")}
                </a>{" "}
                <br />
              </p>
              <div>
                <Link
                  to={`/details/${index}`}
                  className="bg-sky-900 hover:bg-sky-950 text-white font-bold py-2 px-4 rounded details-button"
                >
                  Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TripPackages;
