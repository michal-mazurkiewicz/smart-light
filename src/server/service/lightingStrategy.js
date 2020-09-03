const maxSaturation = 255;
const minSaturation = 1;

class LightingStrategy {
  constructor() {
    this.bottomPriorityStrategy = new BottomPriorityStrategy();
    this.topPriorityStrategy = new TopPriorityStrategy();
    this.equalPriorityStrategy = new EqualPriorityStrategy();
    this.strategy;
  }

  setStrategy(strategy) {
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

  getNewLightsPowerTargetValues(value){
      this.strategy.getNewLightsPowerTargetValues(value)
  }

  
}

class BottomPriorityStrategy {
  getNewLightsPowerTargetValues(value) {
    return { bottom: filterValue(value), top: filterValue(value - 255) };
  }
}

class TopPriorityStrategy {
  getNewLightsPowerTargetValues(value) {
    return { bottom: filterValue(value - 255), top: filterValue(value) };
  }
}

class EqualPriorityStrategy {
  getNewLightsPowerTargetValues(value) {
    return { bottom: filterValue(value / 2), top: filterValue(value / 2) };
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


module.exports = LightingStrategy;
