const moment = require("moment");

let generateMessage = (from = "Unknown", text = "") => {
  if (from === "Unknown" && text === "") {
    throw "Empty object";
  }

  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};

let generateLocationMessage = (from, latitude, longitude) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf()
  };
};

module.exports = { generateMessage, generateLocationMessage };
