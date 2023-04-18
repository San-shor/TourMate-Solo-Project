import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

import "./trip.css";
const TripPackages = ({ TrueTrip, location }) => {
  const [minPersonalPrice, setMinPersonalPrice] = useState(0);
  const [maxPersonalPrice, setMaxPersonalPrice] = useState(100000);
  const [minNonpersonalPrice, setMinNonpersonalPrice] = useState(0);
  const [maxNonpersonalPrice, setMaxNonpersonalPrice] = useState(100000);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const availableTrips = TrueTrip.filter((trip) => {
    return (
      (selectedLocation === "" || trip.location === selectedLocation) &&
      trip.available === true &&
      trip.personalPrice >= minPersonalPrice &&
      trip.personalPrice <= maxPersonalPrice &&
      trip.nonpersonalPrice >= minNonpersonalPrice &&
      trip.nonpersonalPrice <= maxNonpersonalPrice
    );
  });
  return (
    <div className="flex flex-row justify-between mt-5 overflow-auto h-[400px]">
      {/* Filter options */}
      <div className="flex flex-col">
        <div className="filter-title fixed">
          <h5 className="header-title"></h5>
        </div>
        <div className="price-range pl-7 pr-8">
          <h5 className="font-bold">Filter Trips</h5>
          <div className="mt-6">
            <div className="input-range-wrapper">
              <label htmlFor="personal-price-range">
                Family Packages Range:{" "}
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="100"
                  value={minPersonalPrice}
                  onChange={(e) => setMinPersonalPrice(e.target.value)}
                />
              </label>
              <span className="min-ammount">BDT {minPersonalPrice}</span>
            </div>
            <div>
              <br />
              <label htmlFor="nonpersonal-price-range">
                Single Packages Range:{" "}
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="100"
                  value={minNonpersonalPrice}
                  onChange={(e) => setMinNonpersonalPrice(e.target.value)}
                />
              </label>
            </div>
            <span className="min-ammount">BDT {minNonpersonalPrice}</span>
            <br />
          </div>
        </div>
        <div className="filter-loaction justify-start p-4">
          <h5 className="font-bold  text-blue-950  p-3">Location</h5>
          <div className="location-checkboxes flex flex-col gap-4 p-4">
            <div>
              <label className="flex items-center ">
                <input
                  className=""
                  type="checkbox"
                  value="Chattogram"
                  onChange={handleLocationChange}
                ></input>

                <span className="ml-3">Chattogram</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Cox'sBazar"
                  onChange={handleLocationChange}
                ></input>

                <span className="ml-3">Cox'sBazar</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Sylhet"
                  onChange={handleLocationChange}
                ></input>
                <span className="ml-3">Sylhet</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Bandarban"
                  onChange={handleLocationChange}
                ></input>
                <span className="ml-3">Bandarban</span>
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  value="Khulna"
                  onChange={handleLocationChange}
                ></input>
                <span className="ml-3">Khulna</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="w-3/4 flex flex-col gap-4 ">
        {availableTrips.map((list, index) => {
          return (
            <div
              key={index}
              className="w-9/12 p-4 flex flex-row items-center  bg-white rounded-lg shadow-lg trip-card"
            >
              <div className="image-container w-64 ">
                <img src={list.images[0]} className="w-full rounded-lg" />
              </div>
              <div className=" mb-2 ml-6 h-full ">
                <h3 className="text-xl font-bold place-name text-red-900">
                  {list.placeName}
                </h3>
                <p className="text-sm ">
                  <span className="font-bold">Journey Date: </span>
                  <a href="#">
                    {format(new Date(list.startdate), "d MMM")}
                    {" - "}
                    {format(new Date(list.enddate), "d MMM")}
                  </a>{" "}
                </p>
                <div className=" price">
                  <p className="tooltip text-sm " data-tip="per person">
                    <span className="font-bold">Single Package </span>
                    {list.nonpersonalPrice} BDT
                  </p>

                  <br />
                  <p className="tooltip text-sm" data-tip="per person">
                    <span className="font-bold">Family Package </span>
                    {list.personalPrice} BDT
                  </p>
                </div>
              </div>

              <div className="mt-auto">
                <Link
                  to={`/details/${index}`}
                  className="bg-[#00095e] hover:bg-[#ffc800] text-white font-bold py-2 px-4 rounded details-button"
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
