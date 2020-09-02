const Regulator = require("./Regulator");
const repository = require("../data/repository");

class AuthomaticLight {
  constructor() {
    this.sensorOneRegulator = new Regulator();
    this.sensorTwoRegulator = new Regulator();
    this.sensorThreeRegulator = new Regulator();
  }

  setStrategy(strategy) {
    this.sensorOneRegulator.setStrategy(strategy);
    this.sensorTwoRegulator.setStrategy(strategy);
    this.sensorThreeRegulator.setStrategy(strategy);
    repository.setStrategy(strategy)
  }

  calculateNewLightPowerValues(sensor, light) {
    switch (sensor.name) {
      case "Sensor 1":
        let newValues = this.sensorOneRegulator.getNewLightBottomTopPowerValues(
          sensor.illuminance,
          light.top,
          light.bottom
        );
        return;
      case "Sensor 2":
        let newValues = this.sensorTwoRegulator.getNewLightBottomTopPowerValues(
          sensor.illuminance,
          light.top,
          light.bottom
        );
      case "Sensor 3":
        let newValues = this.sensorThreeRegulator.getNewLightBottomTopPowerValues(
          sensor.illuminance,
          light.top,
          light.bottom
        );

      default:
        return;
    }
  }
}

module.exports = AuthomaticLight
