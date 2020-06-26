const fetch = require("node-fetch");
const Controller = require("node-pid-controller");
const ctr = new Controller(0.25, 0.015, 0, 1);
let target = 500;
ctr.setTarget(target);

let mode = "AUTO";
let socketData = {
  timeStamp:"",
  illuminance:"",
  lightPower:"",
}
module.exports = (app, light, data, io) => {

  app.post("/color", function (req, res) {
    setColor("http://192.168.1.18:80/color", req.body).then(function () {
      res.status(200).send();
    });
  });

  app.post("/turnOff", function (req, res) {
    setColor("http://192.168.1.18:80/color", {
      light: 1,
      power: 0,
      red: 0,
      green: 0,
      blue: 0,
      white: 0,
    });
    res.send();
  });

  app.post("/turnOn", function (req, res) {
    setColor("http://192.168.1.18:80/color", {
      light: 1,
      power: 255,
      red: 255,
      green: 255,
      blue: 255,
      white: 255,
    });
  });

  app.post("/switchMode", function (req, res) {
    const {newMode} = req.body
    mode = newMode;
    res.status(200).send()
  });

  app.post("/sensor", function (req, res) {
    console.log("Incomming POST request: ", req.body);
    const { illumminance } = req.body;

    if (mode === "AUTO") {
      if (
        illumminance / light.targetIlluminance > 1.03 ||
        illumminance / light.targetIlluminance < 1
      ) {
        getNewPowerValue(illumminance, light).then((newPower) =>
          setPower(`http://192.168.1.18:80/color`, {
            ...data,
            ...(data.power = newPower),
          })
        );
      }
    }
    res.status(200).send("OK");
  });

  app.post("/setTarget", function (req, res){
    const {newTarget} = req.body;
    target = newTarget;
    light.targetIlluminance = newTarget;
    res.status(200).send();

  })

  let interval;

io.on("connection", (socket) => {
  console.log("New client connected");
  if (interval) {
    clearInterval();
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});

const getApiAndEmit = (socket) => {
  socketData.timeStamp = Date.now();
  socket.emit("FromAPI", socketData);
};
};

//Helper functions:

const setColor = async (url = "", data) => {
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


const getCorrelation = async (illuminance) => {
  let correlation = ctr.update(illuminance);
  return correlation;
};

const adjustPower = async (correlation, light) => {
  let newValue = Math.round(light.currentSettings + (light.currentSettings * correlation) / 100);
  console.log("OLD VALUE: ", light.currentSettings);
  console.log("NEW VALUE: ", newValue);
  if (newValue >= 255) {
    light.currentSettings = 255;
    return 255;
  } else if (newValue < 0) {
    light.currentSettings = 1;
    return 0;
  } else {
    light.currentSettings = newValue;
    return newValue;
  }
};

const getNewPowerValue = async (illuminance, light) => {
  const newValue = await getCorrelation(illuminance).then((correlation) =>
    adjustPower(correlation, light)
  );
  socketData.lightPower = newValue;
  socketData.illuminance = illuminance;
  return newValue;
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
    console.log("POST REQUEST /COLOR: ", status.statusText);
  } catch (error) {
    console.log("Change Color Error: ", error);
  }
};

//socket data:




