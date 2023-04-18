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

module.exports = { getRequest, postRequest };
