const { Trip, Booking, RequestTrip } = require("../model/allSchema");
const { getTripsWithBoking } = require("./bookingController");

const getBoardData = async (req, res) => {
  const tripsList = await getTripsWithBoking();
  const data = {
    trips: [],
  };

  tripsList.forEach((item) => {
    data.trips.push({
      placeName: item.placeName,
      bookingCount: item.booked.length,
    });
  });

  const requestTip = await RequestTrip.aggregate([
    {
      $group: {
        _id: "$place",
        toatlRequestedSeats: { $sum: "$seats" },
        toalCount: { $count: {} },
      },
    },
  ]);

  data["requestedTips"] = requestTip;

  res.status(200);
  res.send(data);
};

const allTripget = async (req, res) => {
  try {
    const allTrip = await Trip.find({});
    res.status(200);
    res.send(allTrip);
  } catch (error) {
    res.status(400);
    console.log(error);
    res.send(error);
  }
};

const postTrip = async (req, res) => {
  try {
    const trip = req.body;
    // const image = await cloudinary.uploader.upload(req.file.path);
    // trip.imageUrl = image.secure_url;
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

const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Trip.findByIdAndDelete(id);
    res.status(200);
    res.send(result);
  } catch (error) {
    res.status(500);
    console.log(error);
  }
};

module.exports = { allTripget, postTrip, updateTrip, deleteTrip, getBoardData };
