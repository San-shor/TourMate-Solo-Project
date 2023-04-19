import { useState } from "react";

import "./triplist.css";

const TripList = ({ trip, fetchTrip }) => {
  const [tripList, setTripList] = useState(trip);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/trip/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Trips deleted successfully");
        fetchTrip();
      } else {
        alert("Error occurred while deleting booking");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // const handleUpdate = async (id, updatedBookingData) => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/trip/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedBookingData),
  //     });
  //     if (response.ok) {
  //       alert("Booking updated successfully");
  //     } else {
  //       alert("Error occurred while updating booking");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <div className=" text-center overflow-x-auto table-container">
      <div className="text-left">
        <h1 className="text-2xl ml-5 mt-5">Trip List </h1>
      </div>
      <div>
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Place Name</th>
              <th>location</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Total Seat</th>
              <th>Single Package</th>
              <th>Family Packages</th>
              <th>Available</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {trip.map((list, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{list.placeName}</td>
                  <td>{list.location}</td>
                  <td>
                    {new Date(list.startdate).toLocaleDateString("en-US")}
                  </td>
                  <td> {new Date(list.enddate).toLocaleDateString("en-US")}</td>
                  <td>{list.totalSeat}</td>
                  <td>{list.personalPrice} BDT</td>
                  <td>{list.nonpersonalPrice} BDT</td>
                  <td>{list.available.toString()}</td>

                  <td>
                    <div className="flex justify-center action-buttons">
                      <button>
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button onClick={() => handleDelete(list._id)}>
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TripList;
