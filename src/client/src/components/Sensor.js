import React from "react";

export default function Sensor(props) {
  return (
    <li className="sensorItem">
      <p style={{ paddingLeft: "50px", paddingRight: "15px" }}>{props.sensor.name}:</p>{" "}
      <p>{props.sensor.illuminance} lx</p>
    </li>
  );
}
