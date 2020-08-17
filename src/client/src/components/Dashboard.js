import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  Tooltip,
} from "recharts";
import "../styles/dashboard.css";
const ENDPOINT = "http://localhost:8000";
const socket = socketIOClient(ENDPOINT);
function Dashboard() {
  const [response, setResponse] = useState("");
  const [feed, setFeed] = useState([]);
  const [mode, setMode] = useState("MANUAL");
  const [data, setData] = useState({
    light: "",
    power: 0,
    red: "",
    green: "",
    blue: "",
    white: "",
  });

  useEffect(() => {
    socket.on("init", (initData) => {
      setData(initData);
      console.log("Initial DATA: ", initData);
    });
    socket.on("FromAPI", (data) => {
      setResponse(data);
      setFeed((currentData) => [...currentData, data]);
    });
    return () => socket.disconnect();
  }, []);

  const onChangeMode = (e) => {
    if (mode === "MANUAL") {
      setMode("AUTO");
    } else {
      setMode("MANUAL");
    }
    socket.emit("switchMode");
  };

  const onChangeSettings = (e) => {
    handleColor(e);
    socket.emit("changeSettings", data);
  };

  const changePower = (e) => {
    setData({ ...data, power: parseInt(e.target.value) });
    socket.emit("changeSettings", data);
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const handleColor = (event) => {
    console.log("Color:", event.target.value);

    let value = event.target.value.match(/[A-Za-z0-9]{2}/g);
    value = value.map(function (v) {
      return parseInt(v, 16);
    });
    setData({
      ...data,
      red: value[0],
      green: value[1],
      blue: value[2],
    });

    console.log(data);
  };

  return (
    <div className="gridContainer">
      <div className="chart">
        <div style={{padding:"5px"}}>
        <h5>Total Consumption:</h5>
          <LineChart width={800} height={300} data={feed.slice(0, 10)} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <YAxis />
            <Line type="monotone" dataKey="illuminance" stroke="#8884d8" />
            <Line type="monotone" dataKey="lightPower" stroke="#82ca9d" />
            <Tooltip />
          </LineChart>
        </div>
      </div>

      <div className="data">
        <div>
          <h5>Current Data:</h5>
          <p>Time: {response.timeStamp}</p>
          <p>Illuminance: {Math.round(response.illuminance)} lx</p>
          <p>Light Power: {response.lightPower}</p>
          <p>Energy Usage: {Math.round((response.lightPower / 255) * 100)}%</p>
        </div>
      </div>
      <div className="controls">
        <h5>Control:</h5>
        <div className="switch">
          <label>
            Manual
            <input type="checkbox" onChange={(e) => onChangeMode(e)} />
            <span className="lever"></span>
            Auto
          </label>
        </div>
        {mode === "MANUAL" ? (
          <div>
            <p>
              Red: {data.red} Green: {data.green} Blue: {data.blue} Power:{" "}
              {data.power}
            </p>
            <input
              className="colorPicker"
              type="color"
              value={rgbToHex(data.red, data.green, data.blue)}
              onChange={(e) => onChangeSettings(e)}
            ></input>
            <div>
              <input
                className="powerPicker"
                type="range"
                min="1"
                max="255"
                value={data.power}
                onChange={(e) => changePower(e)}
              />
            </div>
          </div>
        ) : (
          <p>Atomatic Control</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
