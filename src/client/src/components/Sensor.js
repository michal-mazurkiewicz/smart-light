import React from "react";

export default function Sensor(props) {
  return (
    <li className="sensorItem">
      <p style={{paddingRight: "15px" }}>{props.sensor.name}:</p>{" "}
      <p>{props.sensor.illuminance.toFixed(2)} lx</p>
    </li>
  );
}
