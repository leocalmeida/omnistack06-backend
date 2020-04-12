const express = require("express");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
// const cors = require("cors");


const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// app.use(cors({
//   origin: '*'
// }));

const server = require("http").Server(app);
const io = require("socket.io")(server, {
  handlePreflightRequest: (req, res) => {
      const headers = {
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
          "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
          "Access-Control-Allow-Credentials": true
      };
      res.writeHead(200, headers);
      res.end();
  }
});

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
