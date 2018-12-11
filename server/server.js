const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("NEw user connected");

  socket.on("disconnect", () => {
    console.log("User is disonnected");
  });
});

server.listen(port, () => {
  console.log(`App started on port : ${port}`);
});
