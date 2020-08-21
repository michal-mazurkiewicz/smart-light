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

const setLightData = (data) => {
  lightData = lightData.map((l) => l.name === data.name ? data : l);
};

const setIlluminanceData = () => {
  //TODO:
};

const setSensorData = (data) => {
  sensorData = sensorData.map((s) => s.name === data.name ? data : l);
};

const changeMode = (data) => {
  console.log("Change Mode to: ", data);
  mode = data;
  console.log(" Mode : ", mode);
};

const changePower = (data) => {
  console.log("Change Power", data);
  lightData = data;
  console.log("NEw POwer: ", lightData);
};

const getLightData = () => {
  return lightData;
};

const getIlluminanceData = () => {
  return illuminanceData;
};

const getSensorData = () => {
  return sensorData;
};

const getMode = () => {
  return mode;
};

const getFeed = () => {
  return {lightData, illuminanceData, sensorData, mode};
};

module.exports = {
  getFeed,
  getLightData,
  getIlluminanceData,
  getSensorData,
  setSensorData,
  getMode,
  changePower,
  changeMode,
};
