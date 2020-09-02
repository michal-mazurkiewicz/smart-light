const repo = require("../data/repository");
const Controller = require("node-pid-controller");
const Regulator = require("./Regulator");

const illuminationRegulator = new Controller(0.15, 0.1, 0.1, 1);
illuminationRegulator.setTarget(repo.getTarget());

const regulator1 = new Regulator(new Controller(0.15, 0.1, 0.1, 1), new Controller(0.15, 0.1, 0.1, 1), new Controller(0.15, 0.1, 0.1, 1))
const regulator2 = new Regulator(new Controller(0.15, 0.1, 0.1, 1), new Controller(0.15, 0.1, 0.1, 1), new Controller(0.15, 0.1, 0.1, 1))
const regulator3 = new Regulator(new Controller(0.15, 0.1, 0.1, 1), new Controller(0.15, 0.1, 0.1, 1), new Controller(0.15, 0.1, 0.1, 1))
const savingStrategy
class authomaticLightService{
  

  setNewLightValues(){}

  setNewTarget(){}
}

const setTarget = (goal) => {
  if (goal === "SAME") {
    let newGoal = repo.getSensorData()[0].illuminance;
    illuminationRegulator.setTarget(newGoal);
    repo.setTarget(newGoal);
  } else {
    illuminationRegulator.setTarget(goal);
    repo.setTarget(goal);
  }
};

setTarget(repo.getTarget());

const performAuthomaticLight = (sensor) => {
  let lightPower = illuminationRegulator.update(sensor.illuminance);
  setValuesWithSensorData(sensor);
  let automaticControl = getStrategy();
  return automaticControl(sensor, lightPower);
};


const getStrategy = () => {
  let strategy = repo.getEnergyMode();
  switch (strategy) {
    case "SAVE":
      return performSaveStrategy;
    case "FEEL":
      return performFeelStrategy;
    case "HYBRID":
      return performHybridStrategy;
    default:
      return performSaveStrategy;
  }
};

const setValuesWithSensorData = (sensor) => {
  repo.setSensorData(sensor);
  repo.setIlluminanceAvg();
  repo.setIlluminanceData();
};

module.exports = {
  performAuthomaticLight,
  setTarget,
};

//1 Oszczedzanie energi wykorzystujemy 100% dopiero góre
//2 Świecimy na górę i dorzucamy dołu tyle ile potrzeba
//3 Hybryda 50%:50%.
//Rownomierność do okna
