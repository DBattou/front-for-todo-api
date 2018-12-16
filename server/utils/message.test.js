const expect = require("expect");

let { generateMessage, generateLocationMessage } = require("./message");

describe("Message generator", () => {
  it("should return a unknown sender", () => {
    let text = "Hello everybody";
    let message = generateMessage(undefined, text);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({
      from: "Unknown",
      text: "Hello everybody"
    });
  });

  it("Should return a empty text field if no text provided", () => {
    let from = "Battou";
    let message = generateMessage(from, undefined);
    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({
      from: "Battou",
      text: ""
    });
  });

  it("Should return an error if no Sender & Text", () => {
    expect(() => {
      generateMessage(undefined, undefined);
    }).toThrowError("Empty object");
  });

  it("Should return a correct message if message is all good", () => {
    let from = "Battou";
    let text = "Hello everybody";
    let message = generateMessage(from, text);

    expect(typeof message.createdAt).toBe("number");
    expect(message).toMatchObject({
      from: "Battou",
      text: "Hello everybody"
    });
  });
});

describe("Generate location", () => {
  it("Should correctly format the location of the actual user", () => {
    // https://www.google.com/maps?q=48.8712573,2.3602622

    let location = generateLocationMessage("Admin", 48.8712573, 2.3602622);

    expect(location).toMatchObject({
      from: "Admin",
      url: "https://www.google.com/maps?q=48.8712573,2.3602622"
    });
  });
});
