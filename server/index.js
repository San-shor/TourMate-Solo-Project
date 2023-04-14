const express = require("express");
const app = express();
const mongoose = require("mongoose");
const route = require("./router");
const cors = require("cors");

const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
  exposedHeaders: ["Authorization"],
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(route);
app.get("*", (req, res) => {
  res.status(404).send("Sorry, not found 😞");
});
(async function main() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/Tour-App", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected successfully");
    app.listen(4000, () => {
      console.log(`Server ( JWT) is running at http://localhost:4000`);
    });
  } catch (error) {
    console.log(error);
  }
})();
