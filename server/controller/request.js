const { RequestTrip, Trip } = require("../model/allSchema");

const getRequest = async (req, res) => {
  try {
    const rquestInfo = await RequestTrip.find({});
    res.status(200);
    res.send(rquestInfo);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};

const postRequest = async (req, res) => {
  try {
    const requestInfo = req.body;
    const { trip_id } = requestInfo;
    const trip = await Trip.findById(trip_id);
    const placeName = trip.placeName;

    const result = await RequestTrip.create({
      ...requestInfo,
      place: placeName,
    });
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
    console.log(error);
  }
};

const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    console.log(update);
    const result = await RequestTrip.findByIdAndUpdate(id, update, {
      new: true,
    });
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
    res.send(error);
  }
};

module.exports = { getRequest, postRequest, updateRequest };
