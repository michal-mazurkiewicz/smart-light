import React from "react";

export default function Light(props) {
  const TOP = "TOP";
  const BOTTOM = "BOTTOM";
  var light = props.light;

  return (
    <li className="lightItem">
      <p>{props.light.name}</p>
      <div>
        <label>Bottom:</label>
        <input
          type="range"
          name="participants"
          min="0"
          max="100"
          value={props.light.bottom}
          onChange={(e) => props.changePower(e, light, BOTTOM)}
        />
      </div>
      <p>{props.light.bottom}%</p>
      <div>
        <label>Top:</label>
        <input
          type="range"
          name="participants"
          min="0"
          max="100"
          value={props.light.top}
          onChange={(e) => props.changePower(e, light, TOP)}
        />
      </div>
      <p>{props.light.top}%</p>
    </li>
  );
}
