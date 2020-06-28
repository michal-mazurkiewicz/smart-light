//Dependencies
const cookieSession = require("cookie-session");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Initialize Server
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//Database settings
require("./models/User");
require("./services/passport");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Server Config:
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Start Server and listen on port 8000
http.listen(8000, function () {
  console.log(
    "Smart Light Mi listening on port 8000! \n You can close it by click Ctrl + c"
  );
});

//Get:
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

//Routing
require("./routes/controlRoutes")(app, io);
require("./routes/authRoutes")(app);