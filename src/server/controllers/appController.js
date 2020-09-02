let db = require("../data/repository");
const manualLightService = require("../service/manualLightService");
const utils = require("../utils/helperFunctions")

const AuthomaticLightService = require("../service/authomaticLightService");
const LIGHT_URL = "http://192.168.43.166:80/lightLevels";

module.exports = (app, io) => {
  let interval;

  const authomaticLightService = new AuthomaticLightService();

  //Websocket:
  io.on("connection", (socket) => {
    socket.emit("init", db.getFeed());
    if (interval) {
      clearInterval();
    }
    interval = setInterval(() => utils.sendFeed(socket), 1000);
    socket.on("changePower", (data) =>
      sendNewPower(LIGHT_URL, data).catch((error) => console.log(error))
    );
    socket.on("changeMode", (data) => db.setMode(data));
    socket.on("changeStrategy", (data) => authomaticLight.setStrategy(data));
    socket.on("changeTarget", (data) => automaticLightService.setTarget(data));
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });

  app.post("/sensor", function (req, res) {
    if (db.getMode() === "MANUAL") {
      manualLightService.performManualLighting({
        name: req.body.name,
        illuminance: req.body.illumminance,
      });
    } else {
      let data = authomaticLightService.calculateNewLightPowerValues({
        name: req.body.name,
        illuminance: req.body.illumminance,
      });
      utils.sendNewPower(LIGHT_URL, data).catch((e) => console.log(e));
    }
    res.status(200).send("OK");
  });
};



//1 Oszczedzanie energi wykorzystujemy 100% dopiero góre
//2 Świecimy na górę i dorzucamy dołu tyle ile potrzeba
//3 Hybryda 50%:50%.
//Rownomierność do okna
