const BookingInfo = ({ bookingtrip }) => {
  return (
    <div className="flex flex-col justify-center gap-6 p-6 mt-5  ">
      {bookingtrip.map((data, i) => (
        <div key={i} className="bg-white rounded-md shadow-md p-4 w-full">
          <p className="font-bold mb-2">Trip ID: {data.tripId}</p>
          <p className="mb-2">
            <span className="font-bold">Name:</span> {data.name}
          </p>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {data.email}
          </p>
          <p className="mb-2">
            <span className="font-bold">Phone:</span> {data.phone}
          </p>
          <p className="mb-2">
            <span className="font-bold">Contact:</span> {data.contact}
          </p>
          <p className="mb-2">
            <span className="font-bold">Address:</span> {data.address}
          </p>
          <p className="mb-2">
            <span className="font-bold">Date:</span>{" "}
            {new Date(data.date).toLocaleDateString("en-US")}
          </p>
          <p className="mb-2">
            <span className="font-bold">Number of Persons:</span>{" "}
            {data.numPersons}
          </p>
          <p className="mb-2">
            <span className="font-bold">Price:</span> {data.price} BDT
          </p>
          <p className="mb-2">
            <span className="font-bold">Category:</span> {data.category}
          </p>
          <p className="mb-2">
            <span className="font-bold">Status:</span> {data.status}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookingInfo;
