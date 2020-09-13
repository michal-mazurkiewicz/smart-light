let moment = require("moment")

let lightData = [
  {
    name: "Oprawa 1",
    bottom: 1,
    top: 1,
  },
  {
    name: "Oprawa 2",
    bottom: 1,
    top: 1,
  },
  {
    name: "Oprawa 3",
    bottom: 1,
    top: 1,
  },
  {
    name: "Oprawa 4",
    bottom: 1,
    top: 1,
  },
  {
    name: "Oprawa 5",
    bottom: 1,
    top: 1,
  },
  {
    name: "Oprawa 6",
    bottom: 1,
    top: 1,
  },
  {
    name: "Oprawa 7",
    bottom: 1,
    top: 1,
  },
  {
    name: "Oprawa 8",
    bottom: 1,
    top: 1,
  },
];

let sensorData = [
  { name: "Sensor 1", illuminance: 0 },
  { name: "Sensor 2", illuminance: 0 },
  { name: "Sensor 3", illuminance: 0 },
  { name: "Average", illuminance: 0 },
];

let illuminanceData = [
  {
    time: "0",
    illuminance: 0,
    power: 0,
  },
];

let mode = "MANUAL";
let strategy = "SAVE";
let target = "300";

const setLightData = (data) => {
  lightData = lightData.map((l) => l.name === data.name ? data : l);
};

const setIlluminanceData = () => {
  illuminanceData.push({time: moment().format("HH:mm"), illuminance: getIlluminanceAvg(), power: getPowerAverage() })
  if(illuminanceData.length > 200){
    illuminanceData.splice(0, 1)
  }
};

const getIlluminanceAvg = () => {
  return sensorData[3].illuminance;
}

const setIlluminanceAvg = () => {
  let average = Math.round(sensorData.slice(0, 3).reduce((p, n) => p + n.illuminance, 0) / 3)
  sensorData[3] = {name: "Average", illuminance: average};
}


const setSensorData = (data) => {
  sensorData = sensorData.map((s) => s.name === data.name ? data : s);
};

const setMode = (data) => {
  console.log("Change Mode to: ", data);
  mode = data;
};

const setStrategy = (data) => {
  strategy = data;
}

const getStrategy = () => {
  return strategy;
}

const setPower = (data) => {
  lightData = data;
};

const getPowerAverage = () => {
  let powerAvg = (lightData.reduce((p, n) => p + n.bottom, 0) / lightData.length) / 255
  return powerAvg * 100;
}

const getLightData = () => {
  return lightData;
};

const getIlluminanceData = () => {
  if(illuminanceData.length > 200){
    illuminanceData = illuminanceData.slice(illuminanceData.length - 200, illuminanceData.length - 1)
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
  return {lightData, illuminanceData, sensorData, mode, strategy, target};
};

const setTarget = (data) => {
  console.log("New Target: ", data)
  target = data
}

const getTarget = () => {
  return target
}

module.exports = {
  getFeed,
  setTarget,
  getTarget,
  getLightData,
  setLightData,
  getIlluminanceData,
  getSensorData,
  setSensorData,
  setIlluminanceData,
  setIlluminanceAvg,
  setStrategy,
  getStrategy,
  getMode,
  setPower,
  setMode,
};
