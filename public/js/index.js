var socket = io();

// --------------------------
// Subscribe to connect event
// --------------------------
socket.on("connect", function() {
  console.log("Connected to the server");
});

// -----------------------------
// Subscribe to disconenct event
// -----------------------------
socket.on("disconnect", function() {
  console.log("disconnected from the server");
});

// -----------------------------
// Subscribe to newMessage event
// -----------------------------
socket.on("newMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var li = jQuery("<li></li>");
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery("#messages").append(li);
});

// -------------------------------------
// Subscribe to newLocationMessage event
// -------------------------------------
socket.on("newLocationMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var li = jQuery("<li></li>");
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}:`);
  a.attr("href", message.url);
  li.append(a);
  jQuery("#messages").append(li);
});

// --------------------------------------
// Add event handlers for actions on form
// --------------------------------------
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

// ----------------------------------------
// Add event handlers for actions on Button
// ----------------------------------------
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
