const Controller = require("node-pid-controller");
const { setTarget } = require("../data/repository");
const maxSaturation = 255;
const minSaturation = 0;

class Regulator {
  constructor(target, strategy) {
    this.illuminanceController = new Controller(0.15, 0.1, 0.1, 1);
    this.lightTopController = new Controller(0.15, 0.1, 0.1, 1);
    this.lightBottomController = new Controller(0.15, 0.1, 0.1, 1);
    this.bottomPriorityStrategy = new BottomPriorityStrategy();
    this.topPriorityStrategy = new TopPriorityStrategy();
    this.equalPriorityStrategy = new EqualPriorityStrategy();
    this.strategy = strategy;
    setTarget(target);
  }

  setTarget(target) {
    this.illuminanceController.setTarget(target);
  }

  setStrategy(strategy){
    switch (strategy) {
      case "SAVE":
        this.strategy = this.bottomPriorityStrategy;
        return;
      case "FEEL":
        this.strategy = this.topPriorityStrategy;
        return;
      case "HYBRID":
        this.strategy = this.equalPriorityStrategy;
        return;
      default:
        return;
    }
  }

  getNewLightBottomTopPowerValues(sensorIlluminance, oldValueTop, oldValueBottom){
      let lightPowerValuesSum = this.getNewLightPowerValuesSum(sensorIlluminance)

      let powerTargets = strategy.getNewLightsPowerTargetValues(lightPowerValuesSum)

      this.lightTopController.setTarget(powerTargets.top);
      this.lightBottomController.setTarget(powerTargets.bottom);

      return {bottom: getNewPowerValue(oldValueBottom, this.lightBottomController), top: getNewPowerValue(oldValueTop, this.lightTopController)}
  }

  getNewLightPowerValuesSum(sensorIlluminance) {
    return this.illuminanceController.update(sensorIlluminance)
  }
}


class BottomPriorityStrategy{
    getNewLightsPowerTargetValues(value){
        return {bottom: filterValue(value), top: filterValue(value - 255)}
    }
}

class TopPriorityStrategy{
    getNewLightsPowerTargetValues(value){
        return {bottom: filterValue(value - 255), top: filterValue(value)}
    }
}

class EqualPriorityStrategy{
    getNewLightsPowerTargetValues(value){
        return {bottom: filterValue(value / 2), top: filterValue(value / 2)}
    }
}

const getNewPowerValue = (oldValue, controller) => {
    return filterValue(Math.round(controller.update(oldValue)));
};

const filterValue = (value) => {
    if (value < minSaturation) {
      return minSaturation;
    } else if (value > maxSaturation) {
      return maxSaturation;
    }
    return value;
};

module.exports = Regulator;
