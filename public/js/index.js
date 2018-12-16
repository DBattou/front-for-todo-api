var socket = io();

socket.on("connect", function() {
  console.log("Connected to the server");

  socket.on("newMessage", function(message) {
    console.log("New message from " + message.from + " : " + message.text);

    var li = jQuery("<li></li>");
    li.text(`${message.from}: ${message.text}`);

    jQuery("#messages").append(li);
  });
});

socket.on("disconnect", function() {
  console.log("disconnected from the server");
});

socket.on("newLocationMessage", function(message) {
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}:`);
  a.attr("href", message.url);
  li.append(a);
  jQuery("#messages").append(li);
});

jQuery("#message-form").on("submit", function(e) {
  e.preventDefault();

  let messageTextBox = jQuery("[name=message]");

  socket.emit(
    "createMessage",
    {
      from: "Battou",
      text: messageTextBox.val()
    },
    function() {
      messageTextBox.val("");
    }
  );
});

var locationButton = jQuery("#send-location");
locationButton.on("click", function(e) {
  if (navigator.location) {
    return alert("GeoLocation not supported");
  }

  locationButton.attr("disabled", "disabled").text("Sending location...");

  navigator.geolocation.getCurrentPosition(
    function(position) {
      locationButton.removeAttr("disabled").text("Send Location");
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      locationButton.removeAttr("disabled").text("Sned Location");
      alert("Unable to fetch location");
    }
  );
});
