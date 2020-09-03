const Controller = require("node-pid-controller");
const LightingStrategy = require("./lightingStrategy");
const Filter = require("./Filter");

class Regulator {
  constructor(target, strategy) {
    this.illuminanceController = new Controller(0.15, 0.1, 0.1, 1);
    this.powerFilter = new Filter();
    this.lightingStrategy = new LightingStrategy();
    setTarget(target);
    setStrategy(strategy);
  }

  setTarget(target) {
    this.illuminanceController.setTarget(target);
  }

  setStrategy(strategy) {
    this.lightingStrategy.setStrategy(strategy);
  }

  getNewLightBottomTopPowerValues(sensorIlluminance) {
    let lightPowerValuesSum = this.getNewLightPowerValuesSum(sensorIlluminance);
    let powerTargets = this.lightingStrategy.getNewLightsPowerTargetValues(
      lightPowerValuesSum
    );

    return this.powerFilter.getNewBottomTopPowerValue(
      powerTargets.bottom,
      powerTargets.bottom
    );
  }

  getNewLightPowerValuesSum(sensorIlluminance) {
    return this.illuminanceController.update(sensorIlluminance);
  }
}

module.exports = Regulator;
