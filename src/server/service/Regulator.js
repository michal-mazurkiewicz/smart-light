const repo = require("../data/repository");
const maxSaturation = 255;
const minSaturation = 0;

class Regulator {
  constructor(
    illuminanceController,
    lightTopController,
    lightBottomController,
    illuminanceTarget
  ) {
    this.illuminanceController = illuminanceController;
    this.lightTopController = lightTopController;
    this.lightBottomController = lightBottomController;
    this.illuminanceTarget = illuminanceTarget;
  }

  setTarget(target) {
    this.illuminanceTarget = target;
    this.illuminanceController.setTarget(target);
  }

  getNewLightPowerValue(sensor) {
    return this.illuminanceController.update(sensor.illuminance)
  }
}

module.exports = Regulator;
