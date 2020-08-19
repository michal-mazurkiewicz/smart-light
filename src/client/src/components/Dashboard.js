import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import {
  BarChart,
  CartesianGrid,
  YAxis,
  ReferenceLine,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  Bar,
  linearGradient,
  XAxis,
} from "recharts";
import "../styles/dashboard.css";
import { lightData, illuminanceData } from "../utils/data";
const ENDPOINT = "http://localhost:8000";
const socket = socketIOClient(ENDPOINT);
var expected = 500;
function Dashboard() {
  const [response, setResponse] = useState("");
  const [data, setData] = useState({
    lights: {
      lightBottom1: 0,
      lightTop1: 0,
      lightBottom2: 0,
      lightTop2: 0,
      lightBottom3: 0,
      lightTop3: 0,
      lightBottom4: 0,
      lightTop4: 0,
      lightBottom5: 0,
      lightTop5: 0,
      lightBottom6: 0,
      lightTop6: 0,
      lightBottom7: 0,
      lightTop7: 0,
      lightBottom8: 0,
      lightTop8: 0,
      average: 0,
    },
    sensors: {
      sensor1: 0,
      sensor2: 0,
      sensor3: 0,
      average: 0,
    },
  });
  const [feed, setFeed] = useState([]);
  const [mode, setMode] = useState("MANUAL");

  useEffect(() => {
    socket.on("data", (initData) => {
      //setData(initData);
      console.log("Initial DATA: ", initData);
    });
    socket.on("setValue", (data) => {
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
      <div className="navBar">
        <h4 style={{ paddingLeft: "20px" }}>Smart Lights Dashboard</h4>
      </div>
      <div className="chart">
        <div style={{ padding: "10px" }}>
          <h5>Total Usage:</h5>
          <AreaChart
            width={800}
            height={350}
            data={illuminanceData}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <YAxis
              ticks={[
                50,
                100,
                150,
                200,
                250,
                300,
                350,
                400,
                450,
                500,
                550,
                600,
              ]}
              stroke="white"
            />
            <Area
              type="monotone"
              dataKey="illuminance"
              stroke="#8884d8"
              fillOpacity={1} fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="power"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <ReferenceLine y={expected} stroke="green" />
            <Legend />
            <Tooltip />
          </AreaChart>
        </div>
      </div>

      <div className="data">
        <div style={{ padding: "5px" }}>
          <h5>Usage by light:</h5>
          <BarChart
            width={800}
            height={350}
            margin={{
              top: 5,
              right: 20,
              left: 0,
              bottom: 5,
            }}
            data={lightData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Legend />
            <Tooltip/>
            <Bar dataKey="bottom" fill="#8884d8" />
            <Bar dataKey="top" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>

      <div className="controls">
        <div style={{ padding: "10px" }}>
          <h5>Controls: {mode === "MANUAL" ? "Manual" : "Auto"}</h5>
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
              <ul className="lightsList">
                <li className="lightItem">
                  <p>Oprawa 1</p>
                  <div>
                    <input
                      type="range"
                      name="participants"
                      min="0"
                      max="100"
                      value={data.lights.lightBottom1}
                    />
                  </div>
                </li>
                <li className="lightItem">Oprawa 2</li>
                <li className="lightItem">Oprawa 3</li>
                <li className="lightItem">Oprawa 4</li>
                <li className="lightItem">Oprawa 5</li>
                <li className="lightItem">Oprawa 6</li>
                <li className="lightItem">Oprawa 7</li>
                <li className="lightItem">Oprawa 8</li>
              </ul>
            </div>
          ) : (
            <div>
              <ul className="sensorsList">
                <li className="sensorItem">Sensor 1</li>
                <li className="sensorItem">Sensor 2</li>
                <li className="sensorItem">Sensor 3</li>
                <li className="sensorItem">Average</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
