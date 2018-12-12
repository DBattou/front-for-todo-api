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
  console.log("New user connected");

  socket.on("disconnect", () => {
    console.log("User is disonnected");
  });

  socket.on("createMessage", message => {
    console.log("CreateMessage : ", message);

    socket.broadcast.emit("newMessage", {
      text: message.text,
      from: message.from,
      createdAt: new Date().getTime()
    });
  });
});

server.listen(port, () => {
  console.log(`App started on port : ${port}`);
});
