const maxSaturation = 255;
const minSaturation = 1;

class LightingStrategy {
  constructor() {
    this.strategy;
  }

  setStrategy(strategy) {
    switch (strategy) {
      case "SAVE":
        this.strategy = new BottomPriorityStrategy();
        return;
      case "FEEL":
        this.strategy = new TopPriorityStrategy();
        return;
      case "HYBRID":
        this.strategy = new EqualPriorityStrategy();
        return;
      default:
        return;
    }
  }

  getNewLightsPowerTargetValues(value){
      return this.strategy.getNewLightsPowerTargetValues(value)
  }
}

class BottomPriorityStrategy {
  getNewLightsPowerTargetValues(value) {
    console.log("Bottom priority: ", value)
    let bottom = filterValue(value);
    let newTopValue = value - 255;
    let top = filterValue(newTopValue);
    return { bottom: bottom, top: top };
  }
}

class TopPriorityStrategy {
  getNewLightsPowerTargetValues(value) {
    console.log("Top priority: ", value)
    let top = filterValue(value);
    let newBottomValue = value - 255;
    let bottom = filterValue(newBottomValue);
    return { bottom: bottom, top: top };
  }
}

class EqualPriorityStrategy {
  getNewLightsPowerTargetValues(value) {
    console.log("Equal priority: ", value)
    let bottom = filterValue(value/2);
    let top = filterValue(value/2);
    return { bottom: bottom, top: top };
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
    return Math.round(value);
};


module.exports = LightingStrategy;
