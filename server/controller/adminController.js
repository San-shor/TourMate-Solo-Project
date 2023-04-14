const { Trip } = require("../model/allSchema");

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

    const result = await Trip.create(trip);
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
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
