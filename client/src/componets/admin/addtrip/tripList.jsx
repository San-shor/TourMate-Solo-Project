import { useState } from "react";

const TripList = ({ trip }) => {
  return (
    <div className=" flex justify-between text-center overflow-x-auto mx-auto">
      <div>
        <table className="table w-6">
          <thead>
            <tr>
              <th></th>
              <th>Place Name</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Images</th>
              <th>Venue</th>
              <th>Inclusions</th>
              <th>Category</th>
              <th>Request</th>
              <th>Available</th>
            </tr>
          </thead>
          <tbody>
            {trip.map((list, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{list.placeName}</td>
                  <td>{list.description}</td>
                  <td>{list.duration}</td>
                  <td>{list.images}</td>
                  <td>{list.inclusions}</td>
                  <td>{list.category}</td>
                  <td>{list.requests}</td>
                  <td>{list.available.toString()}</td>
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
