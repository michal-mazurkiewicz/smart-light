const fetch = require("node-fetch");
const Controller = require("node-pid-controller");
const ctr = new Controller(0.25, 0.1, 0, 1);
const LIGHT_URL = "http://192.168.1.18:80/color";
let target = 500;
ctr.setTarget(target);

const MANUAL = "MANUAL";
const AUTO = "AUTO";

let mode = MANUAL;

let lightData = {
  device: "192.168.1.18",
  port: "80",
  currentSettings: 10,
  maxPower: 255,
  targetIlluminance: 500,
};

let data = {
  light: 1,
  power: 10,
  red: 255,
  green: 255,
  blue: 255,
  white: 255,
};

let socketData = {
  timeStamp: "",
  illuminance: "",
  lightPower: "",
};

module.exports = (app, io) => {

  //Endpoint For Collecting Sensor Data:
  app.post("/sensor", function (req, res) {
    console.log("Incomming POST request: ", req.body);
    const { illumminance } = req.body;
    setSockedData(illumminance, data.power);
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
    console.log("New client connected");
    socket.emit("init", data);
    if (interval) {
      clearInterval();
    }
    interval = setInterval(() => getApiAndEmit(socket), 1000);
    socket.on("changeSettings", (data) =>
      changeSettings(LIGHT_URL, data)
    );
    socket.on("switchMode", () => switchMode());
    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });
};

//Helper functions:

const getApiAndEmit = (socket) => {
  socket.emit("FromAPI", socketData);
};

const changeSettings = async (url = "", data) => {
  console.log("SOCKET ON CHANGE SETTINGS: ", data)
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

const setSettings = (settings) => {
  const { light, power, red, green, blue, white } = settings;
  data = {
    light: light ? light : data.light,
    power: power ? power : data.power,
    red: red ? red : data.red,
    green: green ? green : data.green,
    blue: blue ? blue : data.blue,
    white: white ? white : data.white,
  };
  return data;
};

const getCorrelation = async (illuminance) => {
  return ctr.update(illuminance);
};

const adjustPower = async (correlation, currentPower) => {
  return Math.abs(
    Math.round(currentPower + (currentPower * correlation) / 100)
  );
};

const getNewPowerValue = async (illuminance, currentPower) => {
  return await getCorrelation(illuminance).then((correlation) =>
    adjustPower(correlation, currentPower)
  );
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

const setSockedData = (illumminance, lightPower) => {
  socketData = {
    timeStamp: new Date().toLocaleTimeString(),
    illuminance: illumminance,
    lightPower: lightPower,
  };
};

const switchMode = () => {
  if(mode === "MANUAL"){
    mode = AUTO
  }else {
    mode = MANUAL
  }
  console.log("Mode Switched to: ", mode)
};
