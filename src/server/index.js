//Dependencies

const cookieSession = require("cookie-session");
const passport = require("passport");
const http = require('http')
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
require("./models/User");
require("./services/passport");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Server Settings
const app = express();
const server = http.createServer(app)
const io = socketIo(server);

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
server.listen(8000, function () {
  console.log(
    "Smart Light Mi listening on port 8000! \n You can close it by click Ctrl + c"
  );
});

//Get:
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});


let sensors = [
  { ip: "192.168.1.14", meassures: [] },
  { ip: "192.168.1.16", meassures: [] },
];

require("./routes/controlRoutes")(app, io);

//Helper function to format coordinates to needed format
//2 minuty collecting
//20% najniższych liczb
//Średnią albo co kilka minut najwyższą wartość.
//Open TCP connectio with client.
//Send to him data from sensors.
//Send current value of light

//Calculate the value of light and send correction to the lamp
//If current light and target difference is less than 5% dont change it
