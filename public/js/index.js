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
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery("#messages").append(html);
});

// -------------------------------------
// Subscribe to newLocationMessage event
// -------------------------------------
socket.on("newLocationMessage", function(message) {
  var formattedTime = moment(message.createdAt).format("h:mm a");
  var template = jQuery("#location-message-template").html();
  var locationMessage = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });

  jQuery("#messages").append(locationMessage);
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
