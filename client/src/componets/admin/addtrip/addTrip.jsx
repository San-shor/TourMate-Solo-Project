import { useState } from "react";
import DatePicker from "react-datepicker";
import "./addtrip.css";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { CloudinaryImage } from "@cloudinary/url-gen";

import "react-datepicker/dist/react-datepicker.css";
const initialState = {
  placeName: "",
  location: "",
  startdate: "",
  enddate: "",
  personalPrice: "",
  nonpersonalPrice: "",
  //images: "",
  inclusions: "",
  exclusion: "",
  totalSeat: "",
  bookedSeat: "0",
  available: "true",
};
const myImage = new CloudinaryImage("sample", {
  cloudName: "diomcrrey",
}).resize(fill().width(100).height(150));
const AddTrip = () => {
  const [trip, setTrip] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setTrip((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trip),
      });
      if (response.ok) {
        const data = await response.json();
        console.log(trip);
        setTrip(initialState);

        alert("Trip added successfully!");
      } else {
        console.log("Error occurred while adding trip");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="add-trip mx-auto px-4 py-6 ">
      <h1 className="text-2xl font-semibold mb-4">Add a New Trip</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="sm:grid sm:grid-cols-2 sm:gap-6">
          <div className="mt-4 sm:mt-0">
            <label className="label">
              <span className="label-text">Place name</span>
              <input
                type="text"
                name="placeName"
                value={trip.placeName}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Location</span>
              <select
                className="select select-bordered w-full max-w-xs"
                name="location"
                value={trip.location}
                onChange={handleChange}
              >
                <option value="No Location">No Location</option>
                <option value="Cox'sBazar"> Cox's Bazar</option>
                <option value="Chattogram">Chattogram</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Cumilla">Cumilla</option>
                <option value="Khulna">Khulna</option>
                <option value="Bandarban">Bandarban</option>
              </select>
            </label>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-2 sm:gap-6">
          <div className="mt-4 sm:mt-0">
            <label className="label">
              <span className="label-text">Going Date</span>
              <DatePicker
                name="date"
                selected={trip.startdate}
                onChange={(date) =>
                  setTrip((prevState) => ({
                    ...prevState,
                    startdate: date,
                  }))
                }
                className="input input-bordered w-full max-w-xs"
              ></DatePicker>
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">End date</span>
              <DatePicker
                name="date"
                selected={trip.enddate}
                onChange={(date) =>
                  setTrip((prevState) => ({
                    ...prevState,
                    enddate: date,
                  }))
                }
                className="input input-bordered w-full max-w-xs"
              ></DatePicker>
            </label>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-2 sm:gap-6">
          <div className="mt-4 sm:mt-0">
            <label className="label">
              <span className="label-text">Single Packages Price</span>
              <input
                type="number"
                name="personalPrice"
                value={trip.personalPrice}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Family Packages Price</span>
              <input
                type="number"
                name="nonpersonalPrice"
                value={trip.nonpersonalPrice}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-2 sm:gap-6">
          <div className="mt-4 sm:mt-0">
            <label className="label">
              <span className="label-text">Inclusions</span>
              <input
                type="text"
                name="inclusions"
                value={trip.inclusions}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Availabale</span>
              <select
                className="select select-bordered w-full max-w-xs"
                name="available"
                value={trip.available}
                onChange={handleChange}
                defaultValue="true"
              >
                <option disabled>Available</option>
                <option value="true"> True</option>
                <option value="false">False</option>
              </select>
            </label>
          </div>
        </div>
        <div className="sm:grid sm:grid-cols-2 sm:gap-6">
          <div className="mt-4 sm:mt-0">
            <label className="label">
              <span className="label-text">Total Seat</span>
              <input
                type="number"
                name="totalSeat"
                value={trip.totalSeat}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Booked Seat</span>
              <input
                className="select select-bordered w-full max-w-xs"
                name="bookedseat"
                value={trip.bookedSeat}
                onChange={handleChange}
                defaultValue="0"
              />
            </label>
          </div>
        </div>
        <div className="mt-1">
          <button type="submit" className="btn btn-primary ">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTrip;
