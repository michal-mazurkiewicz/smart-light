let moment = require("moment")

let lightData = [
  {
    name: "Oprawa 1",
    bottom: 0,
    top: 0,
  },
  {
    name: "Oprawa 2",
    bottom: 70,
    top: 0,
  },
  {
    name: "Oprawa 3",
    bottom: 100,
    top: 30,
  },
  {
    name: "Oprawa 4",
    bottom: 100,
    top: 30,
  },
  {
    name: "Oprawa 5",
    bottom: 100,
    top: 40,
  },
  {
    name: "Oprawa 6",
    bottom: 100,
    top: 40,
  },
  {
    name: "Oprawa 7",
    bottom: 80,
    top: 30,
  },
  {
    name: "Oprawa 8",
    bottom: 100,
    top: 25,
  },
];

let sensorData = [
  { name: "Sensor 1", illuminance: 500 },
  { name: "Sensor 2", illuminance: 450 },
  { name: "Sensor 3", illuminance: 550 },
  { name: "Average", illuminance: 500 },
];

let illuminanceData = [
  {
    time: "10",
    illuminance: 100,
    power: 10,
  },
];

let mode = "AUTO";
let energyMode = "SAVE";

const setLightData = (data) => {
  lightData = lightData.map((l) => l.name === data.name ? data : l);
};

const setIlluminanceData = (illuminance) => {
  illuminanceData.push({time: moment().format("HH:mm"), illuminance: illuminance, power: getPowerAverage() })
  if(illuminanceData.length > 20){
    illuminanceData.splice(0, 1)
  }
};


const setSensorData = (data) => {
  sensorData = sensorData.map((s) => s.name === data.name ? data : s);
};

const changeMode = (data) => {
  console.log("Change Mode to: ", data);
  mode = data;
};

const setEnergyMode = (data) => { 
  console.log("Change Mode to: ", data);
  energyMode = data;
}

const getEnergyMode = () => {
  return energyMode;
}

const changePower = (data) => {
  console.log("Change Power", data);
  lightData = data;
  console.log("NEw POwer: ", lightData);
};

const getPowerAverage = () => {
  let powerAvg = (lightData.reduce((p, n) => p + n.bottom, 0) / lightData.length) / 255
  return powerAvg * 100;
}

const getLightData = () => {
  return lightData;
};

const getIlluminanceData = () => {
  if(illuminanceData.length > 20){
    illuminanceData = illuminanceData.slice(illuminanceData.length - 20, illuminanceData.length - 1)
  }
  return illuminanceData;
};

const getSensorData = () => {
  return sensorData;
};

const getMode = () => {
  return mode;
};

const getFeed = () => {
  return {lightData, illuminanceData, sensorData, mode, energyMode};
};

module.exports = {
  getFeed,
  getLightData,
  getIlluminanceData,
  getSensorData,
  setSensorData,
  setIlluminanceData,
  setEnergyMode,
  getEnergyMode,
  getMode,
  changePower,
  changeMode,
};
