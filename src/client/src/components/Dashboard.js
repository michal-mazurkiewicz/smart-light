import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "../styles/dashboard.css";
import Loader from "react-loader-spinner";
import ModeSwitch from "./ModeSwitch";
import UsageChart from "./UsageChart";
import TotalUsageChart from "./TotalUsageChart";
import DeviceList from "./DeviceList";
import Navbar from "./Navbar";

const ENDPOINT = "http://localhost:8000";
const socket = socketIOClient(ENDPOINT);
var expected = 500;

function Dashboard() {
  const [lightData, setLightData] = useState([]);
  const [illuminanceData, setIlluminanceData] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(true);
  const [energyMode, setEnergyMode] = useState("");

  useEffect(() => {
    setLoading(true);

    socket.on("init", (data) => {
      console.log("Initial DATA: ", data);
      setLightData(data.lightData);
      setIlluminanceData(data.illuminanceData);
      setSensorData(data.sensorData);
      setMode(data.mode);
      setLoading(false);
    });

    socket.on("feed", (data) => {
      console.log("FEED", data);
      setIlluminanceData(data.illuminanceData);
      setSensorData(data.sensorData);
      setEnergyMode(data.energyMode);
      if (mode === "AUTO") {
        setLightData(data.lightData);
        console.log("Light Data: ", data.lightData);
      }
    });

    return () => socket.disconnect();
  }, []);

  const changeMode = (e) => {
    if (mode === "MANUAL") {
      setMode("AUTO");
      socket.emit("changeMode", "AUTO");
    } else if (mode === "AUTO") {
      setMode("MANUAL");
      socket.emit("changeMode", "MANUAL");
    }
  };

  const changeEnergyMode = (value) => {
    setEnergyMode(value)
    socket.emit("changeEnergyMode", value)
  }

  const changePower = (e, light, side) => {
    if (side === "TOP") {
      light.top = Math.round(Number(e.target.value) * 255 / 100);
      setLightData((currentData) =>
        currentData.map((l) => (l.name === light.name ? light : l))
      );
      socket.emit("changePower", lightData);
    } else if (side === "BOTTOM") {
      light.bottom = Math.round(Number(e.target.value) * 255 / 100);
      setLightData((currentData) =>
        currentData.map((l) => (l.name === light.name ? light : l))
      );
      socket.emit("changePower", lightData);
    }
  };

  return loading === true ? (
    <Loader type="Grid" color="#87CEEB" height="100" width="100" />
  ) : (
    <div className="gridContainer">
      <Navbar />
      <TotalUsageChart illuminanceData={illuminanceData} expected={expected} />
      <UsageChart lightData={lightData.slice()} />

      <div className="controls">
        <div style={{ padding: "10px" }}>
          <ModeSwitch mode={mode} changeMode={changeMode} />
          <DeviceList
            mode={mode}
            lightData={lightData}
            sensorData={[...sensorData]}
            energyMode={energyMode}
            changePower={changePower}
            changeEnergyMode={changeEnergyMode}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
