//Dependencies
const fetch = require("node-fetch");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Controller = require("node-pid-controller");
require("./models/User");
require("./services/passport");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Server Settings
const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);
require("./routes/controlRoutes")(app);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Start Server and listen on port 8000
app.listen(8000, function () {
  console.log(
    "Smart Light Mi listening on port 8000! \n You can close it by click Ctrl + c"
  );
});

//Get:
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

const ctr = new Controller(0.8, 0.8, 0, 1);
ctr.setTarget(500);

let light = {
  device: "192.168.1.18",
  port: "80",
  currentSettings: 10,
  maxPower: 255,
  targetIlluminance: 500,
};

let data = {
  light: 1,
  power: 0,
  red: 255,
  green: 255,
  blue: 255,
  white: 255,
};

let sensors = [
    { ip: "192.168.1.14", meassures: [] },
    { ip: "192.168.1.16", meassures: [] },
  ],
  results = [];

app.post("/sensor", function (req, res) {
  console.log("Incomming POST request: ", req.body);
  const { illumminance } = req.body;
  if (
    illumminance / light.targetIlluminance > 1.03 ||
    illumminance / light.targetIlluminance < 0.99
  ) {
    getNewPowerValue(illumminance, light.currentSettings).then((newPower) =>
      setPower(`http://192.168.1.18:80/color`, {
        ...data,
        ...(data.power = newPower),
      })
    );
  }
  res.status(200).send("OK");
});

//Helper function to format coordinates to needed format

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

const adjustPower = async (correlation, currentPower) => {
  let newValue = Math.round(currentPower + (currentPower * correlation) / 100);
  console.log("OLD VALUE: ", currentPower);
  console.log("NEW VALUE: ", newValue);
  if (newValue >= 255) {
    light.currentSettings = 255;
    return 255;
  } else if (newValue < 0) {
    light.currentSettings = 0;
    return 0;
  } else {
    return newValue;
  }
};

const getNewPowerValue = async (illuminance, light) => {
  const newValue = await getCorrelation(illuminance).then((correlation) =>
    adjustPower(correlation, light)
  );
  console.log("VALUE FROM PROM: ", newValue);
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

function getValue() {
  const values = results.slice(0, 9);
  let value = 0;
  values.forEach((v) => {
    value += v;
  });
  const result = value / 10;
  return { value: result };
}

//2 minuty collecting
//20% najniższych liczb
//Średnią albo co kilka minut najwyższą wartość.
//Open TCP connectio with client.
//Send to him data from sensors.
//Send current value of light

//Calculate the value of light and send correction to the lamp
//If current light and target difference is less than 5% dont change it
