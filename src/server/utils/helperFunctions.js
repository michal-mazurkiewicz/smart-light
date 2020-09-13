const fetch = require("node-fetch");
const repository = require("../data/repository");


const sendNewPower = async (url, data) => {
    repository.setPower(data);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    try {
      const status = await response;
    } catch (error) {
      console.log("Change Color Error: ", error);
    }
  };

  const sendFeed = (socket) => {
    socket.emit("feed", repository.getFeed());
  };


  module.exports = {
      sendNewPower,
      sendFeed,
  }