module.exports = (app) => {

  app.post("/color", function (req, res) {
    setColor("http://192.168.1.20:80/color", req.body).then(function () {
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
   mode = req.body.mode;
  });

};
