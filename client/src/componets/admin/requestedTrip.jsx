import React, { useState, useEffect } from "react";

const RequestedInfo = () => {
  const [requestTrip, setrequestTrip] = useState([]);

  const fetchInfo = () => {
    fetch("http://localhost:4000/request")
      .then((res) => res.json())
      .then((data) => {
        setrequestTrip(data);
      });
  };
  useEffect(() => {
    fetchInfo();
  }, []);

  const groupByPlace = (requests) => {
    const grouped = requests.reduce((groups, request) => {
      const place = request.place;
      if (!groups[place]) {
        groups[place] = [];
      }
      groups[place].push(request);
      return groups;
    }, {});
    return grouped;
  };
  const requestsByPlace = groupByPlace(requestTrip);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:4000/request/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        alert("Status changed successfully");
        fetchInfo();
      } else {
        console.log("Error occurred while changing status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mx-auto px-4">
      {Object.keys(requestsByPlace).map((place) => {
        let totalSeats = 0;
        requestsByPlace[place].forEach((request) => {
          totalSeats += request.seats;
        });

        return (
          <div key={place} className="my-8">
            <h2 className="text-xl font-bold">{place}</h2>
            <p className="text-gray-500 text-sm text-left">
              Total Requested Seats: {totalSeats}
            </p>
            <div className="overflow-x-auto">
              <table className="mt-4 w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="text-sm font-medium text-gray-500 border-b border-gray-300">
                    <th className="py-3 pl-4 text-left">Name</th>
                    <th className="py-3 pl-4 text-left">Email</th>
                    <th className="py-3 pl-4 text-left">Phone</th>
                    <th className="py-3 pl-4 text-left">Seats</th>
                    <th className="py-3 pl-4 text-left">Status</th>
                    <th className="py-3 pl-4 pr-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-normal text-gray-700 divide-y divide-gray-300">
                  {requestsByPlace[place].map((request, index) => (
                    <tr key={index}>
                      <td className="py-3 pl-4">{request.name}</td>
                      <td className="py-3 pl-4">{request.email}</td>
                      <td className="py-3 pl-4">{request.phone}</td>
                      <td className="py-3 pl-4">{request.seats}</td>
                      <td className="py-3 pl-4">
                        <div
                          className={`
                        p-3 text-white font-medium badge ${
                          request.status === "Accepted"
                            ? "badge-success"
                            : request.status === "Deny"
                            ? "badge-error"
                            : ""
                        }
                        `}
                        >
                          {request.status}
                        </div>
                      </td>
                      <td className="py-3 pl-4">
                        {request.status === "Pending" && (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(request._id, "Accepted")
                              }
                              className="bg-green-800 hover:bg-green-950 text-white font-semibold py-2 px-4 rounded mr-1"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleStatusChange(request._id, "Deny")
                              }
                              className="bg-red-700 hover:bg-red-900 text-white font-semibold py-2 px-4 rounded"
                            >
                              Deny
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestedInfo;
