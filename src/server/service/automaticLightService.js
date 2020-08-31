const repo = require("../data/repository");
let ctr = require("node-pid-controller");

let strategy;

const controller1 = new ctr();
const controller2 = new ctr();
const controller3 = new ctr();

const performAuthomaticLight = (sensor) => {
    setValuesWithSensorData(sensor);
    setStrategy();

  switch (strategy) {
    case "SAVE":
      break;
    case "FEEL":
      break;
    case "HYBRID":
      break;
    default:
      break;
  }
};

const setStrategy = () => {
  strategy = repo.getEnergyMode();
};

const performSaveStrategy = () => {}

const performFeelStrategy = () => {}

const performHybridStrategy = () => {}

const setValuesWithSensorData = (sensor) => {
    repo.setSensorData(sensor);
    repo.setIlluminanceAvg();
    repo.setIlluminanceData();
}

module.exports = {
    performAuthomaticLight
} 
