import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "../styles/dashboard.css";
import { lightData, sensorData, illuminanceData } from "../utils/data";

import ModeSwitch from "./ModeSwitch";
import UsageChart from "./UsageChart";
import TotalUsageChart from "./TotalUsageChart";
import DeviceList from "./DeviceList";

const ENDPOINT = "http://localhost:8000";
const socket = socketIOClient(ENDPOINT);
var expected = 500;

function Dashboard() {
  const [lightsData, setLightData] = useState(lightData);
  const [mode, setMode] = useState("MANUAL");


  useEffect(() => {
    socket.on("init", (init) => {
      console.log("Initial DATA: ", init);


    });

    socket.on("setValue", (data) => {});

    return () => socket.disconnect();
  }, []);

  const changeMode = (e) => {
    if (mode === "MANUAL") {
      setMode("AUTO");
    } else {
      setMode("MANUAL");
    }
    socket.emit("switchMode", mode);
  };

  const changePower = (e, light, side) => {
    if (side === "TOP") {
      light.top = Number(e.target.value);
      setLightData((currentData) => [
        ...currentData,
        (currentData[
          currentData.findIndex((l) => l.name === light.name)
        ] = light),
      ]);
      socket.emit("changePower", lightsData);
    } else if (side === "BOTTOM") {
      light.bottom = Number(e.target.value);
      setLightData((currentData) => [
        ...currentData,
        (currentData[
          currentData.findIndex((l) => l.name === light.name)
        ] = light),
      ]);
      socket.emit("changePower", lightsData);
    }
  };

  return (
    <div className="gridContainer">
      <div className="navBar">
        <h4 style={{ paddingLeft: "20px" }}>Smart Lights Dashboard</h4>
      </div>
      <TotalUsageChart illuminanceData={illuminanceData} expected={expected} />
      <UsageChart lightData={lightData.slice()} />

      <div className="controls">
        <div style={{ padding: "10px" }}>
          <ModeSwitch mode={mode} changeMode={changeMode} />
          <DeviceList mode={mode} lightData={lightData} sensorData={sensorData} changePower={changePower}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
