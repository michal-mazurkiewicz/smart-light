const repo = require("../data/repository")

const performManualLighting = (sensor) => {
    setValuesWithSensorData(sensor);
}

const setValuesWithSensorData = (sensor) => {
    repo.setSensorData(sensor);
    repo.setIlluminanceAvg();
    repo.setIlluminanceData();
}


module.exports = {
    performManualLighting
}

