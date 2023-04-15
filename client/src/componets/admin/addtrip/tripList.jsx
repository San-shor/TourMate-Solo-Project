import { useState } from "react";

const TripList = ({ trip }) => {
  return (
    <div className=" flex justify-between text-center overflow-x-auto ">
      <div>
        <table className="table w-6">
          <thead>
            <tr>
              <th></th>
              <th>Place Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Inclusions</th>
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
                  <td>{list.startdate}</td>
                  <td>{list.enddate}</td>
                  <td>{list.inclusions}</td>

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
