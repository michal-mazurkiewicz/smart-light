let db = require("../data/models");
let illuminanceDb = require("../data/Illuminance")
const fetch = require("node-fetch");
const LIGHT_URL = "http://192.168.43.166:80/lightLevels";

module.exports = (app, io) => {
  let interval;
  //Websocket:
  io.on("connection", (socket) => {
    socket.emit("init", db.getFeed());
    if (interval) {
      clearInterval();
    }
    interval = setInterval(() => sendFeed(socket), 1000);
    socket.on("changePower", (data) => sendNewPower(LIGHT_URL,data).catch((error) => console.log(error)));
    socket.on("changeMode", (data) => db.changeMode(data));
    socket.on("changeEnergyMode", (data) => db.setEnergyMode(data))
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });

  app.post("/sensor", function (req, res) {
    console.log("Incomming POST request: ", req.body);
      
    res.status(200).send("OK");
  });

};

const sendNewPower = async (url, data) => {
  db.changePower(data)
  console.log("SEND NNEW POWER DATA: ", data)
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const status = await response;
    console.log("POST REQUEST /setLight: ", status.statusText);
  } catch (error) {
    console.log("Change Color Error: ", error);
  }
}

const sendFeed = (socket) => {
  socket.emit("feed", db.getFeed());
};


//1 Oszczedzanie energi wykorzystujemy 100% dopiero góre
//2 Świecimy na górę i dorzucamy dołu tyle ile potrzeba
//3 Hybryda 50%:50%.
//Rownomierność do okna