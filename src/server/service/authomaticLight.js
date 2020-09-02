const maxSaturation = 255;
const minSaturation = 0;

class AuthomaticLight {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculateNewLightPowerValues(sensor, light) {
    return this.strategy.calculateNewLightValues(sensor, light);
  }
}

class SavingStrategy {
  constructor(regulator1, regulator2, regulator3) {
    this.sensorOneRegulator = regulator1;
    this.sensorTwoRegulator = regulator2;
    this.sensorThreeRegulator = regulator3;
  }

  calculateNewLightPowerValues(sensor, light) {
    switch (sensor.name) {
      case "Sensor 1":
        let newValue = this.sensorOneRegulator.getNewLightPowerValue(sensor);
        let bottom = filterValue(newValue);
        let top = filterValue(newValue - 255);

        this.sensorOneRegulator.lightBottomController.setTarget(bottom);
        this.sensorOneRegulator.lightTopController.setTarget(top);

        return {bottom: getNewValue(light.bottom, this.sensorOneRegulator.lightBottomController), top: getNewValue(light.top, this.sensorOneRegulator.lightTopController)}
      case "Sensor 2":
        let newValue = this.sensorTwoRegulator.getNewLightPowerValue(sensor);
        let bottom = filterValue(newValue);
        let top = filterValue(newValue - 255);

        this.sensorTwoRegulator.lightBottomController.setTarget(bottom);
        this.sensorTwoRegulator.lightTopController.setTarget(top);

        return {bottom: getNewValue(light.bottom, this.sensorTwoRegulator.lightBottomController), top: getNewValue(light.top, this.sensorTwoRegulator.lightTopController)}
      case "Sensor 3":
        let newValue = this.sensorThreeRegulator.getNewLightPowerValue(sensor);
        let bottom = filterValue(newValue);
        let top = filterValue(newValue - 255);

        this.sensorThreeRegulator.lightBottomController.setTarget(bottom);
        this.sensorThreeRegulator.lightTopController.setTarget(top);

        return {bottom: getNewValue(light.bottom, this.sensorThreeRegulator.lightBottomController), top: getNewValue(light.top, this.sensorThreeRegulator.lightTopController)}
      default:
        break;
    }
  }
}

class FeelingStrategy {
    constructor(regulator1, regulator2, regulator3) {
        this.sensorOneRegulator = regulator1;
        this.sensorTwoRegulator = regulator2;
        this.sensorThreeRegulator = regulator3;
      }

      calculateNewLightPowerValues(sensor, light) {
        switch (sensor.name) {
          case "Sensor 1":
            let newValue = this.sensorOneRegulator.getNewLightPowerValue(sensor);
            let top = filterValue(newValue);
            let bottom = filterValue(newValue - 255);

            this.sensorOneRegulator.lightBottomController.setTarget(bottom);
            this.sensorOneRegulator.lightTopController.setTarget(top);

            return {bottom: getNewValue(light.bottom, this.sensorOneRegulator.lightBottomController), top: getNewValue(light.top, this.sensorOneRegulator.lightTopController)}
          case "Sensor 2":
            let newValue = this.sensorTwoRegulator.getNewLightPowerValue(sensor);
            let top = filterValue(newValue);
            let bottom = filterValue(newValue - 255);

            this.sensorTwoRegulator.lightBottomController.setTarget(bottom);
            this.sensorTwoRegulator.lightTopController.setTarget(top);

            return {bottom: getNewValue(light.bottom, this.sensorTwoRegulator.lightBottomController), top: getNewValue(light.top, this.sensorTwoRegulator.lightTopController)}
          case "Sensor 3":
            let newValue = this.sensorThreeRegulator.getNewLightPowerValue(sensor);
            let top = filterValue(newValue);
            let bottom = filterValue(newValue - 255);

            this.sensorThreeRegulator.lightBottomController.setTarget(bottom);
            this.sensorThreeRegulator.lightTopController.setTarget(top);

            return {bottom: getNewValue(light.bottom, this.sensorThreeRegulator.lightBottomController), top: getNewValue(light.top, this.sensorThreeRegulator.lightTopController)}
          default:
            break;
        }
      }
}

class HybridStrategy {
    constructor(regulator1, regulator2, regulator3) {
        this.sensorOneRegulator = regulator1;
        this.sensorTwoRegulator = regulator2;
        this.sensorThreeRegulator = regulator3;
      }

      calculateNewLightPowerValues(sensor, light) {
        switch (sensor.name) {
          case "Sensor 1":
            let newValue = this.sensorOneRegulator.getNewLightPowerValue(sensor);
            let bottom = filterValue(newValue / 2);
            let top = filterValue(newValue / 2);

            this.sensorOneRegulator.lightBottomController.setTarget(bottom);
            this.sensorOneRegulator.lightTopController.setTarget(top);

            return {bottom: getNewValue(light.bottom, this.sensorOneRegulator.lightBottomController), top: getNewValue(light.top, this.sensorOneRegulator.lightTopController)}
          case "Sensor 2":
            let newValue = this.sensorTwoRegulator.getNewLightPowerValue(sensor);
            let bottom = filterValue(newValue / 2);
            let top = filterValue(newValue / 2);

            this.sensorTwoRegulator.lightBottomController.setTarget(bottom);
            this.sensorTwoRegulator.lightTopController.setTarget(top);

            return {bottom: getNewValue(light.bottom, this.sensorTwoRegulator.lightBottomController), top: getNewValue(light.top, this.sensorTwoRegulator.lightTopController)}
          case "Sensor 3":
            let newValue = this.sensorThreeRegulator.getNewLightPowerValue(sensor);
            let bottom = filterValue(newValue / 2);
            let top = filterValue(newValue / 2);

            this.sensorThreeRegulator.lightBottomController.setTarget(bottom);
            this.sensorThreeRegulator.lightTopController.setTarget(top);

            return {bottom: getNewValue(light.bottom, this.sensorThreeRegulator.lightBottomController), top: getNewValue(light.top, this.sensorThreeRegulator.lightTopController)}
          default:
            break;
        }
      }
}

const filterValue = (value) => {
  if (value < minSaturation) {
    return minSaturation;
  } else if (value > maxSaturation) {
    return maxSaturation;
  }
  return value;
};

const getNewValue = (oldValue, controller) => {
    return filterValue(Math.round(controller.update(oldValue)));
  };
