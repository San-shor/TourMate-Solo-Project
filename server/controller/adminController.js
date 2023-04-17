const { Trip, Booking } = require("../model/allSchema");

const allTripget = async (req, res) => {
  try {
    const allTrip = await Trip.find({});
    res.status(200);
    res.send(allTrip);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};

const postTrip = async (req, res) => {
  try {
    const trip = req.body;
    // const { totalSeat, tripId } = trip;
    // const person = await Booking.findById(tripId);

    // const totalPerson = person.reduce((acc, cur) => acc + cur.numofPersons, 0);
    // const remainSeat = totalSeat - totalPerson;
    // console.log(person);

    const result = await Trip.create(trip);
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const result = await Trip.findByIdAndUpdate(id, update, { new: true });
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

module.exports = { allTripget, postTrip, updateTrip };
