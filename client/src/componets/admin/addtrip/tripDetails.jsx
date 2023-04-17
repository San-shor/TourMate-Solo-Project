import { useParams } from "react-router-dom";
import "./trip-detail.css";
import BookingFormModal from "../../trip/booking.modal";
import React, { useState } from "react";
const TripDetails = ({ tripid }) => {
  const [showModal, setShowModal] = useState(false);

  const handleBookNowClick = () => {
    setShowModal(true);
  };
  const { id } = useParams();
  const tripId = tripid[id];

  if (!tripId) return null;
  return (
    <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-1 h-screen overflow-y-auto">
      <div className="bg-white sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex justify-center">
            <img
              src={tripId.images}
              alt={tripId.placeName}
              className="w-40 sm:w-auto sm:h-64 object-cover rounded-lg shadow-lg mb-5"
            />
          </div>

          <h2 className="text-3xl font-extrabold text-red-950">
            {tripId.placeName}
          </h2>
          <p className="mt-4 text-lg text-[#00095e]">{tripId.description}</p>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-[#00095e]">Going Date</dt>
              <dd className="mt-1 text-lg text-red-950">
                {new Date(tripId.startdate).toLocaleDateString("en-US")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-semibold text-[#00095e]">
                Ending Date
              </dt>
              <dd className="mt-1 text-lg text-red-950">
                {new Date(tripId.enddate).toLocaleDateString("en-US")}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-semibold text-[#00095e]">Price</dt>
              <dd className="mt-1 text-lg text-red-950">৳{tripId.price}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-semibold text-[#00095e]">
                Inclusions
              </dt>
              <dd className="mt-1 text-lg text-red-950">
                <ul className="list-disc pl-5">
                  {tripId.inclusions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="mt-5">
            <button
              onClick={handleBookNowClick}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md font-semibold text-white bg-red-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Book Now
            </button>
            <BookingFormModal showModal={showModal} trip={tripId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
