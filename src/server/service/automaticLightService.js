const repo = require("../data/repository");
const Controller = require("node-pid-controller");

const illuminationRegulator = new Controller(0.15, 0.1, 0.1, 1);
illuminationRegulator.setTarget(repo.getTarget());

const controller1Bottom = new Controller({ k_p: 7.5, k_i: 0.1, k_d: 2.2 });
const controller1Top = new Controller({ k_p: 7.5, k_i: 0.1, k_d: 2.2 });

const controller2Bottom = new Controller({ k_p: 7.5, k_i: 0.1, k_d: 2.2 });
const controller2Top = new Controller({ k_p: 7.5, k_i: 0.1, k_d: 2.2 });

const controller3Bottom = new Controller({ k_p: 7.5, k_i: 0.1, k_d: 2.2 });
const controller3Top = new Controller({ k_p: 7.5, k_i: 0.1, k_d: 2.2 });



const setTarget = (goal) => {
  if (goal === "SAME") {
    let newGoal = repo.getSensorData()[0].illuminance;
    illuminationRegulator.setTarget(newGoal);
    repo.setTarget(newGoal);
  } else {
    illuminationRegulator.setTarget(goal);
    repo.setTarget(goal);
  }
};

setTarget(repo.getTarget());

const performAuthomaticLight = (sensor) => {
  let lightPower = illuminationRegulator.update(sensor.illuminance);
  setValuesWithSensorData(sensor);
  let automaticControl = getStrategy();
  return automaticControl(sensor, lightPower);
};

const getMasterRegulatorForSensor = (sensor) => {
  switch (sensor.name) {
    case "Sensor 1":
      return illuminationRegulator1;
      break;
    case "Sensor 2":
      return illuminationRegulator2;
    case "Sensor 2":
      return illuminationRegulator2;
    default:
      break;
  }
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



const getNewValue = (oldValue, controller) => {
  return filterValue(Math.round(oldValue + controller.update(oldValue)));
};

const performSaveStrategy = (sensor, value, regulator) => {
  switch (sensor.name) {
    case "Sensor 1": //Oprawa 1 i Oprawa 5
      let bottom = filterValue(value);
      let top = filterValue(value - 255);
      //Obiekt regulator 3 pola - illumination ctr, top ctr, bottom ctr, 
      // new Regulator(illumination, top, bottom); 
      //this.illuminationCtr = illumina... 
      controller1Bottom.setTarget(bottom);
      controller1Top.setTarget(top);

      let lightData = repo.getLightData();
      let light1 = lightData[0];
      let light5 = lightData[4];

      let newBottomValue = getNewValue(light1.bottom, controller1Bottom);
      let newTopValue = getNewValue(light1.top, controller1Top);

      light1.bottom = newBottomValue;
      light5.bottom = newBottomValue;

      light1.top = newTopValue;
      light5.top = newTopValue;

      repo.setLightData(light1);
      repo.setLightData(light5);

      return repo.getLightData();
    case "Sensor 2": //Oprawy 2, 6, 3, 7
      let bottom = filterValue(value);
      let top = filterValue(value - 255);
      controller2Bottom.setTarget(bottom);
      controller2Top.setTarget(top);

      let lightData = repo.getLightData();
      let light2 = lightData[0];
      let light3 = lightData[2];
      let light6 = lightData[5];
      let light7 = lightData[6];

      let newBottomValue = getNewValue(light2.bottom, controller2Bottom);
      let newTopValue = getNewValue(light2.top, controller2Top);

      light2.bottom = newBottomValue;
      light3.bottom = newBottomValue;
      light6.bottom = newBottomValue;
      light7.bottom = newBottomValue;

      light2.top = newTopValue;
      light3.top = newTopValue;
      light6.top = newTopValue;
      light7.top = newTopValue;

      repo.setLightData(light2);
      repo.setLightData(light3);
      repo.setLightData(light6);
      repo.setLightData(light7);

      return repo.getLightData();
    case "Sensor 3": //Oprawy 4, 8
      let bottom = filterValue(value);
      let top = filterValue(value - 255);

      controller3Bottom.setTarget(bottom);
      controller3Top.setTarget(top);

      let lightData = repo.getLightData();
      let light4 = lightData[3];
      let light8 = lightData[7];

      let newBottomValue = getNewValue(light4.bottom, controller1Bottom);
      let newTopValue = getNewValue(light4.top, controller1Top);

      light4.bottom = newBottomValue;
      light8.bottom = newBottomValue;

      light4.top = newTopValue;
      light8.top = newTopValue;

      repo.setLightData(light4);
      repo.setLightData(light8);

      return repo.getLightData();
    default:
      break;
  }
};

const performFeelStrategy = (sensor) => {
  switch (sensor.name) {
    case "Sensor 1": //Oprawa 1 i Oprawa 5
      let bottom = filterValue(value - 255);
      let top = filterValue(value);
      controller1Bottom.setTarget(bottom);
      controller1Top.setTarget(top);

      let lightData = repo.getLightData();
      let light1 = lightData[0];
      let light5 = lightData[4];

      let newBottomValue = getNewValue(light1.bottom, controller1Bottom);
      let newTopValue = getNewValue(light1.top, controller1Top);

      light1.bottom = newBottomValue;
      light5.bottom = newBottomValue;

      light1.top = newTopValue;
      light5.top = newTopValue;

      repo.setLightData(light1);
      repo.setLightData(light5);

      return repo.getLightData();
    case "Sensor 2": //Oprawy 2, 6, 3, 7
      let bottom = filterValue(value - 255);
      let top = filterValue(value);
      controller2Bottom.setTarget(bottom);
      controller2Top.setTarget(top);

      let lightData = repo.getLightData();
      let light2 = lightData[0];
      let light3 = lightData[2];
      let light6 = lightData[5];
      let light7 = lightData[6];

      let newBottomValue = getNewValue(light2.bottom, controller2Bottom);
      let newTopValue = getNewValue(light2.top, controller2Top);

      light2.bottom = newBottomValue;
      light3.bottom = newBottomValue;
      light6.bottom = newBottomValue;
      light7.bottom = newBottomValue;

      light2.top = newTopValue;
      light3.top = newTopValue;
      light6.top = newTopValue;
      light7.top = newTopValue;

      repo.setLightData(light2);
      repo.setLightData(light3);
      repo.setLightData(light6);
      repo.setLightData(light7);

      return repo.getLightData();
    case "Sensor 3": //Oprawy 4, 8
      let bottom = filterValue(value - 255);
      let top = filterValue(value);

      controller3Bottom.setTarget(bottom);
      controller3Top.setTarget(top);

      let lightData = repo.getLightData();
      let light4 = lightData[3];
      let light8 = lightData[7];

      let newBottomValue = getNewValue(light4.bottom, controller1Bottom);
      let newTopValue = getNewValue(light4.top, controller1Top);

      light4.bottom = newBottomValue;
      light8.bottom = newBottomValue;

      light4.top = newTopValue;
      light8.top = newTopValue;

      repo.setLightData(light4);
      repo.setLightData(light8);

      return repo.getLightData();
    default:
      break;
  }
};

const performHybridStrategy = (sensor) => {
  switch (sensor.name) {
    case "Sensor 1": //Oprawa 1 i Oprawa 5
      let bottom = filterValue(value);
      let top = bottom;
      controller1Bottom.setTarget(bottom);
      controller1Top.setTarget(top);

      let lightData = repo.getLightData();
      let light1 = lightData[0];
      let light5 = lightData[4];

      let newBottomValue = getNewValue(light1.bottom, controller1Bottom);
      let newTopValue = getNewValue(light1.top, controller1Top);

      light1.bottom = newBottomValue;
      light5.bottom = newBottomValue;

      light1.top = newTopValue;
      light5.top = newTopValue;

      repo.setLightData(light1);
      repo.setLightData(light5);

      return repo.getLightData();
    case "Sensor 2": //Oprawy 2, 6, 3, 7
      let bottom = filterValue(value);
      let top = bottom;
      controller2Bottom.setTarget(bottom);
      controller2Top.setTarget(top);

      let lightData = repo.getLightData();
      let light2 = lightData[0];
      let light3 = lightData[2];
      let light6 = lightData[5];
      let light7 = lightData[6];

      let newBottomValue = getNewValue(light2.bottom, controller2Bottom);
      let newTopValue = getNewValue(light2.top, controller2Top);

      light2.bottom = newBottomValue;
      light3.bottom = newBottomValue;
      light6.bottom = newBottomValue;
      light7.bottom = newBottomValue;

      light2.top = newTopValue;
      light3.top = newTopValue;
      light6.top = newTopValue;
      light7.top = newTopValue;

      repo.setLightData(light2);
      repo.setLightData(light3);
      repo.setLightData(light6);
      repo.setLightData(light7);

      return repo.getLightData();
    case "Sensor 3": //Oprawy 4, 8
      let bottom = filterValue(value);
      let top = bottom;

      controller3Bottom.setTarget(bottom);
      controller3Top.setTarget(top);

      let lightData = repo.getLightData();
      let light4 = lightData[3];
      let light8 = lightData[7];

      let newBottomValue = getNewValue(light4.bottom, controller1Bottom);
      let newTopValue = getNewValue(light4.top, controller1Top);

      light4.bottom = newBottomValue;
      light8.bottom = newBottomValue;

      light4.top = newTopValue;
      light8.top = newTopValue;

      repo.setLightData(light4);
      repo.setLightData(light8);

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

module.exports = {
  performAuthomaticLight,
  setTarget,
};

//1 Oszczedzanie energi wykorzystujemy 100% dopiero góre
//2 Świecimy na górę i dorzucamy dołu tyle ile potrzeba
//3 Hybryda 50%:50%.
//Rownomierność do okna
