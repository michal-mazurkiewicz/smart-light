//Dependencies
const fetch = require("node-fetch");
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
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

let results = [];

sensorData = {
  lumminance: "",
};

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
  const { lumminance } = req.body;
  results.unshift(lumminance);
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

function getValue() {
  const values = results.slice(0, 9);
  let value = 0;
  values.forEach((v) => {
    value += v;
  });
  const result = value / 10;
  return { value: result };
}

function round(data) {
  let { lon, lat } = data;

  lon = Number(lon).toFixed(1);
  lat = Number(lat).toFixed(1);

  return { lon, lat };
}

module.exports = round;

// Logic:
//Getting Data:
//Input City -> Get lan long -> Get Weather
//           -> Get Picture                  -> Save the Trip -> Update UI;
