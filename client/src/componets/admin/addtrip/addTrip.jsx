import { useState } from "react";
const initialState = {
  placeName: "",
  description: "",
  duration: "",
  price: "",
  images: "",
  inclusions: "",
  category: "",
  available: "",
};
const AddTrip = ({ fetchdata }) => {
  const [trip, setTrip] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "available" ? value === "true" : value;
    setTrip((prevState) => ({
      ...prevState,
      [name]: newValue,
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
    <div className="container mx-auto px-4 py-6">
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
              <span className="label-text">Duration</span>
              <input
                name="duration"
                value={trip.duration}
                onChange={handleChange}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
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
          <div className="mt-4 sm:mt-0">
            <label className="label"></label>
            <select
              className="select select-bordered w-full max-w-xs"
              name="available"
              value={trip.available}
              onChange={handleChange}
            >
              <option disabled selected>
                Available
              </option>
              <option value={true}>True</option>
              <option value={false}>False</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTrip;
