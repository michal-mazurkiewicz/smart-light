module.exports = (app) => {

    app.post("/color", function (req, res) {
        setColor("http://192.168.1.20:80/color", req.body).then(function () {
          res.status(200).send();
        });
      });

}