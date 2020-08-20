import React from "react";

export default function ModeSwitch(props) {
  return (
    <>
      <h5>Controls: {props.mode === "MANUAL" ? "Manual" : "Auto"}</h5>
      <div className="switch">
        <label>
          Manual
          <input type="checkbox" onChange={(e) => props.changeMode(e)} />
          <span className="lever"></span>
          Auto
        </label>
      </div>
    </>
  );
}
