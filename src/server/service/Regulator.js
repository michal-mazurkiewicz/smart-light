const Controller = require("../controllers/controller");
const LightingStrategy = require("./lightingStrategy");
const Filter = require("./Filter");

class Regulator {
  constructor(target, strategy) {
    this.illuminanceController = new Controller(0.01, 0.095, 0);
    this.powerFilter = new Filter();
    this.lightingStrategy = new LightingStrategy();
    this.setTarget(target);
    this.setStrategy(strategy);
  }
//0.3, 0.05, 0.15 niezle
//0.01, 0.08, 0 akceptowalne

  setTarget(target) {
    this.illuminanceController.setTarget(target);
  }

  setStrategy(strategy) {
    this.lightingStrategy.setStrategy(strategy);
  }

  getNewLightBottomTopPowerValues(sensorIlluminance) {
    let lightPowerValuesSum = this.getNewLightPowerValuesSum(sensorIlluminance);
    console.log("PowerSum", lightPowerValuesSum)
    let powerTargets = this.lightingStrategy.getNewLightsPowerTargetValues(
      lightPowerValuesSum
    );
      console.log("Power targets: ", powerTargets)
    return powerTargets;
  }

  getNewLightPowerValuesSum(sensorIlluminance) {
    return this.illuminanceController.update(sensorIlluminance);
  }
}

module.exports = Regulator;
