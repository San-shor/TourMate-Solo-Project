import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
//import "./requesttrip.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
  seats: "",
};

const RequestTrip = ({ FalseTrip }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [requestTripId, setrequestId] = useState("");

  const [isloggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  //filter location
  const availableTrips = FalseTrip.filter((trip) => {
    return (
      (selectedLocation === "" || trip.location === selectedLocation) &&
      trip.available === false
    );
  });
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  //Post Request Logic
  const [request, setRequest] = useState(initialState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const trip_id = requestTripId;
      console.log(trip_id);
      const response = await fetch("http://localhost:4000/request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trip_id, ...request }),
      });
      if (response.ok) {
        const data = await response.json();
        setRequest(initialState);

        alert("Request Sent  successfully!");
      } else {
        console.log("Could not sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Set Timer Function
  function getTimerObject(dateString) {
    const tourDate = new Date(dateString);
    const now = new Date();
    const diff = tourDate.getTime() - now.getTime();
    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  }
  function CountdownTimer({ tourDate }) {
    const [timerObject, setTimerObject] = useState(getTimerObject(tourDate));
    useEffect(() => {
      const timerId = setInterval(() => {
        setTimerObject(getTimerObject(tourDate));
      }, 1000);
      return () => clearInterval(timerId);
    }, [tourDate]);
    const { days, hours, minutes, seconds } = timerObject;
    return (
      <div className="flex justify-center items-center h-[100px] bg-[#f2f2f2] rounded-md p-3">
        <div className="text-2xl font-bold flex justify-center items-center text-center">
          <div>{days}</div>
          <div className="text-2xl font-bold mt-0 mr-3">:</div>
          <div>{hours}</div>
          <div className="text-2xl font-bold mt-0 mr-3">:</div>
          <div>{minutes}</div>
          <div className="text-2xl font-bold mt-0 mr-3">:</div>
          <div>{seconds}</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="filter-loaction flex flex-row justify-start overflow-y-scroll h-[90vh] p-5">
        <div>
          <h5 className="font-bold  text-blue-950  p-3">Location</h5>
          <div className="location-checkboxes flex flex-col gap-4 p-4">
            <div>
              <label className="flex items-center">
                <input
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
        <div className="flex flex-col flex-1 items-center  ">
          <h2 className="text-2xl font-bold">Request a Trips</h2>
          <div className=" w-full">
            {availableTrips.map((list, index) => {
              return (
                <div className="flex">
                  <div className="w-5/12 ml-28 ">
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-lg p-4 trip-card mb-4 flex flex-col"
                    >
                      <div className="image-container w-full h-52 overflow-hidden mb-2">
                        <img src={list.images} className="w-full rounded-lg" />
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-base font-bold place-name">
                          {list.placeName}
                        </h3>
                      </div>
                      <div className="date mb-2">
                        <a href="#">
                          {new Date(list.startdate).toLocaleDateString("en-US")}
                          {" - "}
                          {new Date(list.enddate).toLocaleDateString("en-US")}
                        </a>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <p className="text-sm">
                            Seats available: {list.totalSeat}
                          </p>
                          <p className="text-sm">
                            Family Packages (per person): {list.personalPrice}
                          </p>
                          <p className="text-sm">
                            Single Packages (per person):{" "}
                            {list.nonpersonalPrice}
                          </p>
                        </div>
                        <button className="bg-red-800 text-white font-bold py-2 px-4 rounded">
                          Not available
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-80 p-5">
                    <CountdownTimer tourDate={list.startdate} />
                    <div className="flex flex-col justify-center text-center">
                      <h3>Do you want to available it?</h3>
                      <h4>Please Sent Request</h4>
                      {isloggedin ? (
                        <button
                          onClick={() => {
                            setIsModalOpen(true);
                            setrequestId(list._id);
                          }}
                          className="bg-green-800  mt-5 text-white font-bold py-2 px-4 rounded tooltip"
                          type="submit"
                          data-tip="Sent Request"
                        >
                          Sent
                        </button>
                      ) : (
                        <div
                          className="tooltip "
                          data-tip="Sign Up to sent request"
                        >
                          <button disabled className="btn">
                            Sent
                          </button>
                        </div>
                      )}
                    </div>
                    {isModalOpen && (
                      <Modal onClose={() => setIsModalOpen(false)}>
                        <form>
                          <input
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={request.name}
                            onChange={handleChange}
                            required
                          ></input>
                          <input
                            name="email"
                            value={request.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Your email"
                            required
                          ></input>
                          <input
                            name="phone"
                            type="number"
                            value={request.phone}
                            onChange={handleChange}
                            placeholder="Your Phone"
                            required
                          ></input>
                          <input
                            name="seats"
                            type="number"
                            value={request.seats}
                            onChange={handleChange}
                            placeholder="How many seats you will need?"
                            required
                          ></input>

                          <button
                            onClick={handleSubmit}
                            className="bg-blue-900 text-white font-bold py-2 px-4 rounded"
                          >
                            Submit
                          </button>
                        </form>
                      </Modal>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestTrip;
