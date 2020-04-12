const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");


const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on("connection", socket => {
  socket.on("connectRoom", box => {
    socket.join(box);
  });
});

mongoose.connect(
  "mongodb+srv://omnistack:lcaajj21@cluster0-ll3m3.mongodb.net/omnistack06?retryWrites=true&w=majority",
  {
    useNewUrlParser: true, useUnifiedTopology: true,
  }
);

app.use((req, res, next) => {
  req.io = io;

  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/files", express.static(path.resolve(__dirname,"..","tmp")));
app.use(routes);

module.exports = server;
