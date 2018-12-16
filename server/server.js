const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const { generateMessage } = require("./utils/message");

let messageGenere = generateMessage("Admin", "Welcome to the chatroom");
console.log("Battou Debug" + messageGenere);

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("New user connected");
  socket.emit("newMessage", {
    from: "Admin",
    text: "Welcome to the chatroom"
  });

  socket.broadcast.emit("newMessage", {
    text: "New user joined",
    from: "Admin",
    createdAt: new Date().getTime()
  });

  socket.on("disconnect", () => {
    console.log("User is disonnected");
  });

  socket.on("createMessage", message => {
    console.log("CreateMessage : ", message);

    io.emit("newMessage", {
      from: message.from,
      text: message.text
    });
  });

  socket.on("createEmail", (email, callback) => {
    let data = `Email correctly received from ${email.from}`;
    callback(data);
  });
});

server.listen(port, () => {
  console.log(`App started on port : ${port}`);
});
