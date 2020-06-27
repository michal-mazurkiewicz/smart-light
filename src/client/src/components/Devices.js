import React from "react";
import "../styles/devices.css";
import { Link } from "react-router-dom";
const Devices = () => (
  <div className="devices">
    <h2>Your Devices: </h2>
    <table className="centered highlight">
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sensor</td>
          <td>Sensor 1</td>
          <td>400 lx</td>
        </tr>
        <tr>
          <td>Sensor</td>
          <td>Sensor 2</td>
          <td>454 lx</td>
        </tr>
      </tbody>
    </table>
    <table className="centered highlight">
      <thead>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>DMX</td>
          <td>Light 1</td>
          <td>80% lx</td>
        </tr>
        <tr>
          <td>DMX</td>
          <td>Light</td>
          <td>80 %</td>
        </tr>
      </tbody>
    </table>
    <Link to={'addDevice'} class="btn-floating btn-large waves-effect light-blue darken-1"><i class="material-icons">+</i></Link>
  </div>
);

export default Devices;
