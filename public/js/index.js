var socket = io();

socket.on("connect", function() {
  console.log("Connecteed to the server");

  socket.emit("createMessage", {
    to: "Bob",
    text: "Quelso"
  });
});

socket.on("disconnect", function() {
  console.log("disconnected from the server");
});

socket.on("createMessage", function(message) {
  console.log("new message", message);
});
