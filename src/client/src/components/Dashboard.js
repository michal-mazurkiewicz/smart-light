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
  const [strategy, setStrategy] = useState("");
  const [target, setTarget] = useState("");

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
      setStrategy(data.strategy);
      setLightData(data.lightData);
      setTarget(data.target);

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

  const changeStrategy = (value) => {
    setStrategy(value);
    socket.emit("changeStrategy", value);
  };

  const changeTarget = (value) => {
    setTarget(value);
    socket.emit("changeTarget", value);
  };

  const changePower = (e, light, side) => {
    if (side === "TOP") {
      light.top = Math.round((Number(e.target.value) * 255) / 100);
      setLightData((currentData) =>
        currentData.map((l) => (l.name === light.name ? light : l))
      );
      socket.emit("changePower", lightData);
    } else if (side === "BOTTOM") {
      light.bottom = Math.round((Number(e.target.value) * 255) / 100);
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
      <TotalUsageChart illuminanceData={illuminanceData} target={target} expected={expected} />
      <UsageChart lightData={lightData} />

      <div className="controls">
        <div style={{ padding: "10px" }}>
          <ModeSwitch mode={mode} changeMode={changeMode} />
          <DeviceList
            mode={mode}
            lightData={lightData}
            sensorData={[...sensorData]}
            strategy={strategy}
            target={target}
            changeTarget={changeTarget}
            changePower={changePower}
            changeStrategy={changeStrategy}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
