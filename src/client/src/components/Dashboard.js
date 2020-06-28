import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";

const ENDPOINT = "http://localhost:8000";
const socket = socketIOClient(ENDPOINT);
function Dashboard() {
  const [response, setResponse] = useState("");
  const [feed, setFeed] = useState([]);
  const [mode, setMode] = useState("MANUAL");
  const [data, setData] = useState({
    light: "",
    power: "",
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
    e.preventDefault();
    if (mode === "MANUAL") {
      setMode("AUTO");
    } else {
      setMode("MANUAL");
    }
    socket.emit("switchMode");
  };

  const onChangeSettings = (e) => {
    e.preventDefault();
    handleColor(e);
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px",
      }}
    >
      <LineChart width={1000} height={300} data={feed}>
        <XAxis dataKey="timeStamp" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="illuminance" stroke="#8884d8" />
        <Line type="monotone" dataKey="lightPower" stroke="#82ca9d" />
      </LineChart>
      <p>
        Current Data:
        <p>Time: {response.timeStamp}</p>
        <p>Illuminance: {Math.round(response.illuminance)} lx</p>
        <p>Light Power: {response.lightPower}</p>
        <p>Energy Usage: {Math.round((response.lightPower / 255) * 100)}%</p>
      </p>

      <h2>Pick Color:</h2>
      <form>
        <div className="switch">
          <label>
            Manual
            <input type="checkbox" onChange={(e) => onChangeMode(e)} />
            <span className="lever"></span>
            Auto
          </label>
        </div>
        <div>
          <div>
            <input
              className="colorPicker"
              type="color"
              value={rgbToHex(data.red, data.green, data.blue)}
              onChange={(e) => onChangeSettings(e)}
            ></input>
          </div>
          <div>
            <input type="range" min="1" max="255" onChange={(e) => setData({...data, power: parseInt(e.target.value)})} />
            <label>Power</label>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Dashboard;
