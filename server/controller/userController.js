const { User } = require("../model/allSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "Whatever";

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });

  if (user) return res.status(409).send({ message: "User already exists" });

  try {
    if (password === "") throw new Error();
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ ...req.body, password: hashPassword });
    const { _id } = await newUser.save();
    const token = jwt.sign({ _id }, SECRET_KEY);
    res.status(201).send(token);
  } catch (error) {
    res.status(400).send({ messages: "Could not create User" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(409).send({ message: "User not found" });

    const matchPass = await bcrypt.compare(password, user.password);

    if (!matchPass) throw new Error();

    const token = jwt.sign({ _id: user._id }, SECRET_KEY);
    res.status(200).send(token);
  } catch (error) {
    res.status(401).send({ messages: "Username or password is incorrect" });
  }
};

const profile = async (req, res) => {
  try {
    const { _id, fullName, address, phone, bookings } = req.user;
    const user = { _id, fullName, address, phone, bookings };
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send({ message: "User not Found" });
  }
};

module.exports = { register, login, profile };
