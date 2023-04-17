import { useState } from "react";
import "./triplist.css";

const TripList = ({ trip }) => {
  return (
    <div className="flex justify-between text-center overflow-x-auto table-container">
      <div>
        <table className="table w-full ">
          <thead>
            <tr>
              <th></th>
              <th>Place Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Inclusions</th>
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
                  <td>{list.description}</td>
                  <td>
                    {new Date(list.startdate).toLocaleDateString("en-US")}
                  </td>
                  <td> {new Date(list.enddate).toLocaleDateString("en-US")}</td>
                  <td>{list.inclusions}</td>
                  <td>{list.available.toString()}</td>

                  <td>
                    <div className="flex justify-center action-buttons">
                      <button>
                        <i className="fa fa-pencil"></i>
                      </button>
                      <button>
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
