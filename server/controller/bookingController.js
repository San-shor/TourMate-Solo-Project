const { Booking, Trip } = require("../model/allSchema");

const getBookingInfo = async (req, res) => {
  try {
    const bookingInfo = await Booking.find({});
    res.status(200);
    res.send(bookingInfo);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};

const postBooking = async (req, res) => {
  try {
    const booking = req.body;
    const { numPersons, tripId } = booking;
    const trip = await Trip.findById(tripId);
    const personalprice = numPersons * trip.personalPrice;
    const nonpersonalprice = numPersons * trip.nonpersonalPrice;
    if (personalprice) {
      const result = await Booking.create({
        ...booking,
        price: personalprice,
      });
      res.status(201);
      res.send(result);
    } else {
      const result = await Booking.create({
        ...booking,
        price: nonpersonalprice,
      });
      res.status(201);
      res.send(result);
    }
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

module.exports = { getBookingInfo, postBooking };
