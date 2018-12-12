let generateMessage = (from = "Unknown", text = "") => {
  if (from === "Unknown" && text === "") {
    throw "Empty object";
  }

  return {
    from,
    text,
    createdAt: new Date().getTime()
  };
};

module.exports = { generateMessage };
