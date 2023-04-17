import { useState } from "react";
import DatePicker from "react-datepicker";
import "./addtrip.css";

import "react-datepicker/dist/react-datepicker.css";
const initialState = {
  placeName: "",
  description: "",
  startdate: "",
  enddate: "",
  price: "",
  images: "",
  inclusions: "",
  category: "",
  available: "true",
};
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
              <span className="label-text">Description</span>
              <input
                type="text"
                name="description"
                value={trip.description}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
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
              <span className="label-text">Price</span>
              <input
                type="text"
                name="price"
                value={trip.price}
                onChange={handleChange}
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Images</span>
              <input
                type="file"
                name="images"
                value={trip.images}
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
              <span className="label-text">Category</span>
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
