const { Booking, Trip } = require("../model/allSchema");

const getTripsWithBoking = async (username) => {
  let q = {};
  if (username !== undefined) {
    q = { name: username };
  }
  debugger;
  const bookingInfo = await Booking.find(q);
  const tripIds = bookingInfo.map((item) => item.tripId);
  const trips = await Trip.find({ _id: { $in: tripIds } });
  const tripMap = new Map();
  trips.forEach((item) => {
    tripMap.set(item.id, item.toObject());
  });
  bookingInfo.forEach((item) => {
    const trip = tripMap.get(item.tripId);
    tripMap.set(item.tripId, {
      ...trip,
      booked: trip?.booked
        ? [...trip.booked, item.toObject()]
        : [item.toObject()],
    });
  });
  return [...tripMap.values()];
};

const getBookingInfo = async (req, res) => {
  try {
    const { username } = req.params;
    res.status(200);
    res.send(await getTripsWithBoking(username));
  } catch (error) {
    res.status(400);
    res.send(error);
  }
};

const postBooking = async (req, res) => {
  try {
    const booking = req.body;
    const { numPersons, tripId, bookedSeat } = booking;
    const trip = await Trip.findById(tripId);
    const personalprice = numPersons * trip.personalPrice;
    const nonpersonalprice = numPersons * trip.nonpersonalPrice;
    let result;
    if (personalprice) {
      result = await Booking.create({
        ...booking,
        price: personalprice,
      });
    } else {
      result = await Booking.create({
        ...booking,
        price: nonpersonalprice,
      });
    }
    await Trip.findByIdAndUpdate(tripId, { $inc: { bookedSeat: numPersons } });
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const result = await Booking.findByIdAndUpdate(id, update, { new: true });
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

module.exports = {
  getBookingInfo,
  postBooking,
  updateBooking,
  getTripsWithBoking,
};
