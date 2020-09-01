const repo = require("../data/repository");
let ctr = require("node-pid-controller");

const controller1 = new ctr({ k_p: 7.5, k_i: 0.1, k_d: 2.2 });
const controller2 = new ctr({ k_p: 7.5, k_i: 0.1, k_d: 2.2 });
const controller3 = new ctr({ k_p: 7.5, k_i: 0.1, k_d: 2.2 });
setGoal(500);

let target = 500;

const performAuthomaticLight = (sensor) => {
  setValuesWithSensorData(sensor);
  let automaticControl = getStrategy();
  return automaticControl(sensor);
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

const performSaveStrategy = (sensor) => {
  switch (sensor.name) {
    case "Sensor 1": //Oprawa 1 i Oprawa 5
      if (
        sensor < controller1.target * 0.9 &&
        sensor > controller1.target1 * 1.1
      ) {
        let difference = controller1.update(sensor.illuminance);
        console.log("SAVE 1 difference: ", difference)
        let lightData = repo.getLightData();
        let light1 = lightData[0];
        let light5 = lightData[4];

        if (light1.bottom < 255) {
          let newPower = light1.bottom + difference;
          light1.bottom = newPower > 255 ? 255 : newPower;
        }

        if (light1.bottom >= 255) {
          let newPower = light1.top + difference;
          light1.top = newPower > 255 ? 255 : newPower;
        }

        if (light5.bottom < 255) {
          let newPower = light5.bottom + difference;
          light5.bottom = newPower > 255 ? 255 : newPower;
        }

        if (light5.bottom >= 255) {
          let newPower = light5.top + difference;
          light5.top = newPower > 255 ? 255 : newPower;
        }
        repo.setLightData(light1);
        repo.setLightData(light5);
        console.log("SENSOR 1 set Lights: ", light1, light5)
      }
      return repo.getLightData();
    case "Sensor 2": //Oprawy 2, 6, 3, 7
      if (
        sensor < controller1.target * 0.9 &&
        sensor > controller1.target1 * 1.1
      ) {
        let difference = controller2.update(sensor.illuminance);
        console.log("SAVE 2 difference: ", difference)
        let lightData = repo.getLightData();
        let light2 = lightData[1];
        let light3 = lightData[2];
        let light6 = lightData[5];
        let light7 = lightData[6];

        if (light2.bottom < 255) {
          let newPower = light2.bottom + difference;
          light2.bottom = newPower > 255 ? 255 : newPower;
        }

        if (light2.bottom >= 255) {
          let newPower = light2.top + difference;
          light2.top = newPower > 255 ? 255 : newPower;
        }

        if (light3.bottom < 255) {
          let newPower = light3.bottom + difference;
          light3.bottom = newPower > 255 ? 255 : newPower;
        }

        if (light3.bottom >= 255) {
          let newPower = light3.top + difference;
          light3.top = newPower > 255 ? 255 : newPower;
        }

        if (light6.bottom < 255) {
          let newPower = light3.bottom + difference;
          light3.bottom = newPower > 255 ? 255 : newPower;
        }

        if (light6.bottom >= 255) {
          let newPower = light6.top + difference;
          light6.top = newPower > 255 ? 255 : newPower;
        }

        if (light7.bottom < 255) {
          let newPower = light7.bottom + difference;
          light7.bottom = newPower > 255 ? 255 : newPower;
        }

        if (light7.bottom >= 255) {
          let newPower = light7.top + difference;
          light7.top = newPower > 255 ? 255 : newPower;
        }

        repo.setLightData(light2);
        repo.setLightData(light3);
        repo.setLightData(light6);
        repo.setLightData(light7);
        console.log("SENSOR 2 set Lights: ", light2, light3, light6, light7)
      }
      return repo.getLightData();
    case "Sensor 3": //Oprawy 4, 8
      if (
        sensor < controller1.target * 0.9 &&
        sensor > controller1.target1 * 1.1
      ) {
        let difference = controller3.update(sensor.illuminance);
        console.log("SAVE 3 difference: ", difference)
        let lightData = repo.getLightData();
        let light4 = lightData[3];
        let light8 = lightData[7];

        if (light4.bottom < 255) {
          let newPower = light4.bottom + difference;
          light4.bottom = newPower > 255 ? 255 : newPower;
        }

        if (light4.bottom >= 255) {
          let newPower = light4.bottom + difference;
          light4.top = newPower > 255 ? 255 : newPower;
        }

        if (light8.bottom < 255) {
          let newPower = light8.bottom + difference;
          light8.bottom = newPower > 255 ? 255 : newPower;
        }

        if (light8.bottom >= 255) {
          let newPower = light8.top + difference;
          light8.top = newPower > 255 ? 255 : newPower;
        }
        repo.setLightData(light4);
        repo.setLightData(light8);
        console.log("SENSOR 3 set Lights: ", light4, light8)
      }
      return repo.getLightData();
    default:
      break;
  }
};

const performFeelStrategy = (sensor) => {
  switch (sensor.name) {
    case "Sensor 1": //Oprawa 1 i Oprawa 5
      if (
        sensor < controller1.target * 0.9 &&
        sensor > controller1.target1 * 1.1
      ) {
        let difference = controller1.update(sensor.illuminance);
        console.log("FEEL 1 difference: ", difference)
        let lightData = repo.getLightData();
        let light1 = lightData[0];
        let light5 = lightData[4];

        if (light1.top < 255) {
          let newPower = light1.top + difference;
          light1.top = newPower > 255 ? 255 : newPower;
        }

        if (light1.top >= 255) {
          let newPower = light1.bottom + difference;
          light1.bottom = newPower > 255 ? 255 : newPower;
        }

        if (light5.top < 255) {
          let newPower = light5.top + difference;
          light5.top = newPower > 255 ? 255 : newPower;
        }

        if (light5.top >= 255) {
          let newPower = light5.bottom + difference;
          light5.bottom = newPower > 255 ? 255 : newPower;
        }
        repo.setLightData(light1);
        repo.setLightData(light5);
        console.log("SENSOR 1 set Lights: ", light1, light5)
      }
      return repo.getLightData();
    case "Sensor 2": //Oprawy 2, 6, 3, 7
      if (
        sensor < controller1.target * 0.9 &&
        sensor > controller1.target1 * 1.1
      ) {
        let difference = controller2.update(sensor.illuminance);
        console.log("FEEL 2 difference: ", difference)
        let lightData = repo.getLightData();
        let light2 = lightData[1];
        let light3 = lightData[2];
        let light6 = lightData[5];
        let light7 = lightData[6];

        if (light2.top < 255) {
          let newPower = light2.top + difference;
          light2.top = newPower > 255 ? 255 : newPower;
        }

        if (light2.top >= 255) {
          let newPower = light2.bottom + difference;
          light2.bottom = newPower > 255 ? 255 : newPower;
        }
        if (light3.top < 255) {
          let newPower = light3.top + difference;
          light3.top = newPower > 255 ? 255 : newPower;
        }

        if (light3.top >= 255) {
          let newPower = light3.bottom + difference;
          light3.bottom = newPower > 255 ? 255 : newPower;
        }
        if (light6.top < 255) {
          let newPower = light6.top + difference;
          light6.top = newPower > 255 ? 255 : newPower;
        }

        if (light6.top >= 255) {
          let newPower = light6.bottom + difference;
          light6.bottom = newPower > 255 ? 255 : newPower;
        }
        if (light7.top < 255) {
          let newPower = light7.top + difference;
          light7.top = newPower > 255 ? 255 : newPower;
        }

        if (light7.top >= 255) {
          let newPower = light7.bottom + difference;
          light7.bottom = newPower > 255 ? 255 : newPower;
        }

        repo.setLightData(light2);
        repo.setLightData(light3);
        repo.setLightData(light6);
        repo.setLightData(light7);
        console.log("SENSOR 2 set Lights: ", light2, light3, light6, light7)
      }
      return repo.getLightData();
    case "Sensor 3": //Oprawy 4, 8
      if (
        sensor < controller1.target * 0.9 &&
        sensor > controller1.target1 * 1.1
      ) {
        let difference = controller3.update(sensor.illuminance);
        console.log("FEEL 3 difference: ", difference)
        let lightData = repo.getLightData();
        let light4 = lightData[3];
        let light8 = lightData[7];

        if (light4.top < 255) {
          let newPower = light4.top + difference;
          light4.top = newPower > 255 ? 255 : newPower;
        }

        if (light4.top >= 255) {
          let newPower = light4.bottom + difference;
          light4.bottom = newPower > 255 ? 255 : newPower;
        }
        if (light8.top < 255) {
          let newPower = light8.top + difference;
          light8.top = newPower > 255 ? 255 : newPower;
        }

        if (light8.top >= 255) {
          let newPower = light8.bottom + difference;
          light8.bottom = newPower > 255 ? 255 : newPower;
        }
        repo.setLightData(light4);
        repo.setLightData(light8);
        console.log("SENSOR 3 set Lights: ", light4, light8)
      }
      return repo.getLightData();
    default:
      break;
  }
};

const performHybridStrategy = (sensor) => {
  switch (sensor.name) {
    case "Sensor 1": //Oprawa 1 i Oprawa 5
      if (
        sensor < controller1.target * 0.9 &&
        sensor > controller1.target1 * 1.1
      ) {
        let difference = controller1.update(sensor.illuminance);
        console.log("HYBRID 1 difference: ", difference)
        let lightData = repo.getLightData();
        let light1 = lightData[0];
        let light5 = lightData[4];

        let newPower = light1.bottom + difference;
        light1.bottom = newPower > 255 ? 255 : newPower;
        light1.top = newPower > 255 ? 255 : newPower;
        light5.bottom = newPower > 255 ? 255 : newPower;
        light5.top = newPower > 255 ? 255 : newPower;

        repo.setLightData(light1);
        repo.setLightData(light5);
        console.log("SENSOR 1 set Lights: ", light1, light5)
      }
      return repo.getLightData();
    case "Sensor 2": //Oprawy 2, 6, 3, 7
      if (
        sensor < controller1.target * 0.9 &&
        sensor > controller1.target1 * 1.1
      ) {
        let difference = controller2.update(sensor.illuminance);
        console.log("HYBRID 2 difference: ", difference)
        let lightData = repo.getLightData();
        let light2 = lightData[1];
        let light3 = lightData[2];
        let light6 = lightData[5];
        let light7 = lightData[6];

        let newPower = light2.bottom + difference;
        light2.bottom = newPower > 255 ? 255 : newPower;
        light2.top = newPower > 255 ? 255 : newPower;

        light3.bottom = newPower > 255 ? 255 : newPower;
        light3.top = newPower > 255 ? 255 : newPower;

        light6.bottom = newPower > 255 ? 255 : newPower;
        light6.top = newPower > 255 ? 255 : newPower;

        light7.bottom = newPower > 255 ? 255 : newPower;
        light7.top = newPower > 255 ? 255 : newPower;

        repo.setLightData(light2);
        repo.setLightData(light3);
        repo.setLightData(light6);
        repo.setLightData(light7);
        console.log("SENSOR 2 set Lights: ", light2, light3, light6, light7)
      }
      return repo.getLightData();
    case "Sensor 3": //Oprawy 4, 8
      if (
        sensor < controller1.target * 0.9 &&
        sensor > controller1.target1 * 1.1
      ) {
        let difference = controller3.update(sensor.illuminance);
        console.log("HYBRID 3 difference: ", difference)
        let lightData = repo.getLightData();
        let light4 = lightData[3];
        let light8 = lightData[7];

        let newPower = light4.bottom + difference;
        light4.bottom = newPower > 255 ? 255 : newPower;
        light4.top = newPower > 255 ? 255 : newPower;
        light8.bottom = newPower > 255 ? 255 : newPower;
        light8.top = newPower > 255 ? 255 : newPower;
        repo.setLightData(light4);
        repo.setLightData(light8);
        console.log("SENSOR 3 set Lights: ", light4, light8)
      }
      return repo.getLightData();
    default:
      break;
  }
};

const setValuesWithSensorData = (sensor) => {
  repo.setSensorData(sensor);
  repo.setIlluminanceAvg();
  repo.setIlluminanceData();
};

const setGoal = (goal) => {
  controller1.setTarget(goal);
  controller2.setTarget(goal);
  controller3.setTarget(goal);
};

const getTarget = () => {
  return target;
};

module.exports = {
  performAuthomaticLight,
  getTarget,
};

//1 Oszczedzanie energi wykorzystujemy 100% dopiero góre
//2 Świecimy na górę i dorzucamy dołu tyle ile potrzeba
//3 Hybryda 50%:50%.
//Rownomierność do okna
