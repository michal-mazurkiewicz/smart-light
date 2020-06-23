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

//Objects:

users = [];

user = {
  id: "userId",
  deviceList: [{ device: "ip", currentSettings: "currentPower" }],
};

let sensors = [{ ip: "192.168.1.14", meassures: [] }],
  results = [];

sensorData = {
  lumminance: "",
};

let ctr = new Controller(0.25, 0.01, 0.01, 1);

//Declare Endpoints:

//Get:
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

//return trip object and clean data after
app.get("/getData", function (req, res) {
  console.log("Executing GET /data ");
  res.send(results.slice(0, 9));
});

app.get("/getValue", function (req, res) {
  console.log("Executing GET /data ");
  res.send(getValue());
});

//Post:
app.post("/sensor", function (req, res) {
  console.log("Incomming POST request: ", req.body);
  const { illumminance } = req.body;
  let currSensor = sensors.find((sensor) => sensor.ip === req.body.sensor);
  currSensor.meassures.unshift(illumminance);

  if (currSensor.meassures.length > 15) {
    let sorted = currSensor.meassures.sort((a, b) => a - b);
    console.log("SORTED: ", sorted);
    let sum = sorted.slice(5, 15).reduce((a, b) => a + b, 0)
    let avg = (sum / 10) || 0;


    console.log("AVERAGE: ", avg);
    ctr.setTarget(30);

    let output = illumminance;
    let input = ctr.update(output);
    console.log("CORRECTION", input);

    currSensor.meassures.splice(0, 15);
  }
  res.status(200).send("OK");
});

app.post("/color", function (req, res) {
  setColor("http://192.168.1.20:80/color", req.body).then(function () {
    res.status(200).send();
  });
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
