import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import "./bookForm.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  numPersons: "",
  category: "Family",
};

const BookingFormModal = ({ showModal, trip }) => {
  const [booking, setBooking] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setBooking((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tripId: trip._id, ...booking }),
      });
      if (response.ok) {
        const data = await response.json();
        setBooking(initialState);

        alert("Booking successfully!");
      } else {
        console.log("Error occurred while adding booking");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={showModal}>
      <div className="booking-form mx-auto px-4 py-6">
        <div className="logo-container">
          <img
            className="logo-img"
            src="https://img.freepik.com/free-vector/happy-family-car_1308-44468.jpg?size=626&ext=jpg&ga=GA1.1.322161551.1679468122&semt=ais"
            alt=""
          />
          <h2 className="logo-text">Booking Form</h2>
        </div>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="sm:grid sm:grid-cols-2 sm:gap-6">
            <div className="mt-4 sm:mt-0">
              <label className="label">
                <span className="label-text">Yur Name</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered"
                name="name"
                value={booking.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Type here"
                className="input input-bordered"
                name="email"
                value={booking.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:gap-6">
            <div className="mt-4 sm:mt-0">
              <label className="label">
                <span className="label-text">Phone</span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                name="phone"
                value={booking.phone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                name="address"
                value={booking.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="sm:grid sm:grid-cols-2 sm:gap-6">
            <div>
              <label className="label">
                <span className="label-text">Num Of Person</span>
              </label>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                name="numPersons"
                value={booking.numPersons}
                onChange={handleChange}
              />
              <p>Seats available: {trip.totalSeat} </p>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                name="category"
                value={booking.category}
                onChange={handleChange}
                defaultValue="Family"
              >
                <option selected>Category</option>
                <option value="Family">Family</option>
                <option value="Single">Single</option>
              </select>
            </div>
          </div>
          <div>
            <h3>Family Packages: {trip.personalPrice} (Per Person)</h3>
            <h3>Single Packages: {trip.nonpersonalPrice} (Per Person)</h3>
          </div>

          <div className="sm:grid sm:grid-cols-2 sm:gap-6">
            <div>
              <input type="checkbox" id="terms" name="terms" />
              <label for="terms" className="terms">
                I have read and agreed to the <a href="#">Terms & Conditions</a>
                , <a href="#">Privacy Policy</a>, <a href="#">Refund Policy</a>{" "}
                and <a href="#">Travel Policy</a>
              </label>
            </div>
          </div>
          <div className="mt-1">
            <button type="submit" className="btn book-btn ">
              Confirm
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default BookingFormModal;
