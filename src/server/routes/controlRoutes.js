const fetch = require("node-fetch");
const Controller = require("node-pid-controller");
const ctr = new Controller(0.25, 0.1, 0, 1);
const LIGHT_URL = "http://192.168.43.166:80/lightLevels";
let target = 500;
ctr.setTarget(target);

const MANUAL = "MANUAL";
const AUTO = "AUTO";

let mode = MANUAL;

/**
 * Add functionality to handle UI actions
 *
 * 1) Light Power Change /setLightPower
 *
 * d) //Set data to mikrokontroler
 *
 * 2) Mode Change /setMode
 *
 * b) Set mode
 **/

let sensorData = [
  { name: "Sensor 1", illuminance: 0 },
  { name: "Sensor 2", illuminance: 0 },
  { name: "Sensor 3", illuminance: 0 },
  { name: "Average", illuminance: 0 },
];



module.exports = (app, io) => {

  //Endpoint For Collecting Sensor Data:
  app.post("/sensor", function (req, res) {
    console.log("Incomming POST request: ", req.body);
    const { illumminance } = req.body;
    
    

    if (mode === "AUTO") {
      if (isGoalReached(illumminance)) {
        getNewPowerValue(illumminance, data.power).then((newPower) =>
          setPower(LIGHT_URL, setSettings({ power: newPower }))
        );
      }
    }
    res.status(200).send("OK");
  });

  let interval;
  //Websocket:
  io.on("connection", (socket) => {
    socket.on("changeSettings", (data) =>
      changeSettings(LIGHT_URL, data)
    );
    socket.on("setMode", () => switchMode());


    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });
};

//Helper functions:



const changeSettings = async (url = "", data) => {
  setSettings(data);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const status = await response;
    console.log("POST REQUEST /COLOR: ", status.statusText);
  } catch (error) {
    console.log("Change Color Error: ", error);
  }
};

const setPower = async (url = "", data) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const status = await response;
    console.log("POST REQUEST NEW POWER: ", status.statusText);
  } catch (error) {
    console.log("Change Power Error: ", error);
  }
};

const isGoalReached = (illumminance) => {
  if (
    illumminance / lightData.targetIlluminance > 1.03 ||
    illumminance / lightData.targetIlluminance <= 1
  ) {
    return true;
  } else {
    return false;
  }
};
