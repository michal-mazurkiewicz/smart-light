import React from "react";
import Light from "./Light";
import Sensor from "./Sensor";

export default function DeviceList(props) {
  return (
    <>
      {props.mode === "MANUAL" ? (
        <div>
          <ul className="lightsList">
            {props.lightData.map((light) => (
              <Light light={light} changePower={props.changePower} />
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <ul className="sensorsList">
            {props.sensorData.map((sensor) => (
              <Sensor sensor={sensor} />
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
