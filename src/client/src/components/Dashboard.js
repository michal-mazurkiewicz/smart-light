import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import {LineChart, XAxis, YAxis, CartesianGrid, Line} from 'recharts'

const ENDPOINT = "http://localhost:8000";

function Dashboard() {
  const [response, setResponse] = useState("");
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
      setFeed(currentData => [...currentData, data]);
    });
    return () => socket.disconnect();
  }, []);

  const milisecondsToDate = (miliseconds) => {
    const date = new Date(miliseconds);
    return date.toLocaleTimeString();
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px'}}>
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
        <p>Energy Usage: {Math.round(response.lightPower/255 * 100)}%</p>
      </p>
    </div>
  );
}

export default Dashboard;
