//Dependencies
const fetch = require("node-fetch");
var path = require("path");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");


//Server Settings
const app = express();
app.use(express.static("dist"));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Start Server and listen on port 8000
app.listen(8000, function () {
  console.log("Example app listening on port 8000! \n You can close it by click Ctrl + c");
});

//Objects:

let results = [];

sensorData = {
  lumminance : ''
}

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
  console.log('Incomming POST request: ', req.body)
  const { lumminance } = req.body;
  results.unshift(lumminance);
  res.status(200).send('OK');
});


//Helper function to format coordinates to needed format

function getValue() {
  const values = results.slice(0,9);
  let value = 0;
  values.forEach(v => {
    value += v;
  })
  const result = value/10;
  return {value: result};
}


function round(data) {
  let { lon, lat } = data;

  lon = Number(lon).toFixed(1);
  lat = Number(lat).toFixed(1);

  return { lon, lat };
}

module.exports = round

// Logic:
//Getting Data:
//Input City -> Get lan long -> Get Weather
//           -> Get Picture                  -> Save the Trip -> Update UI;

