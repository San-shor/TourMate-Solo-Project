import { useParams } from "react-router-dom";
import "./trip-detail.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import BookingFormModal from "../../trip/booking.modal";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";

const TripDetails = ({ tripid }) => {
  const [showModal, setShowModal] = useState(false);

  const [isloggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

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
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
              spaceBetween={30}
              slidesPerView={2}
            >
              {tripId.images.map((img, i) => {
                return (
                  <SwiperSlide key={i}>
                    <img
                      src={img}
                      className="w-11/12 h-60 object-center rounded-lg shadow-lg mb-5"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <main className="w-9/12 m-auto mb-28">
            <h2 className="text-3xl font-extrabold text-[#00095e]">
              {tripId.placeName}
            </h2>
            <div className="flex gap-3 mt-4 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-geo"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6zM4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.319 1.319 0 0 0-.37.265.301.301 0 0 0-.057.09V14l.002.008a.147.147 0 0 0 .016.033.617.617 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.619.619 0 0 0 .146-.15.148.148 0 0 0 .015-.033L12 14v-.004a.301.301 0 0 0-.057-.09 1.318 1.318 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465-1.281 0-2.462-.172-3.34-.465-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411z"
                />
              </svg>
              <span className="font-bold"> {tripId.location}</span>
            </div>

            <p className="mt-4 text-lg text-left text-black">
              {tripId.description}
            </p>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="sm:col-span-1">
                <dt className="text-lg font-bold text-[#00095e]">Going Date</dt>
                <dd className="mt-1 text-lg text-black">
                  {format(new Date(tripId.startdate), "d MMM")}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-lg font-bold text-[#00095e]">
                  Ending Date
                </dt>
                <dd className="mt-1 text-lg text-black">
                  {format(new Date(tripId.enddate), "d MMM")}
                </dd>
              </div>
              <div className="sm:col-span-1">
                <dt className="text-lg font-bold text-[#00095e]">Price</dt>
                <dd className="mt-1 text-sm text-black">
                  <span className="font-bold">Single Package </span>
                  {tripId.personalPrice} BDT
                </dd>
                <dd className="mt-1 text-sm text-black">
                  <span className="font-bold">Family Package </span>
                  {tripId.nonpersonalPrice} BDT
                </dd>
              </div>
              <div className="sm:col-span-1 flex">
                <dd className="text-sm font-semibold ">
                  <h4 className="text-lg font-bold text-[#00095e]">
                    Inclusion
                  </h4>
                  <ul className="list-disc pl-5">
                    {tripId.inclusions.map((item) => (
                      <li className="text-black" key={item}>
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
                <dd className="text-sm font-semibold ">
                  <h4 className="text-lg font-bold text-[#00095e]">
                    Exclusion
                  </h4>
                  <ul className="list-disc pl-5 text-black">
                    <li> Personal expenses</li>
                    <li>Anything else that isn't mentioned on</li>
                    <li>Sightseeing fees</li>
                  </ul>
                </dd>
              </div>
            </dl>
            <div className="mt-5">
              {isloggedin ? (
                <>
                  <button
                    onClick={handleBookNowClick}
                    className="inline-flex items-center bg-[#00095e] hover:bg-[#ffc800] text-white font-bold py-2 px-4 rounded details-button"
                  >
                    Book Now
                  </button>
                  <BookingFormModal showModal={showModal} trip={tripId} />
                </>
              ) : (
                <div className="tooltip " data-tip="Login to book">
                  <button disabled className="btn">
                    Book Now
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
