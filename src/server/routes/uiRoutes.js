let db = require("../data/models");
let illuminanceDb = require("../data/Illuminance")

module.exports = (app, io) => {
  let interval;
  //Websocket:
  io.on("connection", (socket) => {
    socket.emit("init", db.getFeed());
    if (interval) {
      clearInterval();
    }
    interval = setInterval(() => sendFeed(socket), 1000);
    socket.on("changePower", (data) => db.changePower(data));
    socket.on("changeMode", (data) => db.changeMode(data));

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });

  app.post("/sensor", function (req, res) {
    console.log("Incomming POST request: ", req.body);
    if(db.getMode() === "MANUAL"){
      db.setSensorData({name: req.body.name, illuminance: Number(req.body.illumminance.toFixed(2))});

    }else if(db.getMode() === "AUTO"){
      db.setSensorData({name: req.body.name, illuminance: Number(req.body.illumminance.toFixed(2))});
      let average = illuminanceDb.getRoomIlluminanceAvg(req.body, db.getLightData());
      db.setIlluminanceData(average);
    }
    res.status(200).send("OK");
  });

};

const sendFeed = (socket) => {
  socket.emit("feed", db.getFeed());
};
