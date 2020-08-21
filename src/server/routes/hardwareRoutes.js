let db = require("../data/models");

module.exports = (app) => {

    setInterval(() => await getIlluminance(), 500)

    setPower(LIGHT_URL, db.getLightData())


  app.post("/sensor", function (req, res) {
    console.log("Incomming POST request: ", req.body);
    const { illumminance } = req.body;



    if (mode === "AUTO") {
      if (isGoalReached(illumminance)) {
        getNewPowerValue(illumminance, data.power).then((newPower) =>
          setPower(LIGHT_URL, setSettings({ power: newPower }))
        );
      }
    }
    res.status(200).send("OK");
  });
};

const performAutomaticControl = async () => {
    await getIlluminance();
    calculateNewIlluminances(db.getSensorData())
    setNewPowerData(db.getIlluminanceData);
    setPower(db.getLightData());
}

const calculateNewIlluminances = (sensorData) => {
    //Calculate new illuminances based on sensors data
}

const setNewPowerData = (illumminanceData) => {
    //TODO: PERFORM ALGHORITM
}


const getIlluminance = async () => {
    const sensor1 = await fetchIlluminance()
    const sensor2 = await fetchIlluminance()
    const sensor3 = await fetchIlluminance()
    db.setSensorData([{sensor1, sensor2, sensor3}])
  };

  const fetchIlluminance = async (url="") => {
    const response = await fetch(url);
      try {
        const data = await response;
        console.log("Illuminance data ", data);
        return data;
      } catch (error) {
        console.log("Fetch Illuminance error: ", error);
      }
  }


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
      console.log("POST REQUEST NEW POWER: ", status.statusText);
    } catch (error) {
      console.log("Change Power Error: ", error);
    }
  };