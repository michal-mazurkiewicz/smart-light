let db = require("../data/models");

module.exports = (app, io) => {
  let interval;
  //Websocket:
  io.on("connection", (socket) => {
    socket.emit("init", db.getFeed());
    if (interval) {
      clearInterval();
    }
    interval = setInterval(() => sendFeed(socket), 1000);
    socket.on("changePower", (data) => db.changePower(data));
    socket.on("changeMode", (data) => db.changeMode(data));

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clearInterval(interval);
    });
  });

  app.post("/sensor", function (req, res) {
    console.log("Incomming POST request: ", req.body);
    db.setSensorData(req.body);
    res.status(200).send("OK");
  });

};

const sendFeed = (socket) => {
  socket.emit("feed", db.getFeed());
};
