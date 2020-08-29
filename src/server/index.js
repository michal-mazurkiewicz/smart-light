//Dependencies
const cors = require("cors");
const bodyParser = require("body-parser");
const ip = require("ip")

//Initialize Server
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//Server Config:
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Start Server and listen on port 8000
http.listen(8000, function () {
  console.log(
    `Smart Light Mi listening on: ` + ip.address() + `:8000 \n You can close it by click Ctrl + c`
  );
});

//Entry Endpoint:
app.get("/", function (req, res) {
  res.sendFile("dist/index.html");
});

//Routing
//require("./routes/controlRoutes")(app, io);
require("./routes/uiRoutes")(app, io);