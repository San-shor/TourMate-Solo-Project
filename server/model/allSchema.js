const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// User Schema
const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["client", "admin"],
    required: true,
    default: "client",
  },
});
const User = mongoose.model("User", userSchema);

// Trip packages Schema
const tripSchema = new mongoose.Schema(
  {
    placeName: { type: String, required: true },
    location: { type: String, required: true },
    startdate: { type: Date, required: true },
    enddate: { type: Date, required: true },
    personalPrice: { type: Number, required: true },
    nonpersonalPrice: { type: Number, required: true },
    images: [String],
    inclusions: { type: [String] },
    totalSeat: Number,
    bookedSeat: { type: Number, default: 0 },
    available: {
      type: Boolean,
      set: function (v) {
        return String(v) === "true";
      },
      default: true,
    },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

// Booking information schema
const bookingSchema = new mongoose.Schema({
  tripId: String,
  name: String,
  email: String,
  phone: Number,
  contact: Number,
  address: String,
  date: { type: Date, default: new Date() },
  numPersons: { type: Number, required: true },
  price: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Family", "Single"],
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
    required: true,
  },
});
const Booking = mongoose.model("Booking", bookingSchema);

const requestTrip = new mongoose.Schema({
  trip_id: String,
  name: String,
  email: String,
  phone: Number,
  place: String,
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
    required: true,
  },
});
const RequestTrip = mongoose.model("RequestTrip", requestTrip);

module.exports = { User, Trip, Booking, RequestTrip };
