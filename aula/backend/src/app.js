const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://omnistack:lcaajj21@cluster0-ll3m3.mongodb.net/omnistack06?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

module.exports = app;
