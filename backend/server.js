require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/api");

let app = express();

const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS.split(','),
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use("/api", apiRoutes);

mongoose.connect(process.env.MONGOBD_CONNECTION_STRING);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

connection.on("error", (err) => {
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running. " + err
  );
  process.exit();
});

app.listen(process.env.CONNECTION_PORT, () => {
  console.log(`Server is running on port: http://localhost:${process.env.CONNECTION_PORT}`);
});
