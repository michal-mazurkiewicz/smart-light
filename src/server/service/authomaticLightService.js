const Regulator = require("./Regulator");
const repository = require("../data/repository");

let lightsData;

class AuthomaticLightService {
  constructor() {
    this.sensorOneRegulator = new Regulator(
      repository.getTarget(),
      repository.getStrategy()
    );
    this.sensorTwoRegulator = new Regulator(
      repository.getTarget(),
      repository.getStrategy()
    );
    this.sensorThreeRegulator = new Regulator(
      repository.getTarget(),
      repository.getStrategy()
    );
  }

  setStrategy(strategy) {
    this.sensorOneRegulator.setStrategy(strategy);
    this.sensorTwoRegulator.setStrategy(strategy);
    this.sensorThreeRegulator.setStrategy(strategy);
    repository.setStrategy(strategy);
  }

  setTarget(goal) {
    if (goal === "SAME") {
      let newGoal = repository.getSensorData()[0].illuminance;
      illuminationRegulator.setTarget(newGoal);
      repository.setTarget(newGoal);
    } else {
      illuminationRegulator.setTarget(goal);
      repository.setTarget(goal);
    }
  }

  calculateNewLightPowerValues(sensor) {
    lightsData = repository.getLightData();
    let newValues;
    setValuesWithSensorData(sensor);
    switch (sensor.name) {
      case "Sensor 1":
        newValues = this.sensorOneRegulator.getNewLightBottomTopPowerValues(sensor.illuminance);
        return setNewPowerValuesAreaOne(newValues);
      case "Sensor 2":
        newValues = this.sensorTwoRegulator.getNewLightBottomTopPowerValues(sensor.illuminance);
        return setNewPowerValuesAreaTwo(newValues);
      case "Sensor 3":
        newValues = this.sensorThreeRegulator.getNewLightBottomTopPowerValues(sensor.illuminance);
        return setNewPowerValuesAreaThre(newValues);
      default:
        return;
    }
  }
}

const setValuesWithSensorData = (sensor) => {
  repository.setSensorData(sensor);
  repository.setIlluminanceAvg();
  repository.setIlluminanceData();
};

const setNewPowerValuesAreaOne = (newPowerValues) => {
  lightsData[0].bottom = newPowerValues.bottom;
  lightsData[4].bottom = newPowerValues.bottom;
  lightsData[0].top = newPowerValues.top;
  lightsData[4].top = newPowerValues.top;
  repository.setPower(lightsData);
  return lightsData;
};

const setNewPowerValuesAreaTwo = (newPowerValues) => {
  lightsData[1].bottom = newPowerValues.bottom;
  lightsData[2].bottom = newPowerValues.bottom;
  lightsData[5].bottom = newPowerValues.bottom;
  lightsData[6].bottom = newPowerValues.bottom;
  lightsData[1].top = newPowerValues.top;
  lightsData[2].top = newPowerValues.top;
  lightsData[5].top = newPowerValues.top;
  lightsData[6].top = newPowerValues.top;
  repository.setPower(lightsData);
  return lightsData;
};

const setNewPowerValuesAreaThree = (newPowerValues) => {
  lightsData[3].bottom = newPowerValues.bottom;
  lightsData[7].bottom = newPowerValues.bottom;
  lightsData[3].top = newPowerValues.top;
  lightsData[7].top = newPowerValues.top;
  repository.setPower(lightsData);
  return lightsData;
};

module.exports = AuthomaticLightService;
