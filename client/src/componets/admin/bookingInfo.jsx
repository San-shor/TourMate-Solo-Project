import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPeopleGroup, faPerson } from "@fortawesome/free-solid-svg-icons";
import { de } from "date-fns/locale";

const BookingInfo = ({ username }) => {
  const [bookingTrip, setBookingTrip] = useState([]);
  const fetchBooking = () => {
    const url =
      "http://localhost:4000/booking" +
      (username !== undefined ? "/" + username : "");
    debugger;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBookingTrip(data);
      });
  };
  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div className=" bg-gray-100 h-full pt-5 px-5">
      <h2 className="font-bold">List of Trips booked</h2>
      <div className="mt-5">
        {bookingTrip.map((data, i) => (
          <div
            key={i}
            tabIndex={0}
            className="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box mb-5"
          >
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium">
              <h2 className="text-lg">{data.placeName}</h2>
              <div className="text-sm space-x-2">
                {new Date(data.startdate).toLocaleDateString("en-US")}
                {" to "}

                {new Date(data.enddate).toLocaleDateString("en-US")}
              </div>
            </div>
            <div className="collapse-content bg-slate-200 pt-5">
              <ul className="flex gap-5 flex-wrap">
                {data.booked.map((item, i) => {
                  return (
                    <li key={i}>
                      <BookedCard
                        data={item}
                        fetchBooking={fetchBooking}
                        username={username}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function BookedCard({ data, fetchBooking, username }) {
  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:4000/booking/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        alert("Status changed successfully");
        fetchBooking();
      } else {
        console.log("Error occurred while changing status");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full">
      <div className="flex flex-col">
        <div className="mb-2">
          <span className="font-bold text-sm">Name:</span> {data.name}
        </div>
        <div className="mb-2">
          <span className="font-bold text-sm">Email:</span> {data.email}
        </div>
        <div className="mb-2">
          <span className="font-bold text-sm">Phone:</span> {data.phone}
        </div>
        <div className="mb-2">
          <span className="font-bold text-sm">Contact:</span> {data.contact}
        </div>
        <div className="mb-2">
          <span className="font-bold text-sm">Address:</span> {data.address}
        </div>
        <div className="mb-2">
          <span className="font-bold text-sm">Date:</span>{" "}
          {new Date(data.date).toLocaleDateString("en-US")}
        </div>
        <div className="mb-2">
          <span className="font-bold text-sm">Number of Persons:</span>{" "}
          {data.numPersons}
        </div>
        <div className="mb-2">
          <span className="font-bold text-sm">Total Price:</span> {data.price}{" "}
          BDT
        </div>
        <div className="flex gap-4">
          <div
            className="mb-2 tooltip"
            data-tip={"Booked for " + data.category}
          >
            <FontAwesomeIcon
              fontSize={24}
              icon={data.category == "Single" ? faPerson : faPeopleGroup}
            />
          </div>
          <div className="mb-2">
            <div
              className={`
                        p-3 text-white font-medium badge ${
                          data.status === "Confirmed"
                            ? "badge-success"
                            : data.status === "Cancelled"
                            ? "badge-error"
                            : ""
                        }
                        `}
            >
              {data.status}
            </div>
          </div>
        </div>

        {username == undefined && data.status === "Pending" && (
          <div className="flex justify-center mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => handleStatusChange(data._id, "Confirmed")}
            >
              Confirm
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleStatusChange(data._id, "Cancelled")}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingInfo;
