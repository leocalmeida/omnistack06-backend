const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const MONGO_CONNECTION = process.env.MONGO_CONNECTION;

const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("connectRoom", (box) => {
    socket.join(box);
  });
});

mongoose.connect(MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(cors());

app.use(express.json());

app.use(routes);

app.use(express.urlencoded({ extended: true }));

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

server.listen(process.env.PORT || 3333);
