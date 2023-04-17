const { RequestTrip } = require("../model/allSchema");

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
    const rquestInfo = req.body;

    const result = await RequestTrip.create(rquestInfo);
    res.status(201);
    res.send(result);
  } catch (error) {
    res.status(400);
    console.log(error);
  }
};

module.exports = { getRequest, postRequest };
