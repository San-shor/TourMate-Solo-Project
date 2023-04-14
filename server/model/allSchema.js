const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// User Schema
const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["client", "admin"],
    required: true,
    default: "client",
  },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
});
const User = mongoose.model("User", userSchema);

// Trip packages Schema
const tripSchema = new mongoose.Schema(
  {
    placeName: { type: String, required: true },
    description: { type: String },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    images: [String],
    inclusions: { type: [String] },
    requests: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        status: {
          type: String,
          enum: ["Pending", "Approved", "Rejected"],
          default: "Pending",
        },
      },
    ],
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

// Booking information schema
const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  date: { type: Date, required: true },
  numPersons: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  category: {
    type: String,
    enum: ["Personal", "Non-Personal"],
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

module.exports = { User, Trip, Booking };
