import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
const RequestTrip = ({ FalseTrip }) => {
  const availableTrips = FalseTrip.filter((trip) => trip.available === false);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <p className="countdown-timer">
        {days} days, {hours} hours, {minutes} minutes, {seconds} seconds until
        the tour
      </p>
    );
  }

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        <span className="span">Check Our Best Promotional Trip</span>
        <h2 className="block mb-22 ">Request Events</h2>
        <div
          id="trip-container"
          className="trip-container"
          style={{ display: "block" }}
        >
          {availableTrips.map((list, index) => {
            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-4 trip-card mb-4 flex flex-col"
              >
                <div className="image-container h-52 overflow-hidden mb-2">
                  <img src={list.images} className="w-full rounded-lg" />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold place-name">
                    {list.placeName}
                  </h3>
                  <span className="text-lg font-medium price">
                    {list.price}
                  </span>
                </div>
                <div className="date mb-2">
                  <a href="#">
                    {new Date(list.startdate).toLocaleDateString("en-US")}
                    {" - "}
                    {new Date(list.enddate).toLocaleDateString("en-US")}
                  </a>
                  <CountdownTimer tourDate={list.startdate} />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <p>Seats available: {list.totalSeat}</p>
                    <p>Family Packages (per person): {list.personalPrice}</p>
                    <p>Single Packages (per person): {list.nonpersonalPrice}</p>
                  </div>
                  <button className="bg-red-800 text-white font-bold py-2 px-4 rounded">
                    Not available
                  </button>
                </div>
                <div>
                  <h3>Do you want to available it?</h3>
                  <h4>Please Sent Request</h4>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-800 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Sent
                  </button>
                  {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)}>
                      <form>
                        <input type="text" placeholder="Your name"></input>
                        <input type="email" placeholder="Your email"></input>
                        <input type="phone" placeholder="Your Phone"></input>
                        <button className="bg-blue-900 text-white font-bold py-2 px-4 rounded">
                          Sent
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
  );
};

export default RequestTrip;
